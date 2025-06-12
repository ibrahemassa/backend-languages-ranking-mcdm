from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import sys
import os
import traceback
import json

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from mcdm import (
    MCDMConfig,
    DataProcessor,
    ExpertsWeightsCalculator,
    CriteriaWeightingCalculator,
    AlternativesRankingCalculator,
)

app = Flask(__name__)
CORS(app)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        csv_file = request.files['csvFile']
        num_criteria = int(request.form['numCriteria'])
        num_alternatives = int(request.form['numAlternatives'])
        auto = (request.form['autoCalculate'].lower() == 'true')
        # alternatives = json.loads(request.form['alternatives'])
        cost_criteria_indices = json.loads(request.form['costCriteriaIndices'])

        criteria = []
        # if num_criteria > 0:
        #     for i in range(num_criteria):
        #         criteria.append({
        #             "name": f"Criterion {i+1}",
        #             "cost": "True" if (i+1) in cost_criteria_indices else "False"
        #         })

        csv_path = 'temp.csv'
        csv_file.save(csv_path)

        config = MCDMConfig(num_alternatives=num_alternatives, num_criteria=num_criteria, cost_indicies=cost_criteria_indices, auto=auto, psi=1)

        data_processor = DataProcessor(csv_path, config)

        alternatives_ratings, experts_lv = data_processor.process_csv()

        experts_calc = ExpertsWeightsCalculator(experts_lv, config)
        experts_weights = experts_calc.get_experts_weights()

        criteria_weights_calc = CriteriaWeightingCalculator(alternatives_ratings, experts_weights, config)
        criteria_weights = criteria_weights_calc.calculate()

        alter_calc = AlternativesRankingCalculator(
            criteria_weights_calc.scores,
            criteria_weights_calc.get_max_min_scores(criteria_weights_calc.scores),
            criteria_weights,
            config
        )
        rankings = alter_calc.calculate()
        # print(alter_calc.config.experts_names)
        #
        # rankings = [
        #     {
        #         'name': f'{alter_calc.config.alternatives[i]}',
        #         'score': score
        #     }
        #     for i, score in enumerate(rankings)
        # ]
        # rankings = sorted(rankings, key=lambda x: x['score'], reverse=True)
        # for i, item in enumerate(rankings, start=1):
        #     item['rank'] = i
        #

        result = {
            'expertWeights': experts_weights,
            'criteriaWeights': criteria_weights,
            'expertsNames': alter_calc.config.experts_names,
            'criteriaNames': alter_calc.config.criteria,
            'rankings': rankings,
            # 'rankings': [
            #     {
            #         'name': f'{alter_calc.config.alternatives[i]}',
            #         'score': score
            #     }
            #     for i, score in enumerate(rankings)
            # ],
            'steps': {
                1: experts_calc.FFYWA,
                2: experts_calc.s2,
                3: experts_weights,
                4: criteria_weights_calc.s4,
                5: criteria_weights_calc.s5,
                6: criteria_weights_calc.s6,
                7: criteria_weights_calc.s7,
                8: criteria_weights_calc.s8,
                9: criteria_weights_calc.s9,
                10: criteria_weights_calc.s10,
                12: alter_calc.s12,
                13: alter_calc.s13,
                14: alter_calc.s14,
                15: alter_calc.s15,
                16: alter_calc.s16,
                17: alter_calc.s17,
            }
        }

        return jsonify(result)

    except Exception as e:
        print("Error occurred:", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        return jsonify({
            'error': str(e),
            'traceback': traceback.format_exc()
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 

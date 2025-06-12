import pandas as pd 
import numpy as np

class MCDMConfig:
    def __init__(self, num_criteria=0, num_alternatives=0, psi=1,
                 alternatives=None, criteria=None, cost_indicies=None, experts_lv_mappings=None, experts_names=None, auto=False):
        self.num_criteria = num_criteria
        self.num_alternatives = num_alternatives
        self.psi = psi
        self.alternatives = alternatives or []
        self.criteria = criteria or []
        self.cost_indicies = cost_indicies or []
        self.experts_names = []
        self.auto = auto
        self.experts_lv_mappings = experts_lv_mappings or {
            "less than 5 years": 0,
            "5 - 10 years": 1,
            "10 - 15 years": 2,
            "15 - 20 years": 3,
            "more than 20 years": 4,
            "very poor": 0,
            "poor": 1,
            "medium": 2,
            "good": 3,
            "very good": 4
        }
        

#Process the csv before anything
class DataProcessor:
    def __init__(self, path: str, config: MCDMConfig):
        self.path = path
        self.config = config

    def process_csv(self) -> tuple[dict[str, dict[str, list[str]]], list[list[int]]]:
        df = pd.read_csv(self.path)
        experience_col =(df.columns[df.columns.str.contains('experience', case=False)].tolist()[0])
        expertise_col =(df.columns[df.columns.str.contains('expertise', case=False)].tolist()[0])
        try:
            name_col = df.columns[df.columns.str.contains('name', case=False)].tolist()[0]
        except:
            name_col = ''
        experts_lv = []
        languages_ratings = {}
        start_index = df.columns.get_loc(expertise_col) + 1
        # start_index = df.columns.get_loc("expertise") + 1

        for i, row in df.iterrows():
            # try:
            #     # name_col = df.columns[df.columns.str.contains('name', case=False)].tolist()[0]
            #     if pd.notna(row[name_col]):
            #         self.config.experts_names.append(row[name_col])
            #     else:
            #         self.config.experts_names.append(f"Expert {i+1}")
            # except:
            #     self.config.experts_names.append(f"Expert {i+1}")

            self.config.experts_names.append(f"Expert {i+1}")

            lv: list[str | int] = [row[experience_col], row[expertise_col]]
            # lv: list[str | int] = [row["experience"], row["expertise"]]
            if(isinstance(lv[0], int)):
                experts_lv.append(lv)
            else:
                # experts_lv.append(list(map(lambda x: self.config.experts_lv_mappings.get(x.lower()), lv)))
                lv = list(map(lambda x: x.lower(), lv))
                experts_lv.append(list(map(self.config.experts_lv_mappings.get, lv)))

            ratings = {}
            for col in df.columns[start_index:]:
                cur_alt = col.split()[0]
                if cur_alt in ratings:
                    ratings[cur_alt].append(row[col])
                else:
                    ratings[cur_alt] = [row[col]]

                if cur_alt not in self.config.alternatives:
                    self.config.alternatives.append(cur_alt)
                
                cur_crit = col.split('[')[1][:-1]
                if cur_crit not in self.config.criteria:
                    self.config.criteria.append(cur_crit)

            languages_ratings[i] = ratings

        # print(self.config.experts_names)
        # print(self.config.alternatives)
        # print(self.config.criteria)
        if(self.config.auto):
            self.config.num_alternatives = len(self.config.alternatives)
            self.config.num_criteria = len(self.config.criteria)
        # self.config.alternatives = [f"A{i+1}: {alt}" for i, alt in enumerate(self.config.alternatives)]

        return languages_ratings, experts_lv


#Stage 1 weighting the experts
class ExpertsWeightsCalculator:
    def __init__(self, experts_lv: list[list[int]], config: MCDMConfig):
        self.experts_lv = experts_lv
        self.config = config

        self.ffn_dict: dict[int, tuple[float, float]] = {
            0: (0.21, 0.70),
            1: (0.36, 0.41),
            2: (0.42, 0.52),
            3: (0.73, 0.10),
            4: (0.82, 0.50)
        }


    def get_experts_weights(self) -> list[float]:
        exp_weight: float = 0.5

        experts = [[self.ffn_dict[expert[0]], self.ffn_dict[expert[1]]] for expert in self.experts_lv]


        self.FFYWA: list[list[float]]  = []
        weighted_experts_scores = []
        for expert in experts:
            x_val = y_val = 0
            for val in expert:
                x_val += exp_weight * (val[0] ** (3 * self.config.psi))
                y_val += exp_weight * ((1 - (val[1] ** 3)) ** self.config.psi)

            x_val = np.power(x_val, 1 / self.config.psi)
            y_val = np.power(y_val, 1 / self.config.psi)
            x = float(np.cbrt((min(1, x_val))))
            y = float(np.cbrt((1 - min(1, y_val))))

            self.FFYWA.append([x, y])


        self.s2 = scores = [0.5 * (expert[0] ** 3 - expert[1] ** 3 + 1)for expert in self.FFYWA]
        

        sum_scores = sum(scores)

        weighted_experts_scores = [score / sum_scores for score in scores]

        # print(f"PSI = {PSI}")
        # print(weighted_experts_scores)
        # print(all_positive(weighted_experts_scores))
            

        return weighted_experts_scores

#Stage2: criteria weighting
class CriteriaWeightingCalculator:
    def __init__(self, languages_ratings, experts_weights, config):
        self.languages_ratings = languages_ratings
        self.experts_weights = experts_weights
        self.config = config
        self.num_experts = len(experts_weights)
        self.scores = []
        self.ffn_dict = {
            'ExL': (0.3, 0.5),
            'EL': (0.35, 0.43),
            'VL': (0.36, 0.56),
            'L': (0.4, 0.73),
            'BA': (0.42, 0.30),
            'A': (0.47, 0.21),
            'AA': (0.5, 0.62),
            'H': (0.55, 0.38),
            'VH': (0.6, 0.18),
            'EH': (0.72, 0.5),
            'ExH': (0.83, 0.42)
        }

    def calculate(self):
        self.s4 = decision_matrices = self.get_initial_decision_matrices()
        self.s5 = decision_matrix = self.get_weighted_decision_matrix(decision_matrices)
        self.s6 = normalized_matrix = self.get_normalized_matrix(decision_matrix)
        self.s7 = h_mean = self.get_mean_of_normalized_matrix(normalized_matrix)
        self.s8 = prefrence_variation = self.get_prefrence_variation(normalized_matrix, h_mean)
        self.s9 = deviation_preference = self.deviation_preference(prefrence_variation)
        self.s10 = weights = self.get_criteria_weighting(deviation_preference)

        return weights

    #step4
    def get_initial_decision_matrices(self):
        decision_matrices = []
        for expert in self.languages_ratings:
            cur_matrix = []
            for lang in self.languages_ratings[expert]:
                cur_lang_row = [self.ffn_dict[i] for i in self.languages_ratings[expert][lang]]
                cur_matrix.append(cur_lang_row)
            decision_matrices.append(cur_matrix)
            # print(f"For the expert number {expert}:")
            # print(cur_matrix)
        return decision_matrices

    #step5
    def get_weighted_decision_matrix(self, decision_matrices):
        decision_matrix = []
        for i in range(self.config.num_alternatives):
            cur_row = []
            for j in range(self.config.num_criteria):
                summed_x = summed_y = 0 
                for f in range(self.num_experts):
                    summed_x += self.experts_weights[f] * (decision_matrices[f][i][j][0] ** (3 * self.config.psi))
                    summed_y += self.experts_weights[f] * ((1 - (decision_matrices[f][i][j][1] ** 3)) ** self.config.psi)
                summed_x = np.power(summed_x, 1 / self.config.psi)
                summed_y = np.power(summed_y, 1 / self.config.psi)
                x = float(np.cbrt(min(1, summed_x)))
                y = float(np.cbrt((1 - min(1, summed_y))))
                cur_row.append([x, y])
            decision_matrix.append(cur_row)

        # print(decision_matrix[0])
        return decision_matrix

    #step6
    def get_row_scores(self, row):
        scores = []
        for ffn in row:
            scores.append(0.5 * (ffn[0] ** 3 - ffn[1] ** 3 + 1))
        return scores

    def get_max_min_scores(self, scores):
        scores_np = np.array(scores)
        max_vals = scores_np.max(axis=0)
        min_vals = scores_np.min(axis=0)
        max_min = list(zip(max_vals,min_vals))

        return max_min
        

    def get_normalized_matrix(self, decision_matrix):
        normalized_matrix = []
        self.scores = [self.get_row_scores(row) for row in decision_matrix]
        # print(self.scores)

        max_min = self.get_max_min_scores(self.scores)
        
        for i in range(self.config.num_alternatives):
            cur_row = []
            for j in range(self.config.num_criteria):
                #if the criteria is benefit
                if j not in self.config.cost_indicies:
                    cur_row.append(self.scores[i][j] / max_min[j][0])
                #else if the criteria is cost
                else:
                    cur_row.append(max_min[j][1] / self.scores[i][j])

            normalized_matrix.append(cur_row)

        # print(normalized_matrix)
        return normalized_matrix

    #step7
    def get_mean_of_normalized_matrix(self, normalized_matrix):
        h_mean = []
        for j in range(self.config.num_criteria):
            cur = 0 
            cur = sum([normalized_matrix[i][j] for i in range(self.config.num_alternatives)])
            h_mean.append(cur / self.config.num_alternatives)

        # print(h_mean)
        return h_mean

    #step8
    def get_prefrence_variation(self, normalized_matrix, h_mean):
        prefrence_variation = []
        for j in range(self.config.num_criteria):
            cur = sum([(normalized_matrix[i][j] - h_mean[j]) ** 2 for i in range(self.config.num_alternatives)])
            prefrence_variation.append(cur)
        return prefrence_variation

    #step9
    def deviation_preference(self, prefrence_variation):
        return [1 - prefrence_variation[j] for j in range(self.config.num_criteria)]

    #step10
    def get_criteria_weighting(self, deviation_preference):
        sum_deviation = sum(deviation_preference)
        weights = [deviation_preference[j] / sum_deviation for j in range(self.config.num_criteria)]

        return weights


class AlternativesRankingCalculator:
    def __init__(self, scores, max_min, criteria_weights, config):
        self.scores = scores
        self.max_min = max_min
        self.criteria_weights = criteria_weights
        self.config = config
        self.linear_normalized_matrix = []
        self.vector_nomralization = []
        self.aggregated_average_normalized_matrix = []

    #step12
    def get_linear_normalization(self, max_min):
        linear_normalized_matrix = []

        for i in range(self.config.num_alternatives):
            cur_row = []
            for j in range(self.config.num_criteria):
                nom = 0 
                dom = max_min[j][0] - max_min[j][1]
                if j not in self.config.cost_indicies:
                    nom = self.scores[i][j] - max_min[j][1]
                else:
                    nom  = max_min[j][0] - self.scores[i][j]

                cur_row.append(nom / dom)
            linear_normalized_matrix.append(cur_row)
        return linear_normalized_matrix

    #step13
    def get_criteria_score_sum(self, scores, j):
        sum_ = 0 
        for i in range(self.config.num_alternatives):
            sum_ += (scores[i][j] ** 2)
        return sum_

    def get_vector_normalization(self):
        vector_nomralization = []
        sums = [self.get_criteria_score_sum(self.scores, j) for j in range(self.config.num_criteria)]
        for i in range(self.config.num_alternatives):
            cur_row = []
            for j in range(self.config.num_criteria):
                base_num = self.scores[i][j] / (sums[j] ** 0.5)
                if j in self.config.cost_indicies:
                    base_num = 1 - base_num
                cur_row.append(base_num)
            vector_nomralization.append(cur_row)
        return vector_nomralization

    #step14
    def get_aggregated_average_normalized_matrix(self):
        weighting_factor = 0.5
        matrix = []
        for i in range(self.config.num_alternatives):
            cur_row = []
            for j in range(self.config.num_criteria):
                # Here in the article they used Kij in both which basicly results in Kij/2 which makes no sense since we're not even using K*ij and even the weighting_factor has no effect on the results
                val1 = weighting_factor * self.linear_normalized_matrix[i][j]
                val2 = (1 - weighting_factor) * self.vector_nomralization[i][j]
                cur_row.append((val1 + val2) / 2)
            matrix.append(cur_row)
        return matrix

    #step15
    def get_weighted_aggregated_average_normalized_matrix(self):
        matrix = []
        for i in range(self.config.num_alternatives):
            cur_row = []
            for j in range(self.config.num_criteria):
                cur_row.append(self.criteria_weights[j] * self.aggregated_average_normalized_matrix[i][j])
            matrix.append(cur_row)
        return matrix

    #step16
    def get_normalized_weighted_values(self):
        L = []
        A = []
        for i in range(self.config.num_alternatives):
            cur_a = cur_l = 0
            for j in range(self.config.num_criteria):
                if j not in self.config.cost_indicies:
                    cur_a += self.k_hat[i][j]
                else:
                    cur_l += self.k_hat[i][j]
            L.append(cur_l)
            A.append(cur_a)
        return A, L

    #step17
    def get_final_rankings(self):
        rankings = []
        delta = max(len(self.config.cost_indicies), 1) / self.config.num_criteria
        for i in range(self.config.num_alternatives):
            cur_r = (self.L[i] ** delta) + (self.A[i] ** (1 - delta))
            rankings.append(cur_r)

        return rankings

    def calculate(self):
        self.s12 = self.linear_normalized_matrix = self.get_linear_normalization(self.max_min)
        self.s13 = self.vector_nomralization = self.get_vector_normalization()
        self.s14 = self.aggregated_average_normalized_matrix = self.get_aggregated_average_normalized_matrix()
        self.s15 = self.k_hat = self.get_weighted_aggregated_average_normalized_matrix()
        self.s16 = self.L, self.A = self.get_normalized_weighted_values()
        self.s17 = self.rankings = self.get_final_rankings()
        self.rankings = [
            {
                'name': f'{self.config.alternatives[i]}',
                'score': score
            }
            for i, score in enumerate(self.rankings)
        ]
        self.rankings = sorted(self.rankings, key=lambda x: x['score'], reverse=True)
        for i, item in enumerate(self.rankings, start=1):
            item['rank'] = i
        return self.rankings
        # print(self.rankings)
        # print(self.L)
        # print(self.A)
        # print(self.k_hat)
        # print(self.aggregated_average_normalized_matrix)
        # print(self.linear_normalized_matrix)




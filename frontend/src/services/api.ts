import axios from 'axios';

export interface Alternative {
  name: string;
}

export interface CalculationInput {
  numCriteria: number;
  numAlternatives: number;
  autoCalculate: boolean;
  alternatives: Alternative[];
  costCriteriaIndices: number[];
  csvFile: File;
}

export interface CalculationResult {
  expertWeights: number[];
  criteriaWeights: number[];
  rankings: Array<{
    name: string;
    score: number;
  }>;
  criteriaNames: string[];
  alternativeNames: string[];
}

// const URL = "https://ibrahemassa.pythonanywhere.com";
const URL = "http://localhost:5000";

const api = {
  uploadData: async (input: CalculationInput) => {
    const formData = new FormData();
    formData.append('numCriteria', input.numCriteria.toString());
    formData.append('numAlternatives', input.numAlternatives.toString());
    formData.append('autoCalculate', input.autoCalculate.toString());
    formData.append('alternatives', JSON.stringify(input.alternatives));
    formData.append('costCriteriaIndices', JSON.stringify(input.costCriteriaIndices));
    formData.append('csvFile', input.csvFile);

    const response = await axios.post(`${URL}/api/calculate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

export default api; 

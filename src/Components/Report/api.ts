import axios from "axios";

const API_BASE_URL = "https://supermarketapp25.pythonanywhere.com"; // Substitua pelo seu endpoint base

export const fetchLogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/estoque_log/`);
  return response.data;
};

export const deleteLog = async (logId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/estoque_log/${logId}`);
  return response.data;
};
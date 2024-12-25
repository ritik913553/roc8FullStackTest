import axios from 'axios';

const BASE_URL = 'https://flipkart-email-mock.now.sh/';

export const fetchEmails = (page = 1) => axios.get(`${BASE_URL}?page=${page}`);
export const fetchEmailBody = (id) => axios.get(`${BASE_URL}?id=${id}`);

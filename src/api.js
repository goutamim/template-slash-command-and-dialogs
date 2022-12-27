const axios = require('axios');
const qs = require('querystring');
const apiUrl = 'https://slack.com/api';
const githubUrl = 'https://api.github.com'

const callAPIMethod = async (method, payload) => {
    let data = Object.assign({ token: process.env.SLACK_ACCESS_TOKEN }, payload);
    let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data));
    return result.data;
}

const callgitAPIMethodPost = async () => {
    console.log('calling github api')
    let result = await axios.post(`${githubUrl}/repos/softwareartistry/k8s-cli/actions/workflows/penknife-ui-deploy.yml/dispatches`, {"ref":"sprint"}, {
      headers: { Authorization: "Bearer " + process.env.GITHUB_ACCESS_TOKEN }
    });
    console.log('github call api sucessfull');
  }
  

module.exports = {
    callAPIMethod,
    callgitAPIMethodPost
}
const repoTenantList = [
	{ repo: "penknife-ui", tenant: ["demo", "practifly", "314ecorp"] },
	{ repo: "penknife-app", tenant: ["demo", "practifly", "314ecorp"]}, //penknife-app and cli same image. no buildname required.
	{ repo: "practifly-server", tenant: ["demo1"] },
	{ repo: "practifly-ui", tenant: ["demo1"] },
];

const apiUrl = "https://slack.com/api";
const githubUrl = "https://api.github.com";

const getRepoList = () => repoTenantList.map((i) => i.repo);

const getTenantList = (repoName) =>
	repoTenantList.filter((i) => i.repo == repoName)[0]?.tenant ?? [];

export { repoTenantList, getRepoList, getTenantList, apiUrl, githubUrl };

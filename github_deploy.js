const shell = require("shelljs");

// Git Setup
(async function() {
  console.log(`[EMERGE Builder] Repo Directory Ready`);
  const GitSetupCommand = [
    `git config --global user.email "jigar.dafda@gmail.com"`,
    `git config --global user.name "Jigar Dafda"`,
    `git config pager.diff false`,
  ].join("\n");

  const { GITHUB_USERNAME, GITHUB_PERSONAL_TOKEN } = process.env;

  let cloneCommand = `git clone https://${GITHUB_USERNAME}:${GITHUB_PERSONAL_TOKEN}@github.com/gofynd/Emerge.git`;
  const command = `
    echo "Deploying Emerge on Github"
    ${cloneCommand}
    cd Emerge
    ${shell.exec(GitSetupCommand)}
    git checkout master || git checkout -b master
    rm -rf ./*
    cp -R  ./../* ./
    echo "-----------------copied files------------------"
    ls -la
    echo "-----------------------------------"
    rm -rf ./Emerge
    rm -rf ./node_modules
    git add .
    git commit -m "[Auto Generated]"
    ls -la
    git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_PERSONAL_TOKEN}@github.com/gofynd/Emerge.git
    git push -u origin master
`;
  console.log(`Emerge Builder Done `);
  shell.exec(command);
})();

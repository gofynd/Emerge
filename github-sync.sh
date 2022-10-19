echo deploying started
git clone https://${GITHUB_USERNAME}:${GITHUB_PERSONAL_TOKEN}@github.com/gofynd/Emerge.git
cd Emerge
git config --global user.email "jigar.dafda@gmail.com"
git config --global user.name "Jigar Dafda"
git config pager.diff false
git checkout main
rm -rf ./*
cd ..
cp -R `ls | grep -v "Emerge"` ./Emerge
cp .gitignore ./Emerge
cd Emerge
git add .
git commit -m "[Auto Generated]"
ls -la
git push -u origin main
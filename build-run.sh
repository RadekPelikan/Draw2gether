workdir=$(pwd)

cd client
npm i --force
rm -rf client/build
npm run build

cd $workdir
rm -rf server/public

mkdir server/public
mv client/build server/public

cd server/src

npm i --force
node .

cd $workdir

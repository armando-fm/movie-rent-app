const hosts = {
  development: 'http://localhost:5200',
  production: 'https://dotnet-web-api-demo.herokuapp.com',
};

 export default function getHostByEnviroment() {
// TODO: implement logic to determine environment
  return hosts.development;
}

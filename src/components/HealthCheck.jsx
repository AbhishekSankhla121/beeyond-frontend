
const HealthCheck = () => {

  var response = {}
  response['status'] = 200
  response['environment'] = process.env.NODE_ENV

  return JSON.stringify(response)
}

export default HealthCheck

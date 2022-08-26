import jwt from 'jsonwebtoken'

export default async function (request, reply) {
  try {
    debugger
    const requiresAuth = request.context.config.requiresAuth
    if (!requiresAuth) return null

    const token = request.headers.authorization
    if (!token) return reply.code(401).send()
    
    const isValid = jwt.verify(token, process.env.JWT_SECRET)
    if (!isValid || !Object.keys(isValid).length) return reply.code(401).send()
    
    const data = await this.dbConnection('role')
      .join('role_permission', 'role_permission.role_id', '=', 'role.id')
      .join('permission', 'permission.id', '=', 'role_permission.permission_id')
      .join('user_role', 'role.id', '=', 'user_role.role_id')
      .select('context','functionality', 'active')
      .where('user_role.user_id', '=', parseInt(isValid.userId))
      .andWhere('active', '=', true)

    if (!data || !data.length) return reply.code(403).send('PermissionError: Role not found.')
   
    const permissions = data.map(cur => `${cur.context}|${cur.functionality}`.toLowerCase())
    const { context, functionality } = request.context.config
    const trying = `${context}|${functionality}`.toLowerCase()
    if (!permissions.includes(trying)) { 
      return reply.code(403).send('PermissionError: Role not found.')
    }

  } catch (e) {
   reply.code(500).send(e.message)
  }
}

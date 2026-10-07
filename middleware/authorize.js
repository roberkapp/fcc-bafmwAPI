import { ROLES } from "../const.js";

export function authorizeModification(req, res, next){
   const { userId } = req.params;
   const { role, id } = req.user;
   
   if(role === ROLES.CHILD && userId != id){
    res.status(403).json({ error: 'Access denied'});
    return;
   }
  
   next();
}
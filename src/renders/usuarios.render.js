import { usuariosRepository } from "../repositories/usuarios.repository.js";

export async function renderUsuarios(req,res,next){
    const usuarios = await usuariosRepository.readMany({})

    res.render('usuarios',{
        usuarios,
        usuario : req.usuario,
    })
}
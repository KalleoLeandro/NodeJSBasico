const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController{
    static login(req,res){
        res.render('auth/login');
    }
    
    static async loginPost(req,res){
        const {email, senha} = req.body

        //find user

        const user = await User.findOne({where:{email: email}});

        if(!user){
            req.flash('message', 'Usuário e/ou senha inválidos(a)!');
            res.render('auth/login');
            return;
        }

        //check if passwords match
        const password = bcrypt.compareSync(senha, user.senha);
        if(password){
            req.flash('message', 'Usuário e/ou senha inválidos(a)!');
            res.render('auth/login');
            return;
        } else {            
            req.session.userid = user.id;
            req.session.save(()=>{
                res.redirect('/')    
            })            
        }

    }

    static register(req,res){
        res.render('auth/register');
    }

    static async registerPost(req,res){
        const {name, email, senha, confirmsenha} = req.body

        console.log(senha + " - " + confirmsenha);
        
        //password match validation

        if(senha != confirmsenha){
            //mensagem
            req.flash('message', 'As senhas não conferem, tente novamente!');
            res.render('auth/register');
            return;
        }

        //check if user exists
        const checkIfUserExists = await User.findOne({where:{email: email}})

        if(checkIfUserExists){
            req.flash('message', 'Usuário já está cadastrado!');
            res.render('auth/register');
            return;
        }

        //create a password

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(senha, salt);

        const user = {
            name: name,
            email: email,
            senha: hashedPassword
        }

        try{
            const createdUser = await User.create(user)
            req.flash('message', 'Cadastro realizado com sucesso!');
            req.session.userid = createdUser.id;
            req.session.save(()=>{
                res.redirect('/')    
            })            
        }catch(e){
            console.log(e)
        }
        
    }

    static logout(req,res) {        
        req.session.destroy();
        res.redirect('/login');
    }
}
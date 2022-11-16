const User = require("../models/user");

module.exports.profile = function(req,res){
    // res.end('<h1>User Profile</h1>')
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: 'User profile',
                    user: user,
                })
            }
            return res.redirect('/users/sign-in');
        })
    }
    else{
        return res.redirect('/users/sign-in');
    }
}

// render sign in page
module.exports.signin = function(req,res){
    res.render('user_sign_in',{
        title: 'Sign In'
    })
}

// render sign in page when user clicks sign out and delete the cookie
module.exports.signout = function(req,res,){

    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');

}

// get the signup data
module.exports.create = function(req,res){
    // the below code is manual authentication
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in sining up');return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error is creating user while signing up'); return}
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    })
}

// user sign in and create session
module.exports.createSession = function(req,res){
    // the below code is manual authentication
    //steps to authenticate
    // find the user
    // User.findOne({email: req.body.email},function(err,user){
    //     if(err){console.log('error is creating user while signing in'); return}

    //     // handle user found
    //     if(user){
    //         //handle password which don't match
    //         if(user.password != req.body.password){
    //             return res.redirect('back')
    //         }
    //         // handle session creation
    //         res.cookie('user_id',user.id);
    //         return res.redirect('/users/profile');
    //     }else{
    //         //handle user not found
    //         return res.redirect('back');
    //     }
    // })

    return res.redirect('/');
    


}
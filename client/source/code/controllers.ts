import { Request, Response } from 'express';
import { Main } from './main';
import { Config } from './config';
export class Controller {
    static getController(req: Request, res: Response) {
        // res.sendFile(process.cwd()+`/static/index.html`)
        res.render("index",{
            result:undefined,
            title:"Request",
            msg:"Enter min and max values",
        })
    }
    static postController(req: Request, res: Response) {
        try {
            console.log(req.body)
            let from = parseInt(req.body.from);
            let until = parseInt(req.body.until);
            if(isNaN(from)||isNaN(until)) {
                throw {message : "Assertion Error: Check input values"}
            } else if(until<from) {
                const t = from;
                from = until;
                until = t;
            }
            Main.run(Config.getInstance().getServerAddress(), from, until)
            .then(val => {
                res.render("index",{
                    result:val,
                    title:"Response",
                    msg:"",
                })
                // res.send({result: val});
            })
            .catch(err => {
                res.render("index",{
                    result:undefined,
                    title:"Response",
                    msg:err.message || "Something went wrong, try again"
                })
                // res.send({details:err.details, message:err.details || "Something went wrong, try again"});
            });
        } catch  (er) {
            res.render("index",{
                result:undefined,
                title:"Response",
                msg:er.message || "Something went wrong, try again"
            })
            // res.send({details:er.message, message:er.message || "Something went wrong, try again"});
        }
    }
}
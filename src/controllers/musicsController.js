//const musics = require("../models/musics.json")

const musics = require("../models/music")
//const fs = require("fs")

//ok
const createMusic = (req, res) => {

    let requestedTitle = req.body.titulo
    let requestedDuration = req.body.duration
    let requestedLaunchYear = req.body.launchYear
    let requestedFavorited = req.body.favorited
    let requestedArtists = req.body.artists
    
    let newMusic = new musics({
        "id": Math.random().toString(32).substr(2), 
        "title": requestedTitle,
        "duration": requestedDuration,
        "launchYear": requestedLaunchYear,
        "favorited": requestedFavorited,
        "artists": requestedArtists
    })

  newMusic.save(function (err){
      if (err){
          res.status(500).send({message: err.message})
      }else{
        res.status(200).send({
            "message": "música criada com sucesso",
            newMusic
        })
      }
  })

  
}
    // let { id, title, duration, launchYear, favorited, artists } = req.body
    // let requiredId = req.params.id;

    // let music = {
    //     "id": Math.random().toString(32).substr(2),
    //     title,
    //     duration,
    //     launchYear,
    //     favorited,
    //     artists,
    //     musicId: requiredId


    // }

    // musics.findOne({ id: requiredId}, function (err, musicasencontradas){ 
    //     if (err) {
    //         res.status(500).send({message: err.message})
    //     }else {
    //         if (musicsFound) {
    //             let newMusic = new musics(musics)
    //             newMusic.save(function (err){
    //                 if (err) {
    //                     res.status(500).send({message: err.message})
    //                 }else{
    //                     musicsFound.musics.push(musics)
    //                     musics.updateOne({ id: requiredId}, ($set: {musics}))
    //                 }
    //             })
    //         }
    //     }
    //})
   
//ok
const deleteMusic = (req, res) => {
     
         const musicId = req.params.id
         musics.findOne({id: musicId}, function (err, musics){
             if (err){
                 res.status(500).send({message: err.message})
             }else{
                 if (musics){
                     musics.deleteOne({id: musicId}, function (err){
                         if (err) {
                             res.status(500).send({
                                 message:err.message,
                                 status: "FAIL"
                             })
                         }else{
                             res.status(200).send({
                                 message: 'Música removida com sucesso',
                                 status: "Success"
                             })
                         } 
                     })
                 } else {
                     res.status(404).send({ "message": "Não há música para ser removida"})
                 }
             }
         })
             
         }
 
   
//verificar
const updateMusic = (req, res) => {
 
    const musicId = req.params.id

    musics.findOne({id: musicId}, function (err, musicsFound){
        if (err){
            res.status(500).send({message: err.message})
        }else {
            if (musicsFound){
                musics.updateOne({id: musicId}, {$set: req.body}, function (err){
                if (err){
                    res.status(500).send({message: err.message})
                } else{
                    res.status(200).send({ message: "Música alterada com sucesso"})
                }   
                })
            } else{
                res.status(404).send({message:"Não há registro para ser atualizado com esse id" })
            }
        }
    })
}

const updateFavorited = (req, res) => {
    
    const musicId = req.params.id

    let newTitle = req.body.title

    musics.findOne({id: musicId}, function (err, musicFound){
        if (err){
            res.status(500).send({ message: err.message})
        }else {
            if (musicFound){
                musics.updateOne({ id: musicId}, {$set: {title: newTitle}}, function (err){
                  if (err) {
                      res.status(500).send({message: err.message})
                  }else {
                      res.status(200).send({message: "Titulo alterado com sucesso"})
                  }
                })
            }else {
                res.status(404).send({"message": "Não há registro para ter o título atualizado com esse id" })
            }
        }
    })
}

        
    //     const favorited = req.body.favorited
    //     const musicFound = musics.find(music => music.id == musicId) // encontrando a música
    //     const musicIndex = musics.indexOf(musicFound) // identifico o índice da música no meu array

    //     if (musicIndex >= 0) { // verifico se a música existe no array de músicas
    //         musicFound.favorited = favorited //atualizamos o objeto com o novo nome
    //         musics.splice(musicIndex, 1, musicFound) // atualizando o array de músicas com a música atualizada

    //         fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
    //             if (err) {
    //                 res.status(500).send({ message: err })
    //             } else {
    //                 console.log("Arquivo atualizado com sucesso!")
    //                 const musicpdated = musics.find(music => music.id == musicId) // separo a música que modifiquei no array
    //                 res.status(200).send(musicpdated) // envio a música modificada como resposta
    //             }
    //         })
    //     } else {
    //         res.status(404).send({ message: "Música não encontrada para modificar o nome." })
    //     }

    // } catch (err) {
    //     res.status(500).send({ message: err })
    // }

//ok
const getAllMusics = (req, res) => {
    
    let allmusics = musics.find(function(err, musicasencontradas){
        
        if (err){
            res.status(500).send({message: "erro"})
        }else{
          if(musicasencontradas && musicasencontradas.length>0){
              res.status(200).send(musicasencontradas)
          }else{
              res.status(204).send()
          }

    }
    })
}


//ok
const getMusic = (req, res) => {
    const musicId = req.params.id

    musics.findOne({ id: musicId}, function(err, musicsFound){
       if (err){
           res.status(500).send({ message: err.message})
       }else {
           if (musicsFound){
               res.status(200).send(musicsFound)
           }else{
               res.status(204).send()
           }
       }
    })

 }

module.exports = {
    createMusic,
    deleteMusic,
    updateFavorited,
    updateMusic,
    getAllMusics,
    getMusic,
}
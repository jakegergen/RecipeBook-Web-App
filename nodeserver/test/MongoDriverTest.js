const assert = require('chai').assert;


const MongoDriver = require('../MongoDriver').MongoDriver;

const mockData = require('/home/jake/Documents/jkl/nodeserver/test/mockData/data.json')


describe('mongoDriver addRecipe test',function(){
    var uri = "mongodb://localhost:27017";
    var dbname = "testRecipes";
    var collectionName = "testCollectionMessy";
    const mongo = new MongoDriver(uri,dbname,collectionName);

    let driver = new MongoDriver(uri,dbname,collectionName);
    
    it('1. add good recipe',function(done){
        driver.addRecipe('testRecipe',['ingredient1','ingredient2','ingredient3']).then((promise)=>{
            
            assert.equal(promise.insertedCount,1)
            done();
        }).catch((e)=>{
            console.log(e);
        });
    });
    it('2. add bad recipe: ingredients == null',(done)=>{
        driver.addRecipe('testRecipe',null).then((promise)=>{
           assert.equal(promise,null);
           done();
            
        }).catch((e)=>{
            console.log(e);
        });
    })
    it('3. add bad recipe: ingredients.length == 0',(done)=>{
        driver.addRecipe('testRecipe',[]).then((promise)=>{
            assert.equal(promise,null);
            done();
            
        }).catch((e)=>{
            console.log(e);
        });
    })
});

describe('mongoDriver getRecipe test',()=>{
    //{_id:1,recipeName:'mock1',recipeIngredients:['i0','i1','i2']};
    //{_id:2,recipeName:'mock2',recipeIngredients:['i0','i1','i2']}
    //{_id:3,recipeName:'mock3',recipeIngredients:['ingredient']}
    var uri = "mongodb://localhost:27017";
    var dbname = "testRecipes";
    var collectionName = "testCollectionClean";
    let driver = new MongoDriver(uri,dbname,collectionName);
    driver.dropCollection(); //Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
    driver.addMockData();

    it('get mock0',(done)=>{
        driver.getRecipeByName('mock0').then((promise)=>{
            assert.deepEqual(promise,[mockData[0]]);
            done();    
        }).catch((e)=>{
            console.log(e);
        });
        
    });

    it('get mock1',(done)=>{
        driver.getRecipeByName('mock1').then((promise)=>{
            assert.deepEqual(promise,[mockData[1]]);
            done();
        }).catch((e)=>{
            console.log(e);
        });
        
    })
    it('get mock2',(done)=>{
        driver.getRecipeByName('mock2').then((promise)=>{
             assert.deepEqual(promise,[mockData[2]]);
            done();
        }).catch((e)=>{
            console.log(e);
        });
        
    })
    it('get unknown recipe',(done)=>{
        driver.getRecipeByName('mock4').then((promise)=>{
            assert.deepEqual(promise,[]);
            done();
        }).catch((e)=>{
            console.log(e);
        });
    })
})


describe('Testing getAllrecipes',()=>{
    it('1. Test get All Recipes',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionClean";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{
            driver.addMockData().then((p)=>{
                driver.getAllRecipe().then((promise)=>{
                    //console.log(promise);
                     assert.deepEqual(promise,mockData)
                     done();
                 }).catch((e)=>{
                     console.log(e);
                     done(e);
                 });
            })
        }); //Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
       


       
    });
})

describe('Testing delete Recipe',()=>{
    it('1. Delete known recipe by ID 1',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeById(mockData[0]._id).then((p)=>{
                    assert.deepEqual(p.deletedCount,1);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })

    it('2. Delete known recipe by ID',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeById(mockData[1]._id).then((p)=>{
                    assert.deepEqual(p.deletedCount,1);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })

    it('3. Delete known recipe by ID',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeById(mockData[2]._id).then((p)=>{
                    assert.deepEqual(p.deletedCount,1);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })

    it('1. Delete known recipe by Name',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeByName(mockData[0].recipeName).then((p)=>{
                    assert.deepEqual(p.deletedCount,1);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })
    it('2. Delete known recipe by Name',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeByName(mockData[1].recipeName).then((p)=>{
                    assert.deepEqual(p.deletedCount,1);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })
    it('3. Delete known recipe by Name',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeByName(mockData[2].recipeName).then((p)=>{
                    assert.deepEqual(p.deletedCount,1);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })
    it('1. Delete UnKnowen recipe by ID',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeById(101).then((p)=>{
                    assert.deepEqual(p.deletedCount,0);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })
    it('2. Delete UnKnowen recipe by Name',(done)=>{
        var uri = "mongodb://localhost:27017";
        var dbname = "testRecipes";
        var collectionName = "testCollectionMessy";
        let driver = new MongoDriver(uri,dbname,collectionName);
        driver.dropCollection().then(()=>{//Clean collection for testing... NEVER CALL ON PRODUCTION COLLECTION
            driver.addMockData().then((p)=>{
                driver.deleteRecipeById('does not exist').then((p)=>{
                    assert.deepEqual(p.deletedCount,0);
                    done();
                }).catch((e)=>{
                    console.log(e);
                    done(e);
                })
            });
        }); 
    })
})

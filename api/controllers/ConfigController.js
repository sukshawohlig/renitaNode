/**
 * ConfigController
 *
 * @description :: Server-side logic for managing Configs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");
var request = require("request");
var sm = require('sitemap');
global["database"] = "sfa";
global["mongoose"] = require('mongoose');
global["fs"] = require('fs');
global["exec"] = require('child_process').exec;
global["moment"] = require("moment");

// var checksum = require('./checksum');
module.exports = {

    saveData: function (req, res) {
        if (req.body) {
            Config.saveData(req.body, function (err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    getAll: function (req, res) {
        if (req.body) {
            Config.getAll(req.body, function (err, respo) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: respo
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    delete: function (req, res) {
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                Config.deleteData(req.body, function (err, respo) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: respo
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },
    emailReader: function (req, res) {
        console.log(req.body);
        var isfile2 = fs.existsSync('./views/' + req.body.filename);
        console.log(isfile2);
        if (isfile2) {
            res.view(req.body.filename, req.body);
        } else {
            res.json({
                value: false,
                message: "Please provide params"
            });
        }
    },
    response: function (req, res) {
        console.log(req.body);
        if (req.body) {
            res.json({
                value: true,
                data: "API Called successfully"
            });
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    backupDatabase: function (req, res) {
        res.connection.setTimeout(200000000);
        req.connection.setTimeout(200000000);
        var request = require('request');
        var mongoose = require('mongoose');
        var moment = require('moment');
        var fs = require('fs');
        var exec = require('child_process').exec;
        var q = req.host.search("127.0.0.1");
        var database = "renita";
        if (q >= 0) {
            _.times(20, function (n) {
                var name = moment().subtract(2 + n, "days").format("ddd-Do-MMM-YYYY");
                //console.log(name);
                exec("cd backup && rm -rf " + name + "*", function (err, stdout, stderr) {});
            });
            res.callback(null, "Rest of Files Deleted and the current one will be generated Now.");
            var jagz = _.map(mongoose.models, function (Model, key) {
                var name = Model.collection.collectionName;
                return {
                    key: key,
                    name: name,
                };
            });
            jagz.push({
                "key": "fs.chunks",
                "name": "fs.chunks"
            }, {
                "key": "fs.files",
                "name": "fs.files"
            });
            var isBackup = fs.existsSync("./backup");
            if (!isBackup) {
                fs.mkdirSync("./backup");
            }
            var mom = moment();
            var folderName = "./backup/" + mom.format("ddd-Do-MMM-YYYY-HH-mm-SSSSS");
            var retVal = [];
            fs.mkdirSync(folderName);
            async.eachSeries(jagz, function (obj, callback) {
                exec("mongoexport --port " + port + " --username " + username + " --password " + password + " --db " + database + " --collection " + obj.name + " --out " + folderName + "/" + obj.name + ".json", function (data1, data2, data3) {
                    retVal.push(data3 + " VALUES OF " + obj.name + " MODEL NAME " + obj.key);
                    callback();
                });
            }, function () {
                // res.json(retVal);
            });
        } else {
            res.callback("Access Denied for Database Backup");
        }
    },

    sitemapXml: function (req, res) {
        sitemap = sm.createSitemap({
            hostname: 'http://renderclinic.com/',
            cacheTime: 600000, // 600 sec - cache purge period
            urls: [{
                    url: '/http://renderclinic.com/category/RenderShape/59f6fabf1f936c215273632e/',
                    changefreq: 'daily',
                    priority: 0.3
                },
                {
                    url: '/http://renderclinic.com/category/Skin/57a994734639006667c61e6f/',
                    changefreq: 'daily',
                    priority: 0.3
                },
                {
                    url: '/http://renderclinic.com/category/Hair%20and%20Scalp/57ac6b71e52b52620839dbf9/',
                    changefreq: 'daily',
                    priority: 0.3
                },
                {
                    url: '/http://renderclinic.com/category/Body/57ac6b7ae52b52620839dbfa/',
                    changefreq: 'daily',
                    priority: 0.3
                },
                {
                    url: '/http://renderclinic.com/category/Treatments/57ac6b8ee52b52620839dbfc/',
                    changefreq: 'daily',
                    priority: 0.3
                },
                {
                    url: '/http://renderclinic.com/category/Mommy%20Derm/57ac6b98e52b52620839dbfd/',
                    changefreq: 'daily',
                    priority: 0.3
                },
                {
                    url: '/http://renderclinic.com/about-us/',
                    changefreq: 'monthly',
                    priority: 0.7
                },
                {
                    url: '/http://renderclinic.com/team/',
                    changefreq: 'monthly',
                    priority: 0.7
                },
                {
                    url: '/http://renderclinic.com/consultant/',
                    changefreq: 'monthly',
                    priority: 0.7
                },
                {
                    url: '/http://renderclinic.com/before-after/',
                    changefreq: 'monthly',
                    priority: 0.7
                },
                {
                    url: '/http://renderclinic.com/testimonial/',
                    changefreq: 'monthly',
                    priority: 0.7
                }, // changefreq: 'weekly',  priority: 0.5
                {
                    url: '/http://renderclinic.com/blog/',
                    changefreq: 'monthly',
                    priority: 0.7
                },
                {
                    url: '/http://renderclinic.com/clinic-policy/',
                    changefreq: 'monthly',
                    priority: 0.7
                },
                {
                    url: '/http://renderclinic.com/contact/',
                    changefreq: 'monthly',
                    priority: 0.7
                }
                // {
                //     url: '/http://renderclinic.com/team/',
                //     img: "http://urlTest.com"
                // }
            ]
        });
        fs.writeFileSync(".tmp/sitemap.xml", sitemap.toString());
    },
};

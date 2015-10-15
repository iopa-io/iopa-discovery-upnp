/*
 * Copyright (c) 2015 Internet of Protocols Alliance (IOPA)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Constants and declarations
 */
 
global.Promise = require('bluebird');

const iopa = require('iopa'),
  IOPA = iopa.constants.IOPA,
  SERVER = iopa.constants.SERVER,
  DEVICE = iopa.constants.DEVICE,
  RESOURCE = iopa.constants.RESOURCE,
     packageVersion = require('./package.json').version;

const IopaUDP = require('iopa-udp'),
  IopaTCP = require('iopa-tcp');

const IopaUPNP = require('./index.js'),
    IopaClientUPNP = IopaUPNP.Client,
    IopaSeverUPNP = IopaUPNP.Server
    
const iopaMessageLogger = require('iopa-logger').MessageLogger

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Demo Device Class
 */
   
function DemoDevice(){
  var _device = {};
  _device[DEVICE.ModelManufacturer] = "Internet of Protocols Alliance";
  _device[DEVICE.ModelManufacturerUrl] = "http://iopa.io";
  _device[DEVICE.ModelName] = "npm install iopa-devices";
  _device[DEVICE.ModelNumber] = "iopa-devices";
  _device[DEVICE.ModelUrl] = "http://github.com/iopa-io/iopa-devices";

  _device[DEVICE.PlatformId] = "LOCALHOST";
  _device[DEVICE.PlatformName] = "Iopa Device Stick";
  _device[DEVICE.PlatformFirmware] = packageVersion;
  _device[DEVICE.PlatformOS] = require('os').type() + "/" + require('os').release();

  _device[DEVICE.Id] = "12345-67890";
  _device[DEVICE.Type] = "urn:io.iopa:demo:devices";
  _device[DEVICE.Version] = packageVersion;
  _device[DEVICE.Location] = [37.7833, 122.4167];
  _device[DEVICE.LocationName] = "San Francisco, USA";
  _device[DEVICE.Currency] = "USD";
  _device[DEVICE.Region] = "Home";
  _device[DEVICE.Policy] = null;
  _device[DEVICE.Url] = "coap://localhost";
  
  _device[DEVICE.Resources] = [];
  var _res = {};
  _res[RESOURCE.TypeName] = "IOPA Demo Projector";
  _res[RESOURCE.Type] = "urn:io.iopa:resource:projector";
  _res[RESOURCE.Interface] = "if.switch.binary";
  _res[RESOURCE.Path] = "/media/projector";
  _res[RESOURCE.Name] = "Projector 1";
  _res[RESOURCE.Value] = false;
  _device[DEVICE.Resources].push(_res);
  
  this._device = _device;
}

Object.defineProperty(DemoDevice.prototype, "context", { get: function () { return this._device; } })
Object.defineProperty(DemoDevice.prototype, DEVICE.SystemTime, { get: function () { return new Date().toISOString(); } })
 

/**
 * Main Application Logic
 */
 
var app = new iopa.App();
app.use(IopaUDP);
app.use(IopaTCP);
app.use(IopaClientUPNP);
app.use(IopaSeverUPNP);

app.use(function (context, next) {
  context.log.info("[DEMO] DEVICES APP USE " + context["iopa.Method"] + " " + context["iopa.Path"]);
  return next();
});

 app.device.register(new DemoDevice().context)
 
 setTimeout(function(){
   
 app.device.probe("upnp:rootdevice", function(device){
        console.log(device.toString());
      });}, 2000);
      
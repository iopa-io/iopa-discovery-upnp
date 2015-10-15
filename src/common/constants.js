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

const iopa = require('iopa'),
 constants = iopa.constants,
 DEVICE = constants.DEVICE,
 RESOURCE = constants.RESOURCE;

exports.DEVICESMIDDLEWARE = {CAPABILITY: "urn:io.iopa:devices", PROTOCOLVERSION: "1.3"}
exports.UPNPDISCOVERY = {CAPABILITY: "urn:io.iopa:discovery:upnp", PROTOCOLVERSION: "1.3"}

const SSDP = {
  CAPABILITY: "urn:io.iopa:ssdp",
  SCHEME: "ssdp:",
  MULTICASTIPV4: '239.255.255.250',
  PORT: 1901,
  MAX_AGE: "max-age=1800",
  TTL: 128,
  MX: 2,
  PROTOCOL: "HTTP/1.1",
  UPNP_ROOTDEVICE: "upnp:rootdevice",
  UPNP_DEVICESCHEMA: "urn:schemas.iopa.io:device:",
  UPNP_SERVICESCHEMA: "urn:schemas.iopa.io:resource:",
  UPNP_UUID: "uuid:",
  UPNP_PROTOCOL: "UPnP/1.0",
  UPNP_IOPA_WELL_KNOWN: "/iopa/upnp",
  UPNP_IOPA_DEVICEXML: "device.xml",
  
  METHODS:
  {
    MSEARCH: "M-SEARCH",
    NOTIFY: "NOTIFY",
    RESPONSE: "RESPONSE"
  },
}
// export default class Utils {
//     static stripObj(obj: any, attributes: any, excludedAttributes: any) { 
//         if (!attributes && !excludedAttributes) return obj;
//         if (!obj || typeof obj !== 'object') return obj;
//         let arrObj;
//         if (!Array.isArray(obj)) {
//              arrObj = [obj];
//         } else {
//           if (obj.length < 1) return obj;
//           arrObj = obj;
//         }
//         let arrRet = [];
//         const arrCheckEmpty: any[] = [];
//         if (attributes) {
//           const arrAttr = attributes.split(',').map((item: string) => item.trim());
//           arrRet = arrObj.map(obj => {
//             const ret: any = {};
//             for (let i = 0; i < arrAttr.length; i++) {
//               const attr = arrAttr[i].split('.'); // title / name.familyName / emails.value
//               if (Object.prototype.hasOwnProperty.call(obj, attr[0])) {
//                 if (attr.length === 1) ret[attr[0]] = obj[attr[0]]
//                 else if (Object.prototype.hasOwnProperty.call(obj[attr[0]], attr[1])) { // name.familyName
//                   if (!ret[attr[0]]) ret[attr[0]] = {};
//                   ret[attr[0]][attr[1]] = obj[attr[0]][attr[1]];
//                 } else if (Array.isArray(obj[attr[0]])) { // emails.value / phoneNumbers.type
//                   if (!ret[attr[0]]) ret[attr[0]] = [];
//                   const arr = obj[attr[0]];
//                   for (let j = 0; j < arr.length; j++) {
//                     if (typeof arr[j] !== 'object') {
//                       ret[attr[0]].push(arr[j]);
//                     } else if (Object.prototype.hasOwnProperty.call(arr[j], attr[1])) {
//                       if (ret[attr[0]].length !== arr.length) { // initiate
//                         for (let i = 0; i < arr.length; i++) ret[attr[0]].push({}) // need arrCheckEmpty
//                       }
//                       ret[attr[0]][j][attr[1]] = arr[j][attr[1]];
//                       if (!arrCheckEmpty.includes(attr[0])) arrCheckEmpty.push(attr[0]);
//                     }
//                   }
//                 }
//               }
//             }
//             if (arrCheckEmpty.length > 0) {
//               for (let i = 0; i < arrCheckEmpty.length; i++) {
//                 const arr = ret[arrCheckEmpty[i]]
//                 for (let j = 0; j < arr.length; j++) {
//                   try {
//                     if (JSON.stringify(arr[j]) === '{}') arr.splice(j, 1)
//                   } catch(err) {}
//                 }
//               }
//             }
//             return ret
//           })
//         } else if (excludedAttributes) {
//           const arrAttr = excludedAttributes.split(',').map((item: string) => item.trim())
//           arrRet = arrObj.map(obj => {
//             const ret = this.copyObj(obj)
//             for (let i = 0; i < arrAttr.length; i++) {
//               const attr = arrAttr[i].split('.') // title / name.familyName / emails.value
//               if (Object.prototype.hasOwnProperty.call(ret, attr[0])) {
//                 if (attr.length === 1) delete ret[attr[0]]
//                 else if (Object.prototype.hasOwnProperty.call(ret[attr[0]], attr[1])) delete ret[attr[0]][attr[1]] // name.familyName
//                 else if (Array.isArray(ret[attr[0]])) { // emails.value / phoneNumbers.type
//                   const arr = ret[attr[0]]
//                   for (let j = 0; j < arr.length; j++) {
//                     if (Object.prototype.hasOwnProperty.call(arr[j], attr[1])) {
//                       const index = arr.findIndex((el: any) => ((Object.prototype.hasOwnProperty.call(el, attr[1]))))
//                       if (index > -1) {
//                         delete arr[index][attr[1]]
//                         try {
//                           if (JSON.stringify(arr[index]) === '{}') arr.splice(index, 1)
//                         } catch(err) {}
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//             return ret
//           })
//         } else { // should not be here
//           arrRet = [{}]
//         }
//         if (!Array.isArray(obj)) return arrRet[0]
//         return arrRet
//       }

//       static copyObj (o: any) { // deep copy/clone faster than JSON.parse(JSON.stringify(o))
//         let v, key
//         const output: any = Array.isArray(o) ? [] : {}
//         for (key in o) {
//           v = o[key]
//           if (typeof v === 'object' && v !== null) {
//             const objProp = Object.getPrototypeOf(v) // e.g. HttpsProxyAgent {}
//             if (objProp !== null && objProp !== Object.getPrototypeOf({}) && objProp !== Object.getPrototypeOf([])) {
//               output[key] = Object.assign(Object.create(v), v) // e.g. { HttpsProxyAgent {...} }
//             } else output[key] = this.copyObj(v)
//           } else output[key] = v
//         }
//         return output
//       }
//     }
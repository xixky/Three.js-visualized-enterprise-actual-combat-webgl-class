define(["./ComponentDatatype-a15c9a19","./defaultValue-81eec7ed","./IndexDatatype-f1dcdf35","./RuntimeError-8952249c","./createTaskProcessorWorker","./WebGLConstants-508b9636"],(function(t,e,r,n,o,a){"use strict";let i;function s(t,e){const n=t.num_points(),o=t.num_faces(),a=new i.DracoInt32Array,s=3*o,c=r.IndexDatatype.createTypedArray(n,s);let u=0;for(let r=0;r<o;++r)e.GetFaceFromMesh(t,r,a),c[u+0]=a.GetValue(0),c[u+1]=a.GetValue(1),c[u+2]=a.GetValue(2),u+=3;return i.destroy(a),{typedArray:c,numberOfIndices:s}}function c(r,n,o){const a=r.num_points(),s=o.num_components();let c,u=new i.AttributeQuantizationTransform;if(u.InitFromAttribute(o)){const t=new Array(s);for(let e=0;e<s;++e)t[e]=u.min_value(e);c={quantizationBits:u.quantization_bits(),minValues:t,range:u.range(),octEncoded:!1}}i.destroy(u),u=new i.AttributeOctahedronTransform,u.InitFromAttribute(o)&&(c={quantizationBits:u.quantization_bits(),octEncoded:!0}),i.destroy(u);const d=a*s;let f;f=e.defined(c)?function(t,e,r,n,o){let a,s;n.quantizationBits<=8?(s=new i.DracoUInt8Array,a=new Uint8Array(o),e.GetAttributeUInt8ForAllPoints(t,r,s)):(s=new i.DracoUInt16Array,a=new Uint16Array(o),e.GetAttributeUInt16ForAllPoints(t,r,s));for(let t=0;t<o;++t)a[t]=s.GetValue(t);return i.destroy(s),a}(r,n,o,c,d):function(t,e,r,n){let o,a;switch(r.data_type()){case 1:case 11:a=new i.DracoInt8Array,o=new Int8Array(n),e.GetAttributeInt8ForAllPoints(t,r,a);break;case 2:a=new i.DracoUInt8Array,o=new Uint8Array(n),e.GetAttributeUInt8ForAllPoints(t,r,a);break;case 3:a=new i.DracoInt16Array,o=new Int16Array(n),e.GetAttributeInt16ForAllPoints(t,r,a);break;case 4:a=new i.DracoUInt16Array,o=new Uint16Array(n),e.GetAttributeUInt16ForAllPoints(t,r,a);break;case 5:case 7:a=new i.DracoInt32Array,o=new Int32Array(n),e.GetAttributeInt32ForAllPoints(t,r,a);break;case 6:case 8:a=new i.DracoUInt32Array,o=new Uint32Array(n),e.GetAttributeUInt32ForAllPoints(t,r,a);break;case 9:case 10:a=new i.DracoFloat32Array,o=new Float32Array(n),e.GetAttributeFloatForAllPoints(t,r,a)}for(let t=0;t<n;++t)o[t]=a.GetValue(t);return i.destroy(a),o}(r,n,o,d);const y=t.ComponentDatatype.fromTypedArray(f);return{array:f,data:{componentsPerAttribute:s,componentDatatype:y,byteOffset:o.byte_offset(),byteStride:t.ComponentDatatype.getSizeInBytes(y)*s,normalized:o.normalized(),quantization:c}}}function u(t){return e.defined(t.bufferView)?function(t){const e=new i.Decoder,r=["POSITION","NORMAL","COLOR","TEX_COORD"];if(t.dequantizeInShader)for(let t=0;t<r.length;++t)e.SkipAttributeTransform(i[r[t]]);const o=t.bufferView,a=new i.DecoderBuffer;if(a.Init(t.array,o.byteLength),e.GetEncodedGeometryType(a)!==i.TRIANGULAR_MESH)throw new n.RuntimeError("Unsupported draco mesh geometry type.");const u=new i.Mesh,d=e.DecodeBufferToMesh(a,u);if(!d.ok()||0===u.ptr)throw new n.RuntimeError(`Error decoding draco mesh geometry: ${d.error_msg()}`);i.destroy(a);const f={},y=t.compressedAttributes;for(const t in y)if(y.hasOwnProperty(t)){const r=y[t],n=e.GetAttributeByUniqueId(u,r);f[t]=c(u,e,n)}const A={indexArray:s(u,e),attributeData:f};return i.destroy(u),i.destroy(e),A}(t):function(t){const e=new i.Decoder;t.dequantizeInShader&&(e.SkipAttributeTransform(i.POSITION),e.SkipAttributeTransform(i.NORMAL));const r=new i.DecoderBuffer;if(r.Init(t.buffer,t.buffer.length),e.GetEncodedGeometryType(r)!==i.POINT_CLOUD)throw new n.RuntimeError("Draco geometry type must be POINT_CLOUD.");const o=new i.PointCloud,a=e.DecodeBufferToPointCloud(r,o);if(!a.ok()||0===o.ptr)throw new n.RuntimeError(`Error decoding draco point cloud: ${a.error_msg()}`);i.destroy(r);const s={},u=t.properties;for(const t in u)if(u.hasOwnProperty(t)){let r;if("POSITION"===t||"NORMAL"===t){const n=e.GetAttributeId(o,i[t]);r=e.GetAttribute(o,n)}else{const n=u[t];r=e.GetAttributeByUniqueId(o,n)}s[t]=c(o,e,r)}return i.destroy(o),i.destroy(e),s}(t)}function d(t){i=t,self.onmessage=o(u),self.postMessage(!0)}return function(t){const r=t.data.webAssemblyConfig;if(e.defined(r))return require([r.modulePath],(function(t){e.defined(r.wasmBinaryFile)?(e.defined(t)||(t=self.DracoDecoderModule),t(r).then((function(t){d(t)}))):d(t())}))}}));

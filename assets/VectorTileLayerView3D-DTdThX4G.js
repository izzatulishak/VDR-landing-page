import{oD as ye,oF as xe,ce as De,cF as we,gk as J,i7 as Re,oz as Ce,fj as Ie,sJ as q,I as Ee,hy as ee,wN as Ue,fI as Le,bF as ze,ar as ke,wO as Ae,wP as te,uf as Ve,wQ as Fe,uv as $e,wR as Oe,oH as Z,wS as L,ks as A,pa as Ne,wT as He,wU as Se,wV as ie,rQ as $,wW as Be,wX as ae,wY as We,wZ as ne,l as se,s as qe,w_ as Ge,w$ as Ke,bR as Ye,K as je,N as Xe,bY as Ze,u as re,_ as V,m as O,b as Qe}from"./index-BiSWWdHA.js";import{t as k}from"./Rect-BAnET0xx.js";import{n as Je}from"./pbf-bXBJwF7K.js";import{u as et}from"./rasterizingUtils-BCsP1ANI.js";import{l as oe}from"./StyleRepository-H3MjUg0j.js";import{l as tt}from"./LayerView3D-D7-E2zMU.js";import{p as it}from"./TiledLayerView3D-C5qNnRVh.js";import{d as at}from"./LayerView-XxBSWkwC.js";let nt=class{constructor(e,i,t){this._scale=e,this._shift=i,this._levelShift=t}getLevelRowColumn(e){const i=this.getLevelShift(e[0]),t=this._shift+i;return t?[e[0]-i,e[1]>>t,e[2]>>t]:e}getLevelShift(e){return Math.min(e,this._levelShift)}getOffset(e,i){let t=0,n=0;const a=this._shift+this.getLevelShift(e[0]);if(a){const r=(1<<a)-1,s=i/(this._scale*(1<<a-1));t=(e[2]&r)*s,n=(e[1]&r)*s}return[t,n]}getScale(e){return this._scale*(1<<this._shift+this.getLevelShift(e))}},G=class{constructor(e,i){this._width=0,this._height=0,this._free=[],this._width=e,this._height=i,this._free.push(new k(0,0,e,i))}get width(){return this._width}get height(){return this._height}allocate(e,i){if(e>this._width||i>this._height)return new k;let t=null,n=-1;for(let a=0;a<this._free.length;++a){const r=this._free[a];e<=r.width&&i<=r.height&&(t===null||r.y<=t.y&&r.x<=t.x)&&(t=r,n=a)}return t===null?new k:(this._free.splice(n,1),t.width<t.height?(t.width>e&&this._free.push(new k(t.x+e,t.y,t.width-e,i)),t.height>i&&this._free.push(new k(t.x,t.y+i,t.width,t.height-i))):(t.width>e&&this._free.push(new k(t.x+e,t.y,t.width-e,t.height)),t.height>i&&this._free.push(new k(t.x,t.y+i,e,t.height-i))),new k(t.x,t.y,e,i))}release(e){for(let i=0;i<this._free.length;++i){const t=this._free[i];if(t.y===e.y&&t.height===e.height&&t.x+t.width===e.x)t.width+=e.width;else if(t.x===e.x&&t.width===e.width&&t.y+t.height===e.y)t.height+=e.height;else if(e.y===t.y&&e.height===t.height&&e.x+e.width===t.x)t.x=e.x,t.width+=e.width;else{if(e.x!==t.x||e.width!==t.width||e.y+e.height!==t.y)continue;t.y=e.y,t.height+=e.height}this._free.splice(i,1),this.release(e)}this._free.push(e)}},le=class{constructor(e,i,t){this.width=0,this.height=0,this._dirties=[],this._glyphData=[],this._currentPage=0,this._glyphIndex={},this._textures=[],this._rangePromises=new Map,this.width=e,this.height=i,this._glyphSource=t,this._binPack=new G(e-4,i-4),this._glyphData.push(new Uint8Array(e*i)),this._dirties.push(!0),this._textures.push(void 0)}getGlyphItems(e,i){const t=[],n=this._glyphSource,a=new Set,r=1/256;for(const o of i){const l=Math.floor(o*r);a.add(l)}const s=[];return a.forEach(o=>{const l=e+o;if(this._rangePromises.has(l))s.push(this._rangePromises.get(l));else{const u=n.getRange(e,o).then(()=>{this._rangePromises.delete(l)},()=>{this._rangePromises.delete(l)});this._rangePromises.set(l,u),s.push(u)}}),Promise.all(s).then(()=>{let o=this._glyphIndex[e];o||(o={},this._glyphIndex[e]=o);for(const l of i){const u=o[l];if(u){t[l]={sdf:!0,rect:u.rect,metrics:u.metrics,page:u.page,code:l};continue}const w=n.getGlyph(e,l);if(!(w!=null&&w.metrics))continue;const f=w.metrics;let x;if(f.width===0)x=new k(0,0,0,0);else{const d=f.width+6,g=f.height+2*3;let P=d%4?4-d%4:4,M=g%4?4-g%4:4;P===1&&(P=5),M===1&&(M=5),x=this._binPack.allocate(d+P,g+M),x.isEmpty&&(this._dirties[this._currentPage]||(this._glyphData[this._currentPage]=null),this._currentPage=this._glyphData.length,this._glyphData.push(new Uint8Array(this.width*this.height)),this._dirties.push(!0),this._textures.push(void 0),this._binPack=new G(this.width-4,this.height-4),x=this._binPack.allocate(d+P,g+M));const m=this._glyphData[this._currentPage],S=w.bitmap;let _,h;if(S)for(let p=0;p<g;p++){_=d*p,h=this.width*(x.y+p+1)+x.x;for(let b=0;b<d;b++)m[h+b+1]=S.at(_+b)}}o[l]={rect:x,metrics:f,tileIDs:null,page:this._currentPage},t[l]={sdf:!0,rect:x,metrics:f,page:this._currentPage,code:l},this._dirties[this._currentPage]=!0}return t})}removeGlyphs(e){for(const i in this._glyphIndex){const t=this._glyphIndex[i];if(!t)continue;let n;for(const a in t)if(n=t[a],n.tileIDs.delete(e),n.tileIDs.size===0){const r=this._glyphData[n.page],s=n.rect;let o,l;for(let u=0;u<s.height;u++)for(o=this.width*(s.y+u)+s.x,l=0;l<s.width;l++)r[o+l]=0;delete t[a],this._dirties[n.page]=!0}}}bind(e,i,t,n=0){if(!this._textures[t]){const r=new ye(this.width,this.height);r.pixelFormat=6406,r.wrapMode=33071,this._textures[t]=new xe(e,r,new Uint8Array(this.width*this.height))}const a=this._textures[t];a.setSamplingMode(i),this._dirties[t]&&a.setData(this._glyphData[t]),e.bindTexture(a,n),this._dirties[t]=!1}destroy(){this.dispose()}dispose(){this._glyphData.length=0,this._binPack=null;for(const e of this._textures)e&&e.dispose();this._textures.length=0}},X=class{constructor(e){if(this._metrics=[],!e)return void(this._allBitmaps=null);const i=new Map;let t=0;for(;e.next();)switch(e.tag()){case 1:{const r=e.getMessage();for(;r.next();)switch(r.tag()){case 3:{const s=r.getMessage();let o,l,u,w,f,x,y;for(;s.next();)switch(s.tag()){case 1:o=s.getUInt32();break;case 2:l=s.getBytes();break;case 3:u=s.getUInt32();break;case 4:w=s.getUInt32();break;case 5:f=s.getSInt32();break;case 6:x=s.getSInt32();break;case 7:y=s.getUInt32();break;default:s.skip()}if(s.release(),o){const d=(l==null?void 0:l.length)??0;this._metrics[o]={width:u,height:w,left:f,top:x,advance:y,startOffset:t,length:d},i.set(o,l),t+=d}break}default:r.skip()}r.release();break}default:e.skip()}const n=new Uint8Array(t),a=this._metrics;for(const[r,s]of i){const{startOffset:o,length:l}=a[r];if(s)for(let u=0;u<l;++u)n[o+u]=s[u]}this._allBitmaps=n}getMetrics(e){return this._metrics[e]}getBitmap(e){if(!this._allBitmaps)return;const i=this._metrics[e];if(i===void 0)return;const{startOffset:t,length:n}=i;return n!==0?new rt(this._allBitmaps,t,n):void 0}},st=class{constructor(){this._ranges=[]}get ranges(){return this._ranges}getRange(e){return this._ranges[e]}addRange(e,i){this._ranges[e]=i}},ce=class{constructor(e){this._glyphInfo={},this._baseURL=e}getRange(e,i){const t=this._getFontStack(e);if(t.getRange(i))return Promise.resolve();const n=256*i,a=n+255;if(this._baseURL){const r=this._baseURL.replace("{fontstack}",e).replace("{range}",n+"-"+a);return De(r,{responseType:"array-buffer"}).then(s=>{t.addRange(i,new X(new Je(new Uint8Array(s.data),new DataView(s.data))))}).catch(()=>{t.addRange(i,new X)})}return t.addRange(i,new X),Promise.resolve()}getGlyph(e,i){const t=this._getFontStack(e);if(!t)return;const n=Math.floor(i/256),a=t.getRange(n);return a?{metrics:a.getMetrics(i),bitmap:a.getBitmap(i)}:void 0}_getFontStack(e){let i=this._glyphInfo[e];return i||(i=this._glyphInfo[e]=new st),i}},rt=class{constructor(e,i,t){this._array=e,this._start=i,this.length=t}at(e){return 0<=e&&e<this.length?this._array[this._start+e]:void 0}};const ot="dasharray-";let ue=class be{constructor(e,i,t=0){this._size=[],this._mosaicsData=[],this._textures=[],this._dirties=[],this._maxItemSize=0,this._currentPage=0,this._pageWidth=0,this._pageHeight=0,this._mosaicRects={},this.pixelRatio=1,i<=0&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!"),this._pageWidth=e,this._pageHeight=i,t>0&&(this._maxItemSize=t),this._binPack=new G(e-4,i-4)}destroy(){this.dispose()}dispose(){this._binPack=null,this._mosaicsData.length=0,this._mosaicRects={};for(const e of this._textures)e&&e.dispose();this._textures.length=0}getWidth(e){return e>=this._size.length?-1:this._size[e][0]}getHeight(e){return e>=this._size.length?-1:this._size[e][1]}getPageSize(e){return e>=this._size.length?null:this._size[e]}setSpriteSource(e){if(this.dispose(),this.pixelRatio=e.devicePixelRatio,this._mosaicsData.length===0){this._binPack=new G(this._pageWidth-4,this._pageHeight-4);const i=Math.floor(this._pageWidth),t=Math.floor(this._pageHeight),n=new Uint32Array(i*t);this._mosaicsData[0]=n,this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0)}this._sprites=e}getSpriteItem(e,i=!1){let t,n,a=this._mosaicRects[e];if(a)return a;if(!this._sprites||this._sprites.loadStatus!=="loaded"||(e&&e.startsWith(ot)?([t,n]=this._rasterizeDash(e),i=!0):t=this._sprites.getSpriteInfo(e),!(t!=null&&t.width)||!t.height||t.width<0||t.height<0))return null;const r=t.width,s=t.height,[o,l,u]=this._allocateImage(r,s);return o.width<=0?null:(this._copy(o,t,l,u,i,n),a={type:"sprite",rect:o,width:r,height:s,sdf:t.sdf,simplePattern:!1,rasterizationScale:t.pixelRatio??1,samplingMode:"Linear",page:l},this._mosaicRects[e]=a,a)}getSpriteItems(e){const i={};for(const t of e)i[t.name]=this.getSpriteItem(t.name,t.repeat);return i}getMosaicItemPosition(e,i){const t=this.getSpriteItem(e,i),n=t==null?void 0:t.rect;if(!n)return null;n.width=t.width,n.height=t.height;const a=t.width,r=t.height,s=2;return{tl:[n.x+s,n.y+s],br:[n.x+s+a,n.y+s+r],page:t.page}}bind(e,i,t=0,n=0){if(t>=this._size.length||t>=this._mosaicsData.length)return;if(!this._textures[t]){const r=new ye(this._size[t][0],this._size[t][1]);r.wrapMode=33071,this._textures[t]=new xe(e,r,new Uint8Array(this._mosaicsData[t].buffer))}const a=this._textures[t];a.setSamplingMode(i),this._dirties[t]&&a.setData(new Uint8Array(this._mosaicsData[t].buffer)),e.bindTexture(a,n),this._dirties[t]=!1}static _copyBits(e,i,t,n,a,r,s,o,l,u,w){let f=n*i+t,x=o*r+s;if(w){x-=r;for(let y=-1;y<=u;y++,f=((y+u)%u+n)*i+t,x+=r)for(let d=-1;d<=l;d++)a[x+d]=e[f+(d+l)%l]}else for(let y=0;y<u;y++){for(let d=0;d<l;d++)a[x+d]=e[f+d];f+=i,x+=r}}_copy(e,i,t,n,a,r){if(!this._sprites||this._sprites.loadStatus!=="loaded"||t>=this._mosaicsData.length)return;const s=new Uint32Array(r?r.buffer:this._sprites.image.buffer),o=this._mosaicsData[t],l=2,u=r?i.width:this._sprites.width;be._copyBits(s,u,i.x,i.y,o,n[0],e.x+l,e.y+l,i.width,i.height,a),this._dirties[t]=!0}_allocateImage(e,i){e+=2,i+=2;const t=Math.max(e,i);if(this._maxItemSize&&this._maxItemSize<t){const s=new k(0,0,e,i);return this._mosaicsData.push(new Uint32Array(e*i)),this._dirties.push(!0),this._size.push([e,i]),this._textures.push(void 0),[s,this._mosaicsData.length-1,[e,i]]}let n=e%4?4-e%4:4,a=i%4?4-i%4:4;n===1&&(n=5),a===1&&(a=5);const r=this._binPack.allocate(e+n,i+a);return r.width<=0?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new G(this._pageWidth-4,this._pageHeight-4),this._allocateImage(e,i)):[r,this._currentPage,[this._pageWidth,this._pageHeight]]}_rasterizeDash(e){const i=/\[(.*?)\]/,t=e.match(i);if(!t)return null;const n=t[1].split(",").map(Number),a=e.slice(e.lastIndexOf("-")+1),[r,s,o]=et(n,a);return[{x:0,y:0,width:s,height:o,sdf:!0,pixelRatio:1},new Uint8Array(r.buffer)]}},lt=class{constructor(e,i,t,n){this._layer=e,this._styleRepository=i,this.devicePixelRatio=t,this._sourceDataMaxLOD=n,this._spriteMosaic=null,this._glyphMosaic=null,this._connection=null,this._spriteSourceAbortController=null,this._startOptionsInputSignal=null,this._inputSignalEventListener=null}destroy(){var e,i,t;(e=this._connection)==null||e.close(),this._connection=null,this._styleRepository=null,this._layer=null,(i=this._spriteMosaic)==null||i.destroy(),this._spriteMosaic=null,this._glyphMosaic=null,this._spriteSourceAbortController=we(this._spriteSourceAbortController),this._spriteSourcePromise=null,this._inputSignalEventListener&&((t=this._startOptionsInputSignal)==null||t.removeEventListener("abort",this._inputSignalEventListener)),this._startOptionsInputSignal=null,this._inputSignalEventListener=null}get spriteMosaic(){return this._spriteSourcePromise.then(()=>this._spriteMosaic)}get glyphMosaic(){return this._glyphMosaic}async start(e){this._requestSprite(e);const i=this._layer.currentStyleInfo.glyphsUrl,t=new ce(i?J(i,{...this._layer.customParameters,token:this._layer.apiKey}):null);this._glyphMosaic=new le(1024,1024,t),this._broadcastPromise=Re("WorkerTileHandler",{client:this,schedule:e.schedule,signal:e.signal}).then(n=>{var a;if(this._layer&&((a=this._connection)==null||a.close(),this._connection=n,this._layer&&!this._connection.closed)){const r=n.broadcast("setStyle",{style:this._layer.currentStyleInfo.style,sourceDataMaxLOD:this._sourceDataMaxLOD},e);Promise.all(r).catch(s=>Ce(s))}})}_requestSprite(e){var r,s;(r=this._spriteSourceAbortController)==null||r.abort();const i=new AbortController;this._spriteSourceAbortController=i;const t=e==null?void 0:e.signal;this._inputSignalEventListener&&((s=this._startOptionsInputSignal)==null||s.removeEventListener("abort",this._inputSignalEventListener)),this._startOptionsInputSignal=null,t&&(this._inputSignalEventListener=ct(i),t.addEventListener("abort",this._inputSignalEventListener,{once:!0}));const{signal:n}=i,a={...e,signal:n};this._spriteSourcePromise=this._layer.loadSpriteSource(this.devicePixelRatio,a),this._spriteSourcePromise.then(o=>{Ie(n),this._spriteMosaic=new ue(1024,1024,250),this._spriteMosaic.setSpriteSource(o)})}async updateStyle(e){const i=[];for(const t of e)t.type===4?i.push({type:4,data:{spriteSource:null}}):i.push(t);return await this._broadcastPromise,this._broadcastPromise=Promise.all(this._connection.broadcast("updateStyle",i)),this._broadcastPromise}setSpriteSource(e){const i=new ue(1024,1024,250);return i.setSpriteSource(e),this._spriteMosaic=i,this._spriteSourcePromise=Promise.resolve(e),this._spriteSourceAbortController=null,i}async setStyle(e,i,t){await this._broadcastPromise,this._styleRepository=e,this._sourceDataMaxLOD=t,this._requestSprite();const n=new ce(this._layer.currentStyleInfo.glyphsUrl?J(this._layer.currentStyleInfo.glyphsUrl,{...this._layer.customParameters,token:this._layer.apiKey}):null);return this._glyphMosaic=new le(1024,1024,n),this._broadcastPromise=Promise.all(this._connection.broadcast("setStyle",{style:i,sourceDataMaxLOD:this._sourceDataMaxLOD})),this._broadcastPromise}async fetchTileData(e,i){const t=await this._getRefKeys(e,i);return this._getSourcesData(Object.keys(this._layer.sourceNameToSource),t,i)}async fetchTilePBFs(e){const i=Object.keys(this._layer.sourceNameToSource),t={},n=await this._getRefKeys(e,t),a=[],r=[];for(let s=0;s<n.length;s++)if(n[s].value==null||i[s]==null)r.push(null);else{const o=n[s].value,l=this._getTilePayload(o,i[s],t);l.then(u=>{a.push({...u,key:o})}),r.push(l)}return Promise.all(r).then(()=>a)}async parseTileData(e,i){const t=e&&e.data;if(!t)return null;const{sourceName2DataAndRefKey:n,transferList:a}=t;return Object.keys(n).length===0?null:this._broadcastPromise.then(()=>this._connection.invoke("createTileAndParse",{key:e.key.id,sourceName2DataAndRefKey:n,styleLayerUIDs:e.styleLayerUIDs},{...i,transferList:a}))}async getSprites(e){return await this._spriteSourcePromise,this._spriteMosaic.getSpriteItems(e)}getGlyphs(e){return this._glyphMosaic.getGlyphItems(e.font,e.codePoints)}async _getTilePayload(e,i,t){const n=q.pool.acquire(e.id),a=this._layer.sourceNameToSource[i],{level:r,row:s,col:o}=n;q.pool.release(n);try{return{protobuff:await a.requestTile(r,s,o,t),sourceName:i}}catch(l){if(Ee(l))throw l;return{protobuff:null,sourceName:i}}}async _getRefKeys(e,i){const t=this._layer.sourceNameToSource,n=new Array;for(const a in t){const r=t[a].getRefKey(e,i);n.push(r)}return ee(n)}_getSourcesData(e,i,t){const n=[];for(let a=0;a<i.length;a++)if(i[a].value==null||e[a]==null)n.push(null);else{const r=i[a].value,s=this._getTilePayload(r,e[a],t);n.push(s)}return ee(n).then(a=>{const r={},s=[];for(let o=0;o<a.length;o++){const l=a[o].value;if(l&&l.protobuff&&l.protobuff.byteLength>0){const u=i[o].value.id;r[l.sourceName]={refKey:u,protobuff:l.protobuff},s.push(l.protobuff)}}return{sourceName2DataAndRefKey:r,transferList:s}})}};function ct(c){return()=>c.abort()}let ut=class extends Ue{constructor(){super(...arguments),this._fullCacheLodInfos=null,this._levelByScale={}}getTileParentId(e){const i=q.pool.acquire(e),t=i.level===0?null:q.getId(i.level-1,i.row>>1,i.col>>1,i.world);return q.pool.release(i),t}getTileCoverage(e,i,t=!0,n){const a=super.getTileCoverage(e,i,t,n);if(!a)return a;const r=1<<a.lodInfo.level;return a.spans=a.spans.filter(s=>s.row>=0&&s.row<r),a}scaleToLevel(e){if(this._fullCacheLodInfos||this._initializeFullCacheLODs(this._lodInfos),this._levelByScale[e])return this._levelByScale[e];{const i=this._fullCacheLodInfos;if(e>i[0].scale)return i[0].level;let t,n;for(let a=0;a<i.length-1;a++)if(n=i[a+1],e>n.scale)return t=i[a],t.level+(t.scale-e)/(t.scale-n.scale);return i[i.length-1].level}}_initializeFullCacheLODs(e){let i;if(e[0].level===0)i=e.map(t=>({level:t.level,resolution:t.resolution,scale:t.scale}));else{const t=this.tileInfo.size[0],n=this.tileInfo.spatialReference;i=Le.create({size:t,spatialReference:n}).lods.map(a=>({level:a.level,resolution:a.resolution,scale:a.scale}))}for(let t=0;t<i.length;t++)this._levelByScale[i[t].scale]=i[t].level;this._fullCacheLodInfos=i}},he=class extends lt{constructor(e,i,t,n){super(e,i,t,e.tileInfo.lods.length-1),this._memCache=n,this._vectorTiles=new Map,this._ongoingTileRequests=new Map,this._ongoingRequestToController=new Map,this._tileInfoView=new ut(e.tileInfo,e.fullExtent)}destroy(){super.destroy(),this._ongoingRequestToController.forEach(e=>e.abort()),this._ongoingRequestToController.clear(),this._ongoingTileRequests.clear(),this._vectorTiles.clear()}async getVectorTile(e,i){const t=new q(e[0],e[1],e[2],0);let n=this._vectorTiles.get(t.id)??this._memCache.get(t.id);if(n)return n.retain(),n;const a=await this._getVectorTileData(t);if(ze(i),!this._layer)return null;if(n=this._vectorTiles.get(t.id)??this._memCache.get(t.id),n)return n.retain(),n;const r=this._layer.tileInfo.getTileBounds(ke(),t),s=this._tileInfoView.getTileResolution(e[0]);return n=new Ae(t,s,r[0],r[3],te,te,this._styleRepository,this),n.setData(a),a&&(n.retain(),this._memCache.put(t.id,n,Ve),this._vectorTiles.set(t.id,n)),n.neededForCoverage=!0,n.transforms.tileUnitsToPixels=Fe(1/8,0,0,0,1/8,0,0,0,1),n}updateTileSize(e){this._memCache.updateSize(e.id)}onDisposeTile(e){this._vectorTiles.delete(e.id)}_getVectorTileData(e){const i=e.id;if(this._ongoingTileRequests.has(i))return this._ongoingTileRequests.get(i);const t=new AbortController,n={signal:t.signal},a=this._getParsedVectorTileData(e,n).then(r=>(this._ongoingTileRequests.delete(i),this._ongoingRequestToController.delete(i),r)).catch(()=>(this._ongoingTileRequests.delete(i),this._ongoingRequestToController.delete(i),null));return this._ongoingTileRequests.set(i,a),this._ongoingRequestToController.set(i,t),a}_getParsedVectorTileData(e,i){return this.fetchTileData(e,i).then(t=>this.parseTileData({key:e,data:t},i))}},K=class{constructor(){this.name=this.constructor.name||"UnnamedBrush",this.brushEffect=null}prepareState(e,i){}draw(e,i,t){}drawMany(e,i,t){for(const n of i)n.visible&&this.draw(e,n,t)}};class ht extends K{constructor(){super(...arguments),this._color=$e(1,0,0,1),this._patternMatrix=Oe(),this._programOptions={id:!1,pattern:!1}}dispose(){this._vao=Z(this._vao)}drawMany(e,i){const{context:t,painter:n,requestRender:a,allowDelayedRender:r}=e;this._loadWGLResources(e);const s=e.displayLevel,o=e.styleLayer,l=o.backgroundMaterial,u=n.vectorTilesMaterialManager,w=o.getPaintValue("background-color",s),f=o.getPaintValue("background-opacity",s),x=o.getPaintValue("background-pattern",s),y=x!==void 0,d=1|window.devicePixelRatio,g=e.spriteMosaic;let P,M;const m=d>Se?2:1,S=this._programOptions;S.pattern=y;const _=u.getMaterialProgram(t,l,S);if(!r||a==null||_.compiled){if(t.bindVAO(this._vao),t.useProgram(_),y){const h=g.getMosaicItemPosition(x,!0);if(h!=null){const{tl:p,br:b,page:v}=h;P=b[0]-p[0],M=b[1]-p[1];const C=g.getPageSize(v);C!=null&&(g.bind(t,9729,v,L),_.setUniform4f("u_tlbr",p[0],p[1],b[0],b[1]),_.setUniform2fv("u_mosaicSize",C),_.setUniform1i("u_texture",L))}_.setUniform1f("u_opacity",f)}else{const h=w[3]*f;this._color[0]=h*w[0],this._color[1]=h*w[1],this._color[2]=h*w[2],this._color[3]=h,_.setUniform4fv("u_color",this._color)}_.setUniform1f("u_depth",o.z||0);for(const h of i){if(_.setUniform1f("u_coord_range",h.rangeX),_.setUniformMatrix3fv("u_dvsMat3",h.transforms.displayViewScreenMat3),y){const p=Math.max(2**(Math.round(s)-h.key.level),1),b=m*h.width*p,v=b/ie(P),C=b/ie(M);this._patternMatrix[0]=v,this._patternMatrix[4]=C,_.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix)}t.setStencilFunction(514,0,255),t.drawArrays(A.TRIANGLE_STRIP,0,4)}}else a()}_loadWGLResources(e){if(this._vao)return;const{context:i,styleLayer:t}=e,n=t.backgroundMaterial,a=new Int8Array([0,0,1,0,0,1,1,1]),r=new Ne(i,n.geometryLayout,a);this._vao=new He(i,r)}}let dt=class extends K{constructor(){super(...arguments),this._programOptions={id:!1}}dispose(){}drawMany(e,i){const{context:t,displayLevel:n,requiredLevel:a,state:r,painter:s,spriteMosaic:o,styleLayerUID:l,requestRender:u,allowDelayedRender:w}=e;if(!i.some(_=>{var h;return((h=_.layerData.get(l))==null?void 0:h.circleIndexCount)??!1}))return;const f=e.styleLayer,x=f.circleMaterial,y=s.vectorTilesMaterialManager,d=1.2,g=f.getPaintValue("circle-translate",n),P=f.getPaintValue("circle-translate-anchor",n),M=this._programOptions,m=y.getMaterialProgram(t,x,M);if(w&&u!=null&&!m.compiled)return void u();t.useProgram(m),m.setUniformMatrix3fv("u_displayMat3",P===1?r.displayMat3:r.displayViewMat3),m.setUniform2fv("u_circleTranslation",g),m.setUniform1f("u_depth",f.z),m.setUniform1f("u_antialiasingWidth",d);let S=-1;for(const _ of i){if(!_.layerData.has(l))continue;_.key.level!==S&&(S=_.key.level,x.setDataUniforms(m,n,f,S,o));const h=_.layerData.get(l);if(!h.circleIndexCount)continue;h.prepareForRendering(t);const p=h.vao;p!=null&&(t.bindVAO(p),m.setUniformMatrix3fv("u_dvsMat3",_.transforms.displayViewScreenMat3),a!==_.key.level?t.setStencilFunction(514,_.stencilRef,255):t.setStencilFunction(516,255,255),t.drawElements(A.TRIANGLES,h.circleIndexCount,$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*h.circleIndexStart),_.triangleCount+=h.circleIndexCount/3)}}};const de=1/65536;let _t=class extends K{constructor(){super(...arguments),this._fillProgramOptions={id:!1,pattern:!1},this._outlineProgramOptions={id:!1}}dispose(){}drawMany(e,i){const{displayLevel:t,renderPass:n,spriteMosaic:a,styleLayerUID:r}=e;let s=!1;for(const m of i)if(m.layerData.has(r)){const S=m.layerData.get(r);if(S.fillIndexCount>0||S.outlineIndexCount>0){s=!0;break}}if(!s)return;const o=e.styleLayer,l=o.getPaintProperty("fill-pattern"),u=l!==void 0,w=u&&l.isDataDriven;let f;if(u&&!w){const m=l.getValue(t);f=a.getMosaicItemPosition(m,!0)}const x=!u&&o.getPaintValue("fill-antialias",t);let y=!0,d=1;if(!u){const m=o.getPaintProperty("fill-color"),S=o.getPaintProperty("fill-opacity");if(!(m!=null&&m.isDataDriven)&&!(S!=null&&S.isDataDriven)){const _=o.getPaintValue("fill-color",t);d=o.getPaintValue("fill-opacity",t)*_[3],d>=1&&(y=!1)}}if(y&&n==="opaque")return;const g=o.getPaintValue("fill-translate",t),P=o.getPaintValue("fill-translate-anchor",t);(y||n!=="translucent")&&this._drawFill(e,r,o,i,g,P,u,f,w);const M=!o.hasDataDrivenOutlineColor&&o.outlineUsesFillColor&&d<1;x&&n!=="opaque"&&!M&&this._drawOutline(e,r,o,i,g,P)}_drawFill(e,i,t,n,a,r,s,o,l){if(s&&!l&&o==null)return;const{context:u,displayLevel:w,state:f,painter:x,pixelRatio:y,spriteMosaic:d,requestRender:g,allowDelayedRender:P}=e,M=t.fillMaterial,m=x.vectorTilesMaterialManager,S=y>Se?2:1,_=this._fillProgramOptions;_.pattern=s;const h=m.getMaterialProgram(u,M,_);if(P&&g!=null&&!h.compiled)return void g();if(u.useProgram(h),o!=null){const{page:b}=o,v=d.getPageSize(b);v!=null&&(d.bind(u,9729,b,L),h.setUniform2fv("u_mosaicSize",v),h.setUniform1i("u_texture",L))}h.setUniformMatrix3fv("u_displayMat3",r===1?f.displayMat3:f.displayViewMat3),h.setUniform2fv("u_fillTranslation",a),h.setUniform1f("u_depth",t.z+de);let p=-1;for(const b of n){if(!b.layerData.has(i))continue;b.key.level!==p&&(p=b.key.level,M.setDataUniforms(h,w,t,p,d));const v=b.layerData.get(i);if(!v.fillIndexCount)continue;v.prepareForRendering(u);const C=v.fillVAO;if(C!=null){if(u.bindVAO(C),h.setUniformMatrix3fv("u_dvsMat3",b.transforms.displayViewScreenMat3),u.setStencilFunction(514,b.stencilRef,255),s){const T=Math.max(2**(Math.round(w)-b.key.level),1),R=b.rangeX/(S*b.width*T);h.setUniform1f("u_patternFactor",R)}if(l){const T=v.patternMap;if(!T)continue;for(const[R,I]of T){const N=d.getPageSize(R);N!=null&&(d.bind(u,9729,R,L),h.setUniform2fv("u_mosaicSize",N),h.setUniform1i("u_texture",L),u.drawElements(A.TRIANGLES,I[1],$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*I[0]))}}else u.drawElements(A.TRIANGLES,v.fillIndexCount,$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*v.fillIndexStart);b.triangleCount+=v.fillIndexCount/3}}}_drawOutline(e,i,t,n,a,r){const{context:s,displayLevel:o,state:l,painter:u,pixelRatio:w,spriteMosaic:f,requestRender:x,allowDelayedRender:y}=e,d=t.outlineMaterial,g=u.vectorTilesMaterialManager,P=.75/w,M=this._outlineProgramOptions,m=g.getMaterialProgram(s,d,M);if(y&&x!=null&&!m.compiled)return void x();s.useProgram(m),m.setUniformMatrix3fv("u_displayMat3",r===1?l.displayMat3:l.displayViewMat3),m.setUniform2fv("u_fillTranslation",a),m.setUniform1f("u_depth",t.z+de),m.setUniform1f("u_outline_width",P);let S=-1;for(const _ of n){if(!_.layerData.has(i))continue;_.key.level!==S&&(S=_.key.level,d.setDataUniforms(m,o,t,S,f));const h=_.layerData.get(i);if(h.prepareForRendering(s),!h.outlineIndexCount)continue;const p=h.outlineVAO;p!=null&&(s.bindVAO(p),m.setUniformMatrix3fv("u_dvsMat3",_.transforms.displayViewScreenMat3),s.setStencilFunction(514,_.stencilRef,255),s.drawElements(A.TRIANGLES,h.outlineIndexCount,$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*h.outlineIndexStart),_.triangleCount+=h.outlineIndexCount/3)}}},ft=class extends K{constructor(){super(...arguments),this._programOptions={id:!1,pattern:!1,sdf:!1}}dispose(){}drawMany(e,i){const{context:t,displayLevel:n,state:a,painter:r,pixelRatio:s,spriteMosaic:o,styleLayerUID:l,requestRender:u,allowDelayedRender:w}=e;if(!i.some(T=>{var R;return((R=T.layerData.get(l))==null?void 0:R.lineIndexCount)??!1}))return;const f=e.styleLayer,x=f.lineMaterial,y=r.vectorTilesMaterialManager,d=f.getPaintValue("line-translate",n),g=f.getPaintValue("line-translate-anchor",n),P=f.getPaintProperty("line-pattern"),M=P!==void 0,m=M&&P.isDataDriven;let S,_;if(M&&!m){const T=P.getValue(n);S=o.getMosaicItemPosition(T)}let h=!1;if(!M){const T=f.getPaintProperty("line-dasharray");if(_=T!==void 0,h=_&&T.isDataDriven,_&&!h){const R=T.getValue(n),I=f.getDashKey(R,f.getLayoutValue("line-cap",n));S=o.getMosaicItemPosition(I)}}const p=1/s,b=this._programOptions;b.pattern=M,b.sdf=_;const v=y.getMaterialProgram(t,x,b);if(w&&u!=null&&!v.compiled)return void u();if(t.useProgram(v),v.setUniformMatrix3fv("u_displayViewMat3",a.displayViewMat3),v.setUniformMatrix3fv("u_displayMat3",g===1?a.displayMat3:a.displayViewMat3),v.setUniform2fv("u_lineTranslation",d),v.setUniform1f("u_depth",f.z),v.setUniform1f("u_antialiasing",p),S&&S!=null){const{page:T}=S,R=o.getPageSize(T);R!=null&&(o.bind(t,9729,T,L),v.setUniform2fv("u_mosaicSize",R),v.setUniform1i("u_texture",L))}let C=-1;for(const T of i){if(!T.layerData.has(l))continue;T.key.level!==C&&(C=T.key.level,x.setDataUniforms(v,n,f,C,o));const R=2**(n-C)/s;v.setUniform1f("u_zoomFactor",R);const I=T.layerData.get(l);if(!I.lineIndexCount)continue;I.prepareForRendering(t);const N=I.vao;if(N!=null){if(t.bindVAO(N),v.setUniformMatrix3fv("u_dvsMat3",T.transforms.displayViewScreenMat3),t.setStencilFunction(514,T.stencilRef,255),m||h){const Y=I.patternMap;if(!Y)continue;for(const[D,B]of Y){const U=o.getPageSize(D);U!=null&&(o.bind(t,9729,D,L),v.setUniform2fv("u_mosaicSize",U),v.setUniform1i("u_texture",L),t.drawElements(A.TRIANGLES,B[1],$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*B[0]))}}else t.drawElements(A.TRIANGLES,I.lineIndexCount,$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*I.lineIndexStart);T.triangleCount+=I.lineIndexCount/3}}}};const pt=256/360;function mt(c,e){return(c%=e)>=0?c:c+e}function _e(c){return mt(c*pt,256)}const gt=1/65536;class vt extends K{constructor(){super(...arguments),this._iconProgramOptions={id:!1,sdf:!1},this._sdfProgramOptions={id:!1},this._spritesTextureSize=Be()}dispose(){}drawMany(e,i){const t=e.styleLayer;this._drawIcons(e,t,i),this._drawText(e,t,i)}_drawIcons(e,i,t){const{context:n,displayLevel:a,painter:r,spriteMosaic:s,state:o,styleLayerUID:l,requestRender:u,allowDelayedRender:w}=e,f=i.iconMaterial,x=r.vectorTilesMaterialManager;let y,d=!1;for(const v of t)if(v.layerData.has(l)&&(y=v.layerData.get(l),y.iconPerPageElementsMap.size>0)){d=!0;break}if(!d)return;const g=i.getPaintValue("icon-translate",a),P=i.getPaintValue("icon-translate-anchor",a);let M=i.getLayoutValue("icon-rotation-alignment",a);M===2&&(M=i.getLayoutValue("symbol-placement",a)===0?1:0);const m=M===0,S=i.getLayoutValue("icon-keep-upright",a)&&m,_=y.isIconSDF,h=this._iconProgramOptions;h.sdf=_;const p=x.getMaterialProgram(n,f,h);if(w&&u!=null&&!p.compiled)return void u();n.useProgram(p),p.setUniformMatrix3fv("u_displayViewMat3",M===0?o.displayViewMat3:o.displayMat3),p.setUniformMatrix3fv("u_displayMat3",P===1?o.displayMat3:o.displayViewMat3),p.setUniform2fv("u_iconTranslation",g),p.setUniform1f("u_depth",i.z),p.setUniform1f("u_mapRotation",_e(o.rotation)),p.setUniform1f("u_keepUpright",S?1:0),p.setUniform1f("u_level",10*a),p.setUniform1i("u_texture",L),p.setUniform1f("u_fadeDuration",ae/1e3),p.setUniform1i("u_isStencilPass",e.stencilSymbols?1:0);let b=-1;for(const v of t){if(!v.layerData.has(l)||(v.key.level!==b&&(b=v.key.level,f.setDataUniforms(p,a,i,b,s)),y=v.layerData.get(l),y.iconPerPageElementsMap.size===0))continue;y.prepareForRendering(n),y.updateOpacityInfo();const C=y.iconVAO;if(C!=null){n.bindVAO(C),p.setUniformMatrix3fv("u_dvsMat3",v.transforms.displayViewScreenMat3),p.setUniform1f("u_time",(performance.now()-y.lastOpacityUpdate)/1e3);for(const[T,R]of y.iconPerPageElementsMap)this._renderIconRange(e,p,R,T,v)}}}_renderIconRange(e,i,t,n,a){const{context:r,spriteMosaic:s}=e;this._spritesTextureSize[0]=s.getWidth(n)/4,this._spritesTextureSize[1]=s.getHeight(n)/4,i.setUniform2fv("u_mosaicSize",this._spritesTextureSize),s.bind(r,9729,n,L),this._setStencilState(e,a),r.drawElements(A.TRIANGLES,t[1],$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*t[0]),a.triangleCount+=t[1]/3}_drawText(e,i,t){const{context:n,displayLevel:a,glyphMosaic:r,painter:s,pixelRatio:o,spriteMosaic:l,state:u,styleLayerUID:w,requestRender:f,allowDelayedRender:x}=e,y=i.textMaterial,d=s.vectorTilesMaterialManager;let g,P=!1;for(const U of t)if(U.layerData.has(w)&&(g=U.layerData.get(w),g.glyphPerPageElementsMap.size>0)){P=!0;break}if(!P)return;const M=i.getPaintProperty("text-opacity");if(M&&!M.isDataDriven&&M.getValue(a)===0)return;const m=i.getPaintProperty("text-color"),S=!m||m.isDataDriven||m.getValue(a)[3]>0,_=i.getPaintProperty("text-halo-width"),h=i.getPaintProperty("text-halo-color"),p=(!_||_.isDataDriven||_.getValue(a)>0)&&(!h||h.isDataDriven||h.getValue(a)[3]>0);if(!S&&!p)return;const b=24/8;let v=i.getLayoutValue("text-rotation-alignment",a);v===2&&(v=i.getLayoutValue("symbol-placement",a)===0?1:0);const C=v===0,T=i.getLayoutValue("text-keep-upright",a)&&C,R=.8*b/o;this._glyphTextureSize||(this._glyphTextureSize=We(r.width/4,r.height/4));const I=i.getPaintValue("text-translate",a),N=i.getPaintValue("text-translate-anchor",a),Y=this._sdfProgramOptions,D=d.getMaterialProgram(n,y,Y);if(x&&f!=null&&!D.compiled)return void f();n.useProgram(D),D.setUniformMatrix3fv("u_displayViewMat3",v===0?u.displayViewMat3:u.displayMat3),D.setUniformMatrix3fv("u_displayMat3",N===1?u.displayMat3:u.displayViewMat3),D.setUniform2fv("u_textTranslation",I),D.setUniform1f("u_depth",i.z+gt),D.setUniform2fv("u_mosaicSize",this._glyphTextureSize),D.setUniform1f("u_mapRotation",_e(u.rotation)),D.setUniform1f("u_keepUpright",T?1:0),D.setUniform1f("u_level",10*a),D.setUniform1i("u_texture",ne),D.setUniform1f("u_antialiasingWidth",R),D.setUniform1f("u_fadeDuration",ae/1e3);let B=-1;for(const U of t){if(!U.layerData.has(w)||(U.key.level!==B&&(B=U.key.level,y.setDataUniforms(D,a,i,B,l)),g=U.layerData.get(w),g.glyphPerPageElementsMap.size===0))continue;g.prepareForRendering(n),g.updateOpacityInfo();const Q=g.textVAO;if(Q==null)continue;n.bindVAO(Q),D.setUniformMatrix3fv("u_dvsMat3",U.transforms.displayViewScreenMat3),this._setStencilState(e,U);const Me=(performance.now()-g.lastOpacityUpdate)/1e3;D.setUniform1f("u_time",Me),g.glyphPerPageElementsMap.forEach((Pe,Te)=>{this._renderGlyphRange(n,Pe,Te,r,D,p,S,U)})}}_renderGlyphRange(e,i,t,n,a,r,s,o){n.bind(e,9729,t,ne),r&&(a.setUniform1f("u_halo",1),e.drawElements(A.TRIANGLES,i[1],$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]),o.triangleCount+=i[1]/3),s&&(a.setUniform1f("u_halo",0),e.drawElements(A.TRIANGLES,i[1],$.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*i[0]),o.triangleCount+=i[1]/3)}_setStencilState(e,i){const{context:t,is3D:n,stencilSymbols:a}=e;if(t.setStencilTestEnabled(!0),a)return t.setStencilWriteMask(255),void t.setStencilFunction(519,i.stencilRef,255);t.setStencilWriteMask(0),n?t.setStencilFunction(514,i.stencilRef,255):t.setStencilFunction(516,255,255)}}const H={vtlBackground:ht,vtlFill:_t,vtlLine:ft,vtlCircle:dt,vtlSymbol:vt},yt={background:{"background.frag":`#ifdef PATTERN
uniform lowp float u_opacity;
uniform lowp sampler2D u_texture;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_tileTextureCoord;
#else
uniform lowp vec4 u_color;
#endif
void main() {
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = mod(v_tileTextureCoord, 1.0);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = u_opacity * color;
#else
gl_FragColor = u_color;
#endif
}`,"background.vert":`precision mediump float;
attribute vec2 a_pos;
uniform highp mat3 u_dvsMat3;
uniform mediump float u_coord_range;
uniform mediump float u_depth;
#ifdef PATTERN
uniform mediump mat3 u_pattern_matrix;
varying mediump vec2 v_tileTextureCoord;
uniform mediump vec4 u_tlbr;
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
#endif
void main() {
gl_Position = vec4((u_dvsMat3 * vec3(u_coord_range * a_pos, 1.0)).xy, u_depth, 1.0);
#ifdef PATTERN
v_tileTextureCoord = (u_pattern_matrix * vec3(a_pos, 1.0)).xy;
v_tlbr             = u_tlbr / u_mosaicSize.xyxy;
#endif
}`},circle:{"circle.frag":`precision lowp float;
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
void main()
{
mediump float dist = length(v_offset);
mediump float alpha = smoothstep(0.0, -v_blur, dist - 1.0);
lowp float color_mix_ratio = v_stroke_width < 0.01 ? 0.0 : smoothstep(-v_blur, 0.0, dist - v_radius / (v_radius + v_stroke_width));
gl_FragColor = alpha * mix(v_color, v_stroke_color, color_mix_ratio);
}`,"circle.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_circleTranslation;
uniform mediump float u_depth;
uniform mediump float u_antialiasingWidth;
void main()
{
#pragma main
v_color = color * opacity;
v_stroke_color = stroke_color * stroke_opacity;
v_stroke_width = stroke_width;
v_radius = radius;
v_blur = max(blur, u_antialiasingWidth / (radius + stroke_width));
mediump vec2 offset = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);
v_offset = offset;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos * 0.5, 1.0) + u_displayMat3 * vec3((v_radius + v_stroke_width) * offset + u_circleTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},fill:{"fill.frag":`precision lowp float;
#ifdef PATTERN
uniform lowp sampler2D u_texture;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
varying lowp vec4 v_color;
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = fract(v_tileTextureCoord);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = v_color[3] * color;
#else
gl_FragColor = v_color;
#endif
}`,"fill.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump float u_depth;
uniform mediump vec2 u_fillTranslation;
#ifdef PATTERN
#include <util/util.glsl>
uniform mediump vec2 u_mosaicSize;
uniform mediump float u_patternFactor;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
varying lowp vec4 v_color;
void main()
{
#pragma main
v_color = color * opacity;
#ifdef PATTERN
float patternWidth = nextPOT(tlbr.z - tlbr.x);
float patternHeight = nextPOT(tlbr.w - tlbr.y);
float scaleX = 1.0 / (patternWidth * u_patternFactor);
float scaleY = 1.0 / (patternHeight * u_patternFactor);
mat3 patterMat = mat3(scaleX, 0.0,    0.0,
0.0,    -scaleY, 0.0,
0.0,    0.0,    1.0);
v_tileTextureCoord = (patterMat * vec3(a_pos, 1.0)).xy;
v_tlbr             = tlbr / u_mosaicSize.xyxy;
#endif
vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},icon:{"icon.frag":`precision mediump float;
uniform lowp sampler2D u_texture;
#ifdef SDF
uniform lowp vec4 u_color;
uniform lowp vec4 u_outlineColor;
#endif
uniform highp int u_isStencilPass;
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
varying lowp vec4 v_color;
#ifdef SDF
varying mediump flaot v_halo_width;
#endif
const float alphaCutoff = 1.0 / 255.5;
#include <util/encoding.glsl>
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef SDF
lowp vec4 fillPixelColor = v_color;
float d = rgba2float(texture2D(u_texture, v_tex)) - 0.5;
const float softEdgeRatio = 0.248062016;
float size = max(v_size.x, v_size.y);
float dist = d * softEdgeRatio * size;
fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);
if (v_halo_width > 0.25) {
lowp vec4 outlinePixelColor = u_outlineColor;
const float outlineLimitRatio = (16.0 / 86.0);
float clampedOutlineSize = softEdgeRatio * min(v_halo_width, outlineLimitRatio * max(v_size.x, v_size.y));
outlinePixelColor *= clamp(0.5 - (abs(dist) - clampedOutlineSize), 0.0, 1.0);
gl_FragColor = v_opacity * mixColors(fillPixelColor, outlinePixelColor);
}
else {
gl_FragColor = v_opacity * fillPixelColor;
}
#else
lowp vec4 texColor = texture2D(u_texture, v_tex);
if (u_isStencilPass == 1 && texColor.a < alphaCutoff) {
discard;
}
gl_FragColor = v_opacity * texColor;
#endif
}`,"icon.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
varying lowp vec4 v_color;
#ifdef SDF
varying mediump float v_halo_width;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_iconTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
const float C_OFFSET_PRECISION = 1.0 / 8.0;
const float C_256_TO_RAD = 3.14159265359 / 128.0;
const float C_DEG_TO_RAD = 3.14159265359 / 180.0;
const float tileCoordRatio = 1.0 / 8.0;
uniform highp float u_time;
void main()
{
#pragma main
v_color = color;
v_opacity = opacity;
#ifdef SDF
v_halo_width = halo_width;
#endif
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_opacity *= interpolatedOpacity;
mediump float a_angle         = a_levelInfo[1];
mediump float a_minLevel      = a_levelInfo[2];
mediump float a_maxLevel      = a_levelInfo[3];
mediump vec2 a_tex            = a_texAngleRange.xy;
mediump float delta_z = 0.0;
mediump float rotated = mod(a_angle + u_mapRotation, 256.0);
delta_z += (1.0 - step(u_keepUpright, 0.0)) * step(64.0, rotated) * (1.0 - step(192.0, rotated));
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_opacity, 0.0);
vec2 offset = C_OFFSET_PRECISION * a_vertexOffset;
v_size = abs(offset);
#ifdef SDF
offset = (120.0 / 86.0) * offset;
#endif
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayViewMat3 * vec3(size * offset, 0.0) + u_displayMat3 * vec3(u_iconTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
v_tex = a_tex.xy / u_mosaicSize;
}`},line:{"line.frag":`precision lowp float;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
varying mediump float v_lineHalfWidth;
varying lowp vec4 v_color;
varying mediump float v_blur;
#if defined (PATTERN) || defined(SDF)
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
uniform sampler2D u_texture;
uniform mediump float u_antialiasing;
#endif
#ifdef SDF
#include <util/encoding.glsl>
#endif
void main()
{
mediump float fragDist = length(v_normal) * v_lineHalfWidth;
lowp float alpha = clamp((v_lineHalfWidth - fragDist) / v_blur, 0.0, 1.0);
#ifdef PATTERN
mediump float relativeTexX = fract(v_accumulatedDistance / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY = 0.5 + v_normal.y * v_lineHalfWidth / (v_patternSize.y * v_widthRatio);
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
lowp vec4 color = texture2D(u_texture, texCoord);
gl_FragColor = alpha * v_color[3] * color;
#elif defined(SDF)
mediump float relativeTexX = fract((v_accumulatedDistance * 0.5) / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY =  0.5 + 0.25 * v_normal.y;
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
mediump float d = rgba2float(texture2D(u_texture, texCoord)) - 0.5;
float dist = d * (v_lineHalfWidth + u_antialiasing / 2.0);
gl_FragColor = alpha * clamp(0.5 - dist, 0.0, 1.0) * v_color;
#else
gl_FragColor = alpha * v_color;
#endif
}`,"line.vert":`precision mediump float;
attribute vec2 a_pos;
attribute vec4 a_extrude_offset;
attribute vec4 a_dir_normal;
attribute vec2 a_accumulatedDistance;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump float u_zoomFactor;
uniform mediump vec2 u_lineTranslation;
uniform mediump float u_antialiasing;
uniform mediump float u_depth;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
const float scale = 1.0 / 31.0;
const mediump float tileCoordRatio = 8.0;
#if defined (SDF)
const mediump float sdfPatternHalfWidth = 15.5;
#endif
#if defined (PATTERN) || defined(SDF)
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
#endif
varying lowp vec4 v_color;
varying mediump float v_lineHalfWidth;
varying mediump float v_blur;
void main()
{
#pragma main
v_color = color * opacity;
v_blur = blur + u_antialiasing;
v_normal = a_dir_normal.zw * scale;
#if defined (PATTERN) || defined(SDF)
v_tlbr          = tlbr / u_mosaicSize.xyxy;
v_patternSize   = vec2(tlbr.z - tlbr.x, tlbr.y - tlbr.w);
#if defined (PATTERN)
v_widthRatio = width / v_patternSize.y;
#else
v_widthRatio = width / sdfPatternHalfWidth / 2.0;
#endif
#endif
v_lineHalfWidth = (width + u_antialiasing) * 0.5;
mediump vec2 dir = a_dir_normal.xy * scale;
mediump vec2 offset_ = a_extrude_offset.zw * scale * offset;
mediump vec2 dist = v_lineHalfWidth * scale * a_extrude_offset.xy;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos + offset_ * tileCoordRatio / u_zoomFactor, 1.0) + u_displayViewMat3 * vec3(dist, 0.0) + u_displayMat3 * vec3(u_lineTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
#if defined (PATTERN) || defined(SDF)
v_accumulatedDistance = a_accumulatedDistance.x * u_zoomFactor / tileCoordRatio + dot(dir, dist + offset_);
#endif
}`},outline:{"outline.frag":`varying lowp vec4 v_color;
varying mediump vec2 v_normal;
void main()
{
lowp float dist = abs(v_normal.y);
lowp float alpha = smoothstep(1.0, 0.0, dist);
gl_FragColor = alpha * v_color;
}`,"outline.vert":`attribute vec2 a_pos;
attribute vec2 a_offset;
attribute vec2 a_xnormal;
#pragma header
varying lowp vec4 v_color;
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_fillTranslation;
uniform mediump float u_depth;
uniform mediump float u_outline_width;
varying lowp vec2 v_normal;
const float scale = 1.0 / 15.0;
void main()
{
#pragma main
v_color = color * opacity;
v_normal = a_xnormal;
mediump vec2 dist = u_outline_width * scale * a_offset;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(dist + u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},text:{"text.frag":`uniform lowp sampler2D u_texture;
varying lowp vec2 v_tex;
varying lowp vec4 v_color;
varying mediump float v_edgeWidth;
varying mediump float v_edgeDistance;
void main()
{
lowp float dist = texture2D(u_texture, v_tex).a;
mediump float alpha = smoothstep(v_edgeDistance - v_edgeWidth, v_edgeDistance + v_edgeWidth, dist);
gl_FragColor = alpha * v_color;
}`,"text.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
varying lowp vec4 v_color;
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_textTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying lowp vec2 v_tex;
const float offsetPrecision = 1.0 / 8.0;
const mediump float edgePos = 0.75;
uniform mediump float u_antialiasingWidth;
varying mediump float v_edgeDistance;
varying mediump float v_edgeWidth;
uniform lowp float u_halo;
const float sdfFontScale = 1.0 / 24.0;
const float sdfPixel = 3.0;
uniform highp float u_time;
void main()
{
#pragma main
if (u_halo > 0.5)
{
v_color = halo_color * opacity;
halo_width *= sdfPixel;
halo_blur *= sdfPixel;
}
else
{
v_color = color * opacity;
halo_width = 0.0;
halo_blur = 0.0;
}
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_color *= interpolatedOpacity;
mediump float a_angle       = a_levelInfo[1];
mediump float a_minLevel    = a_levelInfo[2];
mediump float a_maxLevel    = a_levelInfo[3];
mediump vec2 a_tex          = a_texAngleRange.xy;
mediump float a_visMinAngle    = a_texAngleRange.z;
mediump float a_visMaxAngle    = a_texAngleRange.w;
mediump float delta_z = 0.0;
mediump float angle = mod(a_angle + u_mapRotation, 256.0);
if (a_visMinAngle < a_visMaxAngle)
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) + (1.0 - step(a_visMinAngle, angle)));
}
else
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) * (1.0 - step(a_visMinAngle, angle)));
}
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_color[3], 0.0);
v_tex = a_tex.xy / u_mosaicSize;
v_edgeDistance = edgePos - halo_width / size;
v_edgeWidth = (u_antialiasingWidth + halo_blur) / size;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + sdfFontScale * u_displayViewMat3 * vec3(offsetPrecision * size * a_vertexOffset, 0.0) + u_displayMat3 * vec3(u_textTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
}`},util:{"encoding.glsl":`const vec4 rgba2float_factors = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, rgba2float_factors);
}`,"util.glsl":`float nextPOT(in float x) {
return pow(2.0, ceil(log2(abs(x))));
}`}};let xt=class{constructor(e){this._readFile=e}resolveIncludes(e){return this._resolve(e)}_resolve(e,i=new Map){if(i.has(e))return i.get(e);const t=this._read(e);if(!t)throw new Error(`cannot find shader file ${e}`);const n=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let a=n.exec(t);const r=[];for(;a!=null;)r.push({path:a[1],start:a.index,length:a[0].length}),a=n.exec(t);let s=0,o="";return r.forEach(l=>{o+=t.slice(s,l.start),o+=i.has(l.path)?"":this._resolve(l.path,i),s=l.start+l.length}),o+=t.slice(s),i.set(e,o),o}_read(e){return this._readFile(e)}};function wt(c){let e=yt;return c.split("/").forEach(i=>{e&&(e=e[i])}),e}const St=new xt(wt);function E(c){return St.resolveIncludes(c)}function bt(c){const{options:e,value:i}=c;return typeof e[i]=="number"}function j(c){let e="";for(const i in c){const t=c[i];if(typeof t=="boolean")t&&(e+=`#define ${i}
`);else if(typeof t=="number")e+=`#define ${i} ${t.toFixed()}
`;else if(typeof t=="object")if(bt(t)){const{value:n,options:a,namespace:r}=t,s=r?`${r}_`:"";for(const o in a)e+=`#define ${s}${o} ${a[o].toFixed()}
`;e+=`#define ${i} ${s}${n}
`}else{const n=t.options;let a=0;for(const r in n)e+=`#define ${n[r]} ${(a++).toFixed()}
`;e+=`#define ${i} ${n[t.value]}
`}}return e}const fe=c=>j({PATTERN:c.pattern}),Mt={shaders:c=>({vertexShader:fe(c)+E("background/background.vert"),fragmentShader:fe(c)+E("background/background.frag")})},Pt={shaders:c=>({vertexShader:E("circle/circle.vert"),fragmentShader:E("circle/circle.frag")})},pe=c=>j({PATTERN:c.pattern}),Tt={shaders:c=>({vertexShader:pe(c)+E("fill/fill.vert"),fragmentShader:pe(c)+E("fill/fill.frag")})},Dt={shaders:c=>({vertexShader:E("outline/outline.vert"),fragmentShader:E("outline/outline.frag")})},me=c=>j({SDF:c.sdf}),Rt={shaders:c=>({vertexShader:me(c)+E("icon/icon.vert"),fragmentShader:me(c)+E("icon/icon.frag")})},ge=c=>j({PATTERN:c.pattern,SDF:c.sdf}),Ct={shaders:c=>({vertexShader:ge(c)+E("line/line.vert"),fragmentShader:ge(c)+E("line/line.frag")})},It={shaders:c=>({vertexShader:E("text/text.vert"),fragmentShader:E("text/text.frag")})};class Et{constructor(){this._programByKey=new Map}dispose(){this._programByKey.forEach(e=>e.dispose()),this._programByKey.clear()}getMaterialProgram(e,i,t){const n=i.key<<3|this._getMaterialOptionsValue(i.type,t);if(this._programByKey.has(n))return this._programByKey.get(n);const a=this._getProgramTemplate(i.type),{shaders:r}=a,{vertexShader:s,fragmentShader:o}=r(t),l=i.getShaderHeader(),u=i.getShaderMain(),w=s.replace("#pragma header",l).replace("#pragma main",u),f=e.programCache.acquire(w,o,i.getAttributeLocations());return this._programByKey.set(n,f),f}_getMaterialOptionsValue(e,i){switch(e){case 0:return(i.pattern?1:0)<<1;case 1:return(i.pattern?1:0)<<1;case 2:case 5:case 6:default:return 0;case 3:{const t=i;return(t.sdf?1:0)<<2|(t.pattern?1:0)<<1}case 4:return(i.sdf?1:0)<<1}}_getProgramTemplate(e){switch(e){case 0:return Mt;case 5:return Pt;case 1:return Tt;case 4:return Rt;case 3:return Ct;case 2:return Dt;case 6:return It;default:return null}}}const W=1e-6;class ve{constructor(e,i){this.spriteMosaic=e,this.glyphMosaic=i,this._brushCache={vtlBackground:null,vtlFill:null,vtlLine:null,vtlCircle:null,vtlSymbol:null},this._vtlMaterialManager=new Et}dispose(){var e,i,t,n,a;(e=this._brushCache.vtlBackground)==null||e.dispose(),(i=this._brushCache.vtlFill)==null||i.dispose(),(t=this._brushCache.vtlLine)==null||t.dispose(),(n=this._brushCache.vtlCircle)==null||n.dispose(),(a=this._brushCache.vtlSymbol)==null||a.dispose(),this._brushCache=null,this._vtlMaterialManager=Z(this._vtlMaterialManager),this.spriteMosaic.dispose(),this.glyphMosaic.dispose()}get vectorTilesMaterialManager(){return this._vtlMaterialManager}drawSymbols(e,i,t){const n=t.layers;e.renderPass="translucent";let a=this._brushCache.vtlSymbol;a==null&&(a=new H.vtlSymbol,this._brushCache.vtlSymbol=a),F[0]=i;for(let r=0;r<n.length;r++){const s=n[r];if(s.type!==3)continue;const o=s.getLayoutProperty("visibility");if(o&&o.getValue()===1)continue;const l=e.displayLevel;s.minzoom!==void 0&&s.minzoom>l+W||s.maxzoom!==void 0&&s.maxzoom<=l-W||(e.styleLayerUID=s.uid,e.styleLayer=s,a.drawMany(e,F))}F[0]=null}drawBackground(e,i,t){if(t.backgroundBucketIds.length===0)return;const{context:n,displayLevel:a,requiredLevel:r}=e;i.key.level=r,n.setBlendingEnabled(!0),n.setDepthTestEnabled(!1),n.setStencilTestEnabled(!1),e.renderPass="background";let s=this._brushCache.vtlBackground;s==null&&(s=new H.vtlBackground,this._brushCache.vtlBackground=s),F[0]=i,t.backgroundBucketIds.forEach(o=>{const l=t.getLayerById(o);if(l.type!==0)return;const u=l.getLayoutProperty("visibility");u&&u.getValue()===1||l.minzoom!==void 0&&l.minzoom>a+W||l.maxzoom!==void 0&&l.maxzoom<=a-W||(e.styleLayerUID=l.uid,e.styleLayer=l,s.drawMany(e,F))}),F[0]=null}drawTile(e,i,t,n){const{context:a}=e,r=t.layers;a.setBlendingEnabled(!1),a.setDepthTestEnabled(!0),a.setDepthWriteEnabled(!0),a.setDepthFunction(515);const s=r.filter(o=>{if(n!=null&&n!==o.type||!i.layerData.has(o.uid))return!1;const l=o.getLayoutProperty("visibility");return(l==null?void 0:l.getValue())!==1});e.renderPass="opaque";for(let o=s.length-1;o>=0;--o)this._renderStyleLayer(s[o],e,i);a.setDepthWriteEnabled(!1),a.setBlendingEnabled(!0),a.setBlendFunctionSeparate(1,771,1,771),e.renderPass="translucent",s.forEach(o=>this._renderStyleLayer(o,e,i)),a.setDepthTestEnabled(!1),a.bindVAO(null)}_renderStyleLayer(e,i,t){const{renderPass:n}=i;let a;switch(e.type){case 0:if(n!=="background")return;a=this._brushCache.vtlBackground,a||(a=new H.vtlBackground,this._brushCache.vtlBackground=a);break;case 1:if(n!=="opaque"&&i.renderPass!=="translucent")return;a=this._brushCache.vtlFill,a==null&&(a=new H.vtlFill,this._brushCache.vtlFill=a);break;case 2:if(n!=="translucent")return;a=this._brushCache.vtlLine,a==null&&(a=new H.vtlLine,this._brushCache.vtlLine=a);break;case 4:if(n!=="translucent")return;a=this._brushCache.vtlCircle,a==null&&(a=new H.vtlCircle,this._brushCache.vtlCircle=a);break;case 3:if(n!=="translucent")return;a=this._brushCache.vtlSymbol,a==null&&(a=new H.vtlSymbol,this._brushCache.vtlSymbol=a)}const{displayLevel:r}=i,{minzoom:s,maxzoom:o}=e;if(s!==void 0&&s>r+W||o!==void 0&&o<=r-W)return;const{context:l}=i;l.setStencilTestEnabled(!1),l.setStencilWriteMask(0),i.styleLayerUID=e.uid,i.styleLayer=e,F[0]=t,a.drawMany(i,F),F[0]=null}}const F=[null];let z=class extends it(tt(at)){constructor(){super(...arguments),this._tileHandlerController=null,this.type="vector-tile-3d",this.levelShift=se("disable-feature:vtl-level-shift")?0:1}initialize(){if(this.layer.fullExtent==null)return void this.addResolvingPromise(Promise.reject(new qe("vectortilelayerview:full-extent-undefined","This layer view's layer does not define a fullExtent.")));const{basemapTerrain:c,spatialReference:e,state:i,viewingMode:t}=this.view,n=t==="local"&&!Ge(e)||Ke.force512VTL?this.layer.tileInfo:this.layer.tileInfo.getCompatibleForVTL(256),a=this._getTileInfoSupportError(n,this.layer.fullExtent);if(a!=null)return this.addResolvingPromise(Promise.reject(a));const r=Ye(()=>{var d,g;return(g=(d=this.view)==null?void 0:d.basemapTerrain)==null?void 0:g.tilingSchemeLocked}).then(()=>{var h,p;const d=c.tilingScheme,g=d.pixelSize,P=g===256?1:2,M=(h=c.spatialReference)!=null&&h.isGeographic&&g===256?1:0,m=(p=c.spatialReference)!=null&&p.isGeographic||g!==256?0:1;let S;this.schemaHelper=new nt(P,M,this.levelShift+m),S=g===256||g===512?this.layer.tileInfo.getCompatibleForVTL(g):this.layer.tileInfo;const _=this._getTileInfoCompatibilityError(S,d);if(_)throw _;this.tileInfo=S});this._tileHandlerController=new AbortController;const s=this.view.resourceController;this._memCache=s.memoryController.newCache(`vtl-${this.layer.uid}`,d=>d.release()),this.addHandles(je(()=>this.view.qualitySettings.memoryLimit,d=>this._memCache.maxSize=Math.ceil(d/10*1048576),Xe));const o=new oe(this.layer.currentStyleInfo.style);this._tileHandler=new he(this.layer,o,i.contentPixelRatio,this._memCache);const l=this._tileHandlerController.signal,u=Ut(s),w=this._tileHandler.start({signal:l,schedule:u}),f=this._tileHandler.spriteMosaic;f.then(d=>{!Ze(l)&&this._tileHandler&&(this.painter=new ve(d,this._tileHandler.glyphMosaic))}),w.then(()=>this._tileHandlerController=null);const x=()=>{var _;this._tileHandlerController&&this._tileHandlerController.abort(),this._tileHandlerController=new AbortController,this._memCache.clear();const d=this.layer.currentStyleInfo.style,g=((_=this.view.state)==null?void 0:_.contentPixelRatio)??1,P=new oe(d),M=new he(this.layer,P,g,this._memCache),m=M.start({signal:this._tileHandlerController.signal,schedule:u}),S=M.spriteMosaic;m.then(()=>this._tileHandlerController=null),this._updatingHandles.addPromise(Promise.all([m,S]).then(([,h])=>{const p=this._tileHandler,b=this.painter;this.painter=new ve(h,M.glyphMosaic),this._tileHandler=M,this.emit("data-changed"),p.destroy(),b&&b.dispose()}))};this._updatingHandles.add(()=>{var d;return{style:this.layer.currentStyleInfo.style,pixelRatio:(d=this.view.state)==null?void 0:d.contentPixelRatio}},x),this.addHandles([this.layer.on("paint-change",()=>this.emit("data-changed")),this.layer.on("style-layer-change",x),this.layer.on("delete-style-layer",x),this.layer.on("spriteSource-change",()=>this.emit("data-changed")),this.layer.on("layout-change",()=>this.emit("data-changed")),this.layer.on("style-layer-visibility-change",()=>this.emit("data-changed"))]);const y=Promise.all([r,w,f]);this.addResolvingPromise(y)}destroy(){this.painter=Z(this.painter),this._tileHandlerController=we(this._tileHandlerController),this._tileHandler=re(this._tileHandler),this._memCache=re(this._memCache)}get contentZoom(){return se("disable-feature:vtl-level-shift")?1:this.view.qualitySettings.tiledSurface.vtlContentZoom}get displayLevelRange(){const c=this.tileInfo.lods,e=this.layer.minScale||c[0].scale,i=this.layer.maxScale||c[c.length-1].scale,t=this.levelRangeFromScaleRange(e,i);return this.layer.maxScale?t.maxLevel++:t.maxLevel+=this.levelShift,t}get dataScaleRange(){const c=this.tileInfo.lods;return{minScale:c[0].scale,maxScale:c[c.length-1].scale}}get dataLevelRange(){const{minScale:c,maxScale:e}=this.dataScaleRange,i=this.levelRangeFromScaleRange(c,e);return i.minLevel===1&&this.tileInfo.size[0]===256&&(i.minLevel=0),i.maxLevel+=this.levelShift,i}async fetchTile(c,e){const i=this.schemaHelper.getLevelRowColumn(c);return this._tileHandler.getVectorTile(i,e)}get hasVisibleFeatures(){return!0}};V([O()],z.prototype,"layer",void 0),V([O()],z.prototype,"levelShift",void 0),V([O()],z.prototype,"contentZoom",null),V([O()],z.prototype,"displayLevelRange",null),V([O()],z.prototype,"tileInfo",void 0),V([O()],z.prototype,"dataScaleRange",null),V([O()],z.prototype,"dataLevelRange",null),V([O()],z.prototype,"updatingProgressValue",void 0),z=V([Qe("esri.views.3d.layers.VectorTileLayerView3D")],z);const ii=z;function Ut(c){return e=>c.immediate.schedule(e)}export{ii as default};

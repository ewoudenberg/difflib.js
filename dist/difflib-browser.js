/**
 * @fileoverview Text diff library ported from Python's difflib module. 
 *     https://github.com/qiao/difflib.js
 */
var difflib=(function r(o,i,u){function s(e,t){if(!i[e]){if(!o[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(l)return l(e,!0);throw(n=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",n}n=i[e]={exports:{}},o[e][0].call(n.exports,function(t){return s(o[e][1][t]||t)},n,n.exports,r,o,i,u)}return i[e].exports}for(var l="function"==typeof require&&require,t=0;t<u.length;t++)s(u[t]);return s}({1:[function(f,t,m){!function(){var o,c,i,t,V,D,w,a,u,H,C,p,e,g,n,d,y,r,s,l,h=[].indexOf;({floor:g,max:d,min:y}=Math),c=f("heap"),a=function(t,e){return e?2*t/e:1},w=function(t,e){var n,r,o,i,u;for([o,i]=[t.length,e.length],n=r=0,u=y(o,i);0<=u?r<u:u<r;n=0<=u?++r:--r){if(t[n]<e[n])return-1;if(t[n]>e[n])return 1}return o-i},p=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},D=function(t){for(var e=0,n=t.length;e<n;e++)if(t[e])return!0;return!1},V=class{constructor(t,e="",n="",r=!0){this.isjunk=t,this.autojunk=r,this.a=this.b=null,this.setSeqs(e,n)}setSeqs(t,e){return this.setSeq1(t),this.setSeq2(e)}setSeq1(t){if(t!==this.a)return this.a=t,this.matchingBlocks=this.opcodes=null}setSeq2(t){if(t!==this.b)return this.b=t,this.matchingBlocks=this.opcodes=null,this.fullbcount=null,this._chainB()}_chainB(){var n,t,e,r,o,i,u,s,l,h,f=this.b;for(this.b2j=n=new Map,e=i=0,u=f.length;i<u;e=++i)t=f[e],n.has(t)||n.set(t,[]),n.get(t).push(e);return o=new Map,(r=this.isjunk)&&n.forEach(function(t,e){if(r(e))return o.set(e,!0),n.delete(e)}),h=new Map,s=f.length,this.autojunk&&200<=s&&(l=g(s/100)+1,n.forEach(function(t,e){if(t.length>l)return h.set(e,!0),n.delete(e)})),this.isbjunk=function(t){return o.has(t)},this.isbpopular=function(t){return h.has(t)}}findLongestMatch(t,e,n,r){var o,i,u,s,l,h,f,a,p,c,g,d,y,m,v,b,k,w;for([o,i,u,a]=[this.a,this.b,this.b2j,this.isbjunk],[s,l,h]=[t,n,0],c={},f=y=k=t,w=e;k<=w?y<w:w<y;f=k<=w?++y:--y){for(b={},g=[],v=0,m=(g=u.has(o[f])?u.get(o[f]):g).length;v<m;v++)if(!((p=g[v])<n)){if(r<=p)break;h<(d=b[p]=(c[p-1]||0)+1)&&([s,l,h]=[f-d+1,p-d+1,d])}c=b}for(;t<s&&n<l&&!a(i[l-1])&&o[s-1]===i[l-1];)[s,l,h]=[s-1,l-1,h+1];for(;s+h<e&&l+h<r&&!a(i[l+h])&&o[s+h]===i[l+h];)h++;for(;t<s&&n<l&&a(i[l-1])&&o[s-1]===i[l-1];)[s,l,h]=[s-1,l-1,h+1];for(;s+h<e&&l+h<r&&a(i[l+h])&&o[s+h]===i[l+h];)h++;return[s,l,h]}getMatchingBlocks(){var t,e,n,r,o,i,u,s,l,h,f,a,p,c,g,d,y,m,v,b,k;if(this.matchingBlocks)return this.matchingBlocks;for([g,d]=[this.a.length,this.b.length],b=[[0,g,0,d]],m=[];b.length;)[e,t,r,n]=b.pop(),[o,s,f]=k=this.findLongestMatch(e,t,r,n),f&&(m.push(k),e<o&&r<s&&b.push([e,o,r,s]),o+f<t&&s+f<n&&b.push([o+f,t,s+f,n]));for(m.sort(w),v=[],c=i=l=a=0,y=m.length;c<y;c++)[u,h,p]=m[c],i+a===u&&l+a===h?a+=p:(a&&v.push([i,l,a]),[i,l,a]=[u,h,p]);return a&&v.push([i,l,a]),v.push([g,d,0]),this.matchingBlocks=v}getOpcodes(){var t,e,n,r,o,i,u,s,l,h;if(this.opcodes)return this.opcodes;for(r=o=0,this.opcodes=e=[],i=0,u=(s=this.getMatchingBlocks()).length;i<u;i++)[t,n,l]=s[i],h="",r<t&&o<n?h="replace":r<t?h="delete":o<n&&(h="insert"),h&&e.push([h,r,t,o,n]),[r,o]=[t+l,n+l],l&&e.push(["equal",t,r,n,o]);return e}getGroupedOpcodes(t=3){var e,n,r,o,i,u,s,l,h,f,a=this.getOpcodes();for("equal"===(a=!a.length?[["equal",0,1,0,1]]:a)[0][0]&&([f,r,o,i,u]=a[0],a[0]=[f,d(r,o-t),o,d(i,u-t),u]),"equal"===a[a.length-1][0]&&([f,r,o,i,u]=a[a.length-1],a[a.length-1]=[f,r,y(o,r+t),i,y(u,i+t)]),h=t+t,n=[],e=[],s=0,l=a.length;s<l;s++)[f,r,o,i,u]=a[s],"equal"===f&&h<o-r&&(e.push([f,r,y(o,r+t),i,y(u,i+t)]),n.push(e),e=[],[r,i]=[d(r,o-t),d(i,u-t)]),e.push([f,r,o,i,u]);return!e.length||1===e.length&&"equal"===e[0][0]||n.push(e),n}ratio(){for(var t=0,e=this.getMatchingBlocks(),n=0,r=e.length;n<r;n++)t+=e[n][2];return a(t,this.a.length+this.b.length)}quickRatio(){var t,e,n,r,o,i,u,s,l,h,f;if(!this.fullbcount)for(this.fullbcount=n={},r=0,o=(h=this.b).length;r<o;r++)n[e=h[r]]=(n[e]||0)+1;for(n=this.fullbcount,t={},u=s=0,i=(f=this.a).length;u<i;u++)e=f[u],l=p(t,e)?t[e]:n[e]||0,t[e]=l-1,0<l&&s++;return a(s,this.a.length+this.b.length)}realQuickRatio(){var t,e;return[t,e]=[this.a.length,this.b.length],a(y(t,e),t+e)}},n=function(t,e,n=3,r=.6){var o,i,u,s,l,h,f,a,p;if(!(0<n))throw new Error(`n must be > 0: (${n})`);if(!(0<=r&&r<=1))throw new Error(`cutoff must be in [0.0, 1.0]: (${r})`);for(l=[],(f=new V).setSeq2(t),o=0,i=e.length;o<i;o++)p=e[o],f.setSeq1(p),f.realQuickRatio()>=r&&f.quickRatio()>=r&&f.ratio()>=r&&l.push([f.ratio(),p]);for(h=[],s=0,u=(l=c.nlargest(l,n,w)).length;s<u;s++)[a,p]=l[s],h.push(p);return h},u=function(t,e){var n,r;for([n,r]=[0,t.length];n<r&&t[n]===e;)n++;return n},o=class{constructor(t,e){this.linejunk=t,this.charjunk=e}compare(t,e){for(var n,r,o,i,u,s,l,h,f,a=[],p=new V(this.linejunk,t,e).getOpcodes(),c=0,g=p.length;c<g;c++){switch([f,r,n,i,o]=p[c],f){case"replace":u=this._fancyReplace(t,r,n,e,i,o);break;case"delete":u=this._dump("-",t,r,n);break;case"insert":u=this._dump("+",e,i,o);break;case"equal":u=this._dump(" ",t,r,n);break;default:throw new Error(`unknown tag (${f})`)}for(h=0,s=u.length;h<s;h++)l=u[h],a.push(l)}return a}_dump(t,e,n,r){for(var o,i,u=[],s=o=i=n,l=r;i<=l?o<l:l<o;s=i<=l?++o:--o)u.push(t+" "+e[s]);return u}_plainReplace(t,e,n,r,o,i){var u,s,l,h,f,a,p,c,g;if(!(e<n&&o<i))throw new Error(`lows must be lower than highs: (${e} < ${n}, ${o} < ${i})`);for(i=i-o<n-e?(u=this._dump("+",r,o,i),this._dump("-",t,e,n)):(u=this._dump("-",t,e,n),this._dump("+",r,o,i)),p=[],l=0,h=(g=[u,i]).length;l<h;l++)for(c=0,f=(s=g[l]).length;c<f;c++)a=s[c],p.push(a);return p}_fancyReplace(t,e,n,r,o,i){var u,s,l,h,f,a,p,c,g,d,y,m,v,b,k,w,q,_,j,$,O,R,M,S,E,x,A,B,C,D,H,I,L,N,U,G,Q,J,K,T,z,F,P;for([f,v]=[.74,.75],m=new V(this.charjunk),[b,k]=[null,null],A=[],q=_=L=o,N=i;L<=N?_<N:N<_;q=L<=N?++_:--_)for(c=r[q],m.setSeq2(c),w=B=U=e,G=n;U<=G?B<G:G<B;w=U<=G?++B:--B)(u=t[w])!==c?(m.setSeq1(u),m.realQuickRatio()>f&&m.quickRatio()>f&&m.ratio()>f&&([f,a,p]=[m.ratio(),w,q])):null===b&&([b,k]=[w,q]);if(f<v){if(null===b){for(C=0,O=(Q=this._plainReplace(t,e,n,r,o,i)).length;C<O;C++)x=Q[C],A.push(x);return A}[a,p,f]=[b,k,1]}else b=null;for(D=0,R=(J=this._fancyHelper(t,e,a,r,o,p)).length;D<R;D++)x=J[D],A.push(x);if([v,o]=[t[a],r[p]],null===b){for(h=y="",m.setSeqs(v,o),H=0,M=(K=m.getOpcodes()).length;H<M;H++)switch([P,s,l,g,d]=K[H],[j,$]=[l-s,d-g],P){case"replace":h+=Array(j+1).join("^"),y+=Array($+1).join("^");break;case"delete":h+=Array(j+1).join("-");break;case"insert":y+=Array($+1).join("+");break;case"equal":h+=Array(j+1).join(" "),y+=Array($+1).join(" ");break;default:throw new Error(`unknow tag (${P})`)}for(I=0,S=(T=this._qformat(v,o,h,y)).length;I<S;I++)x=T[I],A.push(x)}else A.push("  "+v);for(F=0,E=(z=this._fancyHelper(t,a+1,n,r,p+1,i)).length;F<E;F++)x=z[F],A.push(x);return A}_fancyHelper(t,e,n,r,o,i){var u=[];return e<n?u=o<i?this._fancyReplace(t,e,n,r,o,i):this._dump("-",t,e,n):o<i&&(u=this._dump("+",r,o,i)),u}_qformat(t,e,n,r){var o=[],i=y(u(t,"\t"),u(e,"\t"));return i=y(i,u(n.slice(0,i)," ")),i=y(i,u(r.slice(0,i)," ")),n=n.slice(i).replace(/\s+$/,""),r=r.slice(i).replace(/\s+$/,""),o.push("- "+t),n.length&&o.push(`? ${Array(i+1).join("\t")}${n}
`),o.push("+ "+e),r.length&&o.push(`? ${Array(i+1).join("\t")}${r}
`),o}},t=function(t,e=/^\s*#?\s*$/){return e.test(t)},i=function(t,e=" \t"){return 0<=h.call(e,t)},C=function(t,e){var n=t+1,t=e-t;return 1==t?""+n:(t||n--,n+","+t)},l=function(t,e,{fromfile:n,tofile:r,fromfiledate:o,tofiledate:i,n:u,lineterm:s}={}){var l,h,f,a,p,c,g,d,y,m,v,b,k,w,q,_,j,$,O,R,M,S,E,x,A,B;for(null==n&&(n=""),null==r&&(r=""),null==o&&(o=""),null==i&&(i=""),null==u&&(u=3),null==s&&(s="\n"),x=!(q=[]),g=0,y=(R=new V(null,t,e).getGroupedOpcodes()).length;g<y;g++)for(h=R[g],x||(x=!0,B=i?`	`+i:"",q.push("--- "+n+(o?`	`+o:"")+s),q.push("+++ "+r+B+s)),[l,d]=[h[0],h[h.length-1]],B=C(l[1],d[2]),d=C(l[3],d[4]),q.push(`@@ -${B} +${d} @@`+s),_=0,m=h.length;_<m;_++)if([A,f,a,p,c]=h[_],"equal"!==A){if("replace"===A||"delete"===A)for($=0,b=(S=t.slice(f,a)).length;$<b;$++)w=S[$],q.push("-"+w);if("replace"===A||"insert"===A)for(O=0,k=(E=e.slice(p,c)).length;O<k;O++)w=E[O],q.push("+"+w)}else for(j=0,v=(M=t.slice(f,a)).length;j<v;j++)w=M[j],q.push(" "+w);return q},H=function(t,e){var n=t+1,t=e-t;return t||n--,t<=1?""+n:n+","+(n+t-1)},e=function(t,e,{fromfile:n,tofile:r,fromfiledate:o,tofiledate:i,n:u,lineterm:s}={}){var l,h,f,a,p,c,g,d,y,m,v,b,k,w,q,_,j,$,O,R,M,S,E,x,A,B,C;for(null==n&&(n=""),null==r&&(r=""),null==o&&(o=""),null==i&&(i=""),null==u&&(u=3),null==s&&(s="\n"),A=!(R={insert:"+ ",delete:"- ",replace:"! ",equal:"  "}),_=[],d=0,m=(S=new V(null,t,e).getGroupedOpcodes()).length;d<m;d++)if(f=S[d],!A){if(A=!0,C=i?`	`+i:"",_.push("*** "+n+(o?`	`+o:"")+s),_.push("--- "+r+C+s),[h,y]=[f[0],f[f.length-1]],_.push("***************"+s),C=H(h[1],y[2]),_.push(`*** ${C} ****`+s),D(function(){for(var t=[],e=0,n=f.length;e<n;e++)[B,l,l,l,l]=f[e],t.push("replace"===B||"delete"===B);return t}()))for(j=0,v=f.length;j<v;j++)if([B,a,p,l,l]=f[j],"insert"!==B)for($=0,b=(E=t.slice(a,p)).length;$<b;$++)q=E[$],_.push(R[B]+q);if(y=H(h[3],y[4]),_.push(`--- ${y} ----`+s),D(function(){for(var t=[],e=0,n=f.length;e<n;e++)[B,l,l,l,l]=f[e],t.push("replace"===B||"insert"===B);return t}()))for(O=0,k=f.length;O<k;O++)if([B,l,l,c,g]=f[O],"delete"!==B)for(M=0,w=(x=e.slice(c,g)).length;M<w;M++)q=x[M],_.push(R[B]+q)}return _},r=function(t,e,n,r=i){return new o(n,r).compare(t,e)},s=function(t,e){var n,r,o,i,u,s,l={1:"- ",2:"+ "}[e];if(!l)throw new Error("unknow delta choice (must be 1 or 2): "+e);for(u=["  ",l],i=[],n=0,r=t.length;n<r;n++)s=(o=t[n]).slice(0,2),0<=h.call(u,s)&&i.push(o.slice(2));return i},m._arrayCmp=w,m.SequenceMatcher=V,m.getCloseMatches=n,m._countLeading=u,m.Differ=o,m.IS_LINE_JUNK=t,m.IS_CHARACTER_JUNK=i,m._formatRangeUnified=C,m.unifiedDiff=l,m._formatRangeContext=H,m.contextDiff=e,m.ndiff=r,m.restore=s}.call(this)},{heap:2}],2:[function(t,e,n){e.exports=t("./lib/heap")},{"./lib/heap":3}],3:[function(t,s,m){!function(){var t,p,l,c,g,e,h,n,d,y,r,f,a,o,i;function u(t){this.cmp=null!=t?t:p,this.nodes=[]}l=Math.floor,y=Math.min,p=function(t,e){return t<e?-1:e<t?1:0},d=function(t,e,n,r,o){var i;if(null==o&&(o=p),(n=null==n?0:n)<0)throw new Error("lo must be non-negative");for(null==r&&(r=t.length);n<r;)o(e,t[i=l((n+r)/2)])<0?r=i:n=i+1;return[].splice.apply(t,[n,n-n].concat(e)),e},g=function(t,e){var n,r;return null==e&&(e=p),n=t.pop(),t.length?(r=t[0],t[0]=n,a(t,0,e)):r=n,r},n=function(t,e,n){var r;return null==n&&(n=p),r=t[0],t[0]=e,a(t,0,n),r},h=function(t,e,n){var r;return null==n&&(n=p),t.length&&n(t[0],e)<0&&(e=(r=[t[0],e])[0],t[0]=r[1],a(t,0,n)),e},c=function(n,t){var e,r,o,i,u,s;for(null==t&&(t=p),u=[],r=0,o=(i=function(){s=[];for(var t=0,e=l(n.length/2);0<=e?t<e:e<t;0<=e?t++:t--)s.push(t);return s}.apply(this).reverse()).length;r<o;r++)e=i[r],u.push(a(n,e,t));return u},r=function(t,e,n){if(null==n&&(n=p),-1!==(e=t.indexOf(e)))return f(t,0,e,n),a(t,e,n)},o=function(t,e,n){var r,o,i,u,s;if(null==n&&(n=p),!(o=t.slice(0,e)).length)return o;for(c(o,n),i=0,u=(s=t.slice(e)).length;i<u;i++)r=s[i],h(o,r,n);return o.sort(n).reverse()},i=function(t,e,n){var r,o,i,u,s,l,h,f,a;if(null==n&&(n=p),10*e<=t.length){if(!(i=t.slice(0,e).sort(n)).length)return i;for(o=i[i.length-1],u=0,l=(h=t.slice(e)).length;u<l;u++)n(r=h[u],o)<0&&(d(i,r,0,null,n),i.pop(),o=i[i.length-1]);return i}for(c(t,n),a=[],s=0,f=y(e,t.length);0<=f?s<f:f<s;0<=f?++s:--s)a.push(g(t,n));return a},f=function(t,e,n,r){var o,i,u;for(null==r&&(r=p),o=t[n];e<n&&r(o,i=t[u=n-1>>1])<0;)t[n]=i,n=u;return t[n]=o},a=function(t,e,n){var r,o,i,u,s;for(null==n&&(n=p),o=t.length,i=t[s=e],r=2*e+1;r<o;)(u=r+1)<o&&!(n(t[r],t[u])<0)&&(r=u),t[e]=t[r],r=2*(e=r)+1;return t[e]=i,f(t,s,e,n)},u.push=e=function(t,e,n){return null==n&&(n=p),t.push(e),f(t,0,t.length-1,n)},u.pop=g,u.replace=n,u.pushpop=h,u.heapify=c,u.updateItem=r,u.nlargest=o,u.nsmallest=i,u.prototype.push=function(t){return e(this.nodes,t,this.cmp)},u.prototype.pop=function(){return g(this.nodes,this.cmp)},u.prototype.peek=function(){return this.nodes[0]},u.prototype.contains=function(t){return-1!==this.nodes.indexOf(t)},u.prototype.replace=function(t){return n(this.nodes,t,this.cmp)},u.prototype.pushpop=function(t){return h(this.nodes,t,this.cmp)},u.prototype.heapify=function(){return c(this.nodes,this.cmp)},u.prototype.updateItem=function(t){return r(this.nodes,t,this.cmp)},u.prototype.clear=function(){return this.nodes=[]},u.prototype.empty=function(){return 0===this.nodes.length},u.prototype.size=function(){return this.nodes.length},u.prototype.clone=function(){var t=new u;return t.nodes=this.nodes.slice(0),t},u.prototype.toArray=function(){return this.nodes.slice(0)},u.prototype.insert=u.prototype.push,u.prototype.top=u.prototype.peek,u.prototype.front=u.prototype.peek,u.prototype.has=u.prototype.contains,u.prototype.copy=u.prototype.clone,t=u,o=this,i=function(){return t},"function"==typeof define&&define.amd?define([],i):"object"==typeof m?s.exports=t:o.Heap=t}.call(this)},{}]},{},[1]),require("/difflib"));
/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.2
build: 56
*/
YUI.add("event-simulate",function(A){(function(){var K=A.Lang,J=A.Array,F=K.isFunction,D=K.isString,G=K.isBoolean,P=K.isObject,O=K.isNumber,N=A.config.doc,Q={click:1,dblclick:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,mousemove:1},M={keydown:1,keyup:1,keypress:1},C={blur:1,change:1,focus:1,resize:1,scroll:1,select:1},E={scroll:1,resize:1,reset:1,submit:1,change:1,select:1,error:1,abort:1};A.mix(E,Q);A.mix(E,M);function I(V,Z,U,S,b,R,L,a,X,d,c){if(!V){A.error("simulateKeyEvent(): Invalid target.");}if(D(Z)){Z=Z.toLowerCase();switch(Z){case"textevent":Z="keypress";break;case"keyup":case"keydown":case"keypress":break;default:A.error("simulateKeyEvent(): Event type '"+Z+"' not supported.");}}else{A.error("simulateKeyEvent(): Event type must be a string.");}if(!G(U)){U=true;}if(!G(S)){S=true;}if(!P(b)){b=window;}if(!G(R)){R=false;}if(!G(L)){L=false;}if(!G(a)){a=false;}if(!G(X)){X=false;}if(!O(d)){d=0;}if(!O(c)){c=0;}var Y=null;if(F(N.createEvent)){try{Y=N.createEvent("KeyEvents");Y.initKeyEvent(Z,U,S,b,R,L,a,X,d,c);}catch(W){try{Y=N.createEvent("Events");}catch(T){Y=N.createEvent("UIEvents");}finally{Y.initEvent(Z,U,S);Y.view=b;Y.altKey=L;Y.ctrlKey=R;Y.shiftKey=a;Y.metaKey=X;Y.keyCode=d;Y.charCode=c;}}V.dispatchEvent(Y);}else{if(P(N.createEventObject)){Y=N.createEventObject();Y.bubbles=U;Y.cancelable=S;Y.view=b;Y.ctrlKey=R;Y.altKey=L;Y.shiftKey=a;Y.metaKey=X;Y.keyCode=(c>0)?c:d;V.fireEvent("on"+Z,Y);}else{A.error("simulateKeyEvent(): No event simulation framework present.");}}}function B(a,f,X,U,g,Z,W,V,T,R,S,L,e,c,Y,b){if(!a){A.error("simulateMouseEvent(): Invalid target.");}if(D(f)){f=f.toLowerCase();if(!Q[f]){A.error("simulateMouseEvent(): Event type '"+f+"' not supported.");}}else{A.error("simulateMouseEvent(): Event type must be a string.");}if(!G(X)){X=true;}if(!G(U)){U=(f!="mousemove");}if(!P(g)){g=window;}if(!O(Z)){Z=1;}if(!O(W)){W=0;}if(!O(V)){V=0;}if(!O(T)){T=0;}if(!O(R)){R=0;}if(!G(S)){S=false;}if(!G(L)){L=false;}if(!G(e)){e=false;}if(!G(c)){c=false;}if(!O(Y)){Y=0;}var d=null;if(F(N.createEvent)){d=N.createEvent("MouseEvents");if(d.initMouseEvent){d.initMouseEvent(f,X,U,g,Z,W,V,T,R,S,L,e,c,Y,b);}else{d=N.createEvent("UIEvents");d.initEvent(f,X,U);d.view=g;d.detail=Z;d.screenX=W;d.screenY=V;d.clientX=T;d.clientY=R;d.ctrlKey=S;d.altKey=L;d.metaKey=c;d.shiftKey=e;d.button=Y;d.relatedTarget=b;}if(b&&!d.relatedTarget){if(f=="mouseout"){d.toElement=b;}else{if(f=="mouseover"){d.fromElement=b;}}}a.dispatchEvent(d);}else{if(P(N.createEventObject)){d=N.createEventObject();d.bubbles=X;d.cancelable=U;d.view=g;d.detail=Z;d.screenX=W;d.screenY=V;d.clientX=T;d.clientY=R;d.ctrlKey=S;d.altKey=L;d.metaKey=c;d.shiftKey=e;switch(Y){case 0:d.button=1;break;case 1:d.button=4;break;case 2:break;default:d.button=0;}d.relatedTarget=b;a.fireEvent("on"+f,d);}else{A.error("simulateMouseEvent(): No event simulation framework present.");}}}function H(W,V,S,R,L,U){if(!W){A.error("simulateUIEvent(): Invalid target.");}if(D(V)){V=V.toLowerCase();if(!C[V]){A.error("simulateUIEvent(): Event type '"+V+"' not supported.");}}else{A.error("simulateUIEvent(): Event type must be a string.");}var T=null;if(!G(S)){S=(V in E);}if(!G(R)){R=(V=="submit");}if(!P(L)){L=window;}if(!O(U)){U=1;}if(F(N.createEvent)){T=N.createEvent("UIEvents");T.initUIEvent(V,S,R,L,U);W.dispatchEvent(T);}else{if(P(N.createEventObject)){T=N.createEventObject();T.bubbles=S;T.cancelable=R;T.view=L;T.detail=U;W.fireEvent("on"+V,T);}else{A.error("simulateUIEvent(): No event simulation framework present.");}}}A.Event.simulate=function(S,R,L){L=L||{};if(Q[R]){B(S,R,L.bubbles,L.cancelable,L.view,L.detail,L.screenX,L.screenY,L.clientX,L.clientY,L.ctrlKey,L.altKey,L.shiftKey,L.metaKey,L.button,L.relatedTarget);}else{if(M[R]){I(S,R,L.bubbles,L.cancelable,L.view,L.ctrlKey,L.altKey,L.shiftKey,L.metaKey,L.keyCode,L.charCode);}else{if(C[R]){H(S,R,L.bubbles,L.cancelable,L.view,L.detail);}else{A.error("simulate(): Event '"+R+"' can't be simulated.");}}}};})();},"3.1.2",{requires:["event-base"]});
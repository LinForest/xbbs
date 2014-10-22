/*  Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/
/* 
prototype-1.4.0ע�Ͱ汾 by http://www.x2blog.cn/supNate/
 
prototype��������ǳ��ڷ���Ruby������Ա����JavaScript�����������ģ�������汾�ϸ������ֵ����쾡�¡�
����1.3.1�汾��1.4.0�еı��˼��ͼ��ɸ��������İ��о������ڿ��ر��˼·���а�����
 
�ð汾��Ҫ�����˵�����˼�룬Ҳ��Ruby�е�һ�����ĸ���Ӷ�ʹ�ô˿�ܽ���JavaScript�����������Ա���forѭ����ʹ�á�
/*----------------------------------------------------------------------------------------------------*/
 
 
/*
����prototype���󣬸�֪�汾��Ϣ�������ڳ�����Զ����
ScriptFragment��������ʽ�����ڲ����ַ����е�<script>��Ǽ����е�����
emptyFunction:�պ���
K�����ز�������ĺ������������Ӧ��
 
������ʹ����ֱ�Ӷ��������﷨��
var obj={
	property1:value1,
	property2:value2,
	....
}
����ᾭ���õ�
*/
var Prototype = {
  Version: '1.4.0',
  ScriptFragment: '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',
 
  emptyFunction: function() {},
  K: function(x) {return x}
}
 
/*
���崴�����ģʽ��ʹ�ô�ģʽ���������ܹ�ʵ�ֹ��캯��
����initialize��һ�����󷽷���applyʹ���ܶ��䱣�ֲ�����
���ֱ�ӵ���this.initialize(arguments)������������������Ϊ��һ��������
*/
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}
 
//��ʾ�����ռ���߳�����Ķ�����ʹ�����߼��������
var Abstract = new Object();
 
/*
��source���������Ը��Ƶ�destination
���磺
var a={};
var b={p:1};
Object.extent(a,b);
alert(a.p);
���Կ���a����������p��ֵ����1��
���������ͬ�򸲸ǡ�
*/
Object.extend = function(destination, source) {
  for (property in source) {
    destination[property] = source[property];
  }
  return destination;
}
/*
���prototype-1.3.1������������ĺ�����
Object.prototype.extend = function(object) {
  return Object.extend.apply(this, [this, object]);
}
����ԭ�Ȼ���1.3.1��ܵ�js�ű�������1.4.0ʱ��������������⡣ֻҪ��1.4.0����������������ɡ�
ȥ����ԭ������ΪΪÿ��object������extend�����Եĺ��˷ѣ��Ͼ�95���Ķ����ǲ����õ��ġ�
����������extend����ҲΪ����ö�ٴ���һ�����鷳����Ӻ���Hash������÷����Կ�����
*/
 
/*
������ת��Ϊ�ַ����������ܹ�����ϸһЩ��ֻҪ�����Զ�����inspect������������ԭ�������toString����[object]��
�����������鶨����inspect������ʹ��
var arr=[1,2,3];
����arr.inspect()=="[1,2,3]";
*/
Object.inspect = function(object) {
  try {
    if (object == undefined) return 'undefined';
    if (object == null) return 'null';
    return object.inspect ? object.inspect() : object.toString();
  } catch (e) {
    if (e instanceof RangeError) return '...';
    throw e;
  }
}
 
/*
һ������Ҫ�ķ������ܹ��������󶨵�ĳ����������
��1.3.1�汾��ȣ�ԭ�������ڰ󶨵�ʱ�����Ӳ����������ڿ��ԡ�
���磺
var obj1={p:"obj1"};
var obj2={
	p:"obj2",
	method:function(arg){
		alert(arg+this.p);
	}
}
obj2.method("this is ");//��ʾ��this is obj2����
obj2.method.bind(obj1,"now this is ");//��ʾ��now this is obj1����
���һ����1.3.1�б���дΪ��
obj2.method.bind(obj1)("now this is ");//��ʾ��now this is obj1����
*/
Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}
/*
��������Ϊ������¼����������������Բ�����������ͨ�õ��¼������������Ҫ�Ե����¼����д���
function clickHandler(element){
	//����element�ĵ����¼�
}
 
�����нڵ�node1����
node1.onclick=function(){
	clickHandler.bindAsEventListener(this)(event||window.event);
}
*/
Function.prototype.bindAsEventListener = function(object) {
  var __method = this;
  return function(event) {
    return __method.call(object, event || window.event);
  }
}
 
/*
���е��������Ͷ���Number���ʵ����������Ǹ�Number�ඨ��һЩ����
*/
Object.extend(Number.prototype, {
	/*
	������ת��Ϊ��ɫ����ʽ
	*/
  toColorPart: function() {
    var digits = this.toString(16);
    if (this < 16) return '0' + digits;
    return digits;
  },
	//��1
  succ: function() {
    return this + 1;
  },
	/*
	ִ��ָ��������ѭ���������ȡ10�������
	var ran=[]
	var c=10;
	c.times(function(){
		ran.push(Math.random());
	});
	$R��ObjectRange����Ŀ�ݴ�����ʽ��������н��ܡ�
	*/
  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  }
});
 
/*
Try���󣬽���һ������these
*/
var Try = {
	/*
	���ݲ���ָ���ĺ������е��ã����ص�һ�����óɹ���ֵ
	�ں�������������XMLHttpRequest����ʱ���õ��ˡ�
	������ж����ɹ��򷵻�undefined
	*/
  these: function() {
    var returnValue;
 
    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }
 
    return returnValue;
  }
}
 
/*--------------------------------------------------------------------------*/
 
 
/*
��ʱ���࣬����window.setInterval�����������ܹ�ʹ�ûص��������ᱻ�������ã���onTimerEvent��ע�͡�
*/
var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
	/*
	���캯����ָ���ص�������ִ��Ƶ�ʣ���λΪ��
	*/
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;
    this.registerCallback();
  },
	/*
	��ʼִ�ж�ʱ����һ�㲻Ҫ��ʾ���ã��ڹ��캯���б�����
	ע������дΪ��
	this.onTimerEvent.bind(this)
	���дΪ��
	this.onTimerEvent
	��onTimerEvent�еĺ�����thisָ�뽫ָ��window���󣬼�setInterval��Ĭ�϶���
	*/
  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },
	/*
	�൱�ڻص�������һ������
	�ڴ�ͳ��setInterval�����У�ʱ��һ������ǿ��ִ�лص������������������currentlyExecuting�����жϣ�
	�����callback������ִ��ʱ�䳬����һ��ʱ��Ƭ������ֹ�䱻�ظ�ִ�С�
	*/
  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.callback();
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
}
 
/*--------------------------------------------------------------------------*/
/*
�ܷ����һ���������Ӻ������ܹ���ò�����ָ����ҳ��ڵ㣬����ж�������򷵻����顣
��������ʽ�ȿ����ǽڵ��idֵ��Ҳ�����ǽڵ�����ã���$($("someId"))��$("someId")�ǵȼ۵�;
*/
function $() {
  var elements = new Array();
 
  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);
 
    if (arguments.length == 1)
      return element;
 
    elements.push(element);
  }
 
  return elements;
}
 
/*
Ϊ�ַ���������ӷ�������ǰ��ΪNumber��ӷ�����ԭ����ͬ
*/
Object.extend(String.prototype, {
	/*
	��Htmlת��Ϊ���ı������磺
	var s="<font color='red'>hello</font>";
	s.stripTags()���õ���hello����
	*/
  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },
	/*
	ɾ���ı��еĽű����루<script xxx>...</script>��
	*/
  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },
	//��ȡ�ַ����еĽű����������нű�������ɵ�����
  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');//���ҵ����а���<script>�Ĵ�����
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');	//�ٶ�ÿ���ű�ɾ��<script>���
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },
	//����ȡ�ַ����еĽű��飬��ִ����Щ�ű�
  evalScripts: function() {
    return this.extractScripts().map(eval);
  },
	/*
	�������������Ļ��ƶ�Html�ַ������б��룬���罫<ת��Ϊ&lt;
	*/
  escapeHTML: function() {
    var div = document.createElement('div');
    var text = document.createTextNode(this);
    div.appendChild(text);
    return div.innerHTML;
  },
	/*
	��Html���н���
	*/
  unescapeHTML: function() {
    var div = document.createElement('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
  },
	//��ȡ��ѯ�ַ������飬����ͨ��document.location.toQueryParams()�Ϳ��Եõ��ɼ���ֵ��ɵĹ�ϣ���ö����ʾ����
  toQueryParams: function() {
    var pairs = this.match(/^\??(.*)$/)[1].split('&');
    return pairs.inject({}, function(params, pairString) {
      var pair = pairString.split('=');
      params[pair[0]] = pair[1];
      return params;
    });
  },
	//���ַ���ת��Ϊ�ַ�����
  toArray: function() {
    return this.split('');
  },
	/*
	����"-"���ӵ��ַ������ջ������磺
	var s="background-color";
	alert(s.camelize());
	���õ���backgroundColor����
	*/
  camelize: function() {
    var oStringList = this.split('-');
    if (oStringList.length == 1) return oStringList[0];
 
    var camelizedString = this.indexOf('-') == 0
      ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1)
      : oStringList[0];
 
    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }
 
    return camelizedString;
  },
	/*
	inspect�ǹ۲����˼�������ž��ǽ��ַ���ת��Ϊ�ɹ۲����ʽ�����ｫת���ַ�д��ת��ǰ���ַ�����ʽ��
	���磺
	var s="abc\ndef";
 
	alert(s);
	���õ������ַ�������һ����abc,��һ����def
	��
	alert(s.inspect());
	���õ�abc\ndef
	�����ַ�����ֵʱ����ʽ����������inspect�������ơ�
	*/
  inspect: function() {
    return "'" + this.replace('\\', '\\\\').replace("'", '\\\'') + "'";
  }
});
 
//��һ����������
String.prototype.parseQuery = String.prototype.toQueryParams;
 
//�����������쳣������Ҫ���ڵ�������
var $break    = new Object();
var $continue = new Object();
 
/*
����һ���ǳ�Ruby�Ļ��ƣ���ʵ�Ͽ��Խ�Enumerable����һ��ö�ٽӿڣ�
��_each�Ǳ���ʵ�ֵķ�����ֻҪʵ���˴˷������࣬�����Ե��ýӿ����е�������Ա��
�������Array��ʵ���˴˽ӿڣ�Ҳ������͵�Ӧ��
*/
var Enumerable = {
	/*
	�Կ�ö�ٶ����ÿ����Ա����iterator����������������
	��������������׳�$continue�쳣�������ִ�У�����׳�$break�쳣�����ټ�������
	
	���е�����_each������󷽷���
	_each���ɾ���ļ̳���Enumerable����ʵ�ֵ�
 
	index�����������������ڸ��ߵ�������ǰִ�е��ڼ���Ԫ�أ��ǵ�������ѡʵ�ֵġ�
	*/
  each: function(iterator) {
    var index = 0;
    try {
      this._each(function(value) {
        try {
          iterator(value, index++);
        } catch (e) {
          if (e != $continue) throw e;
        }
      });
    } catch (e) {
      if (e != $break) throw e;
    }
  },
	/*
	�ж�ö�ٶ����е�����Ԫ���Ƿ���ʹ�õ���������true�����û��ָ�������������ж�����Ԫ���Ƿ񶼶�Ӧ�ڲ������͵�true
	������ж����㣬�򷵻�true�����򷵻�false��
	ע�������ʹ����$break�쳣������ʵ�֡��߼��롱�����Ķ�·Ч��
	����ֵ��ע���һ��������ʹ����!!��һ������ǿ��ת��Ϊ�������ͣ����Բο���http://www.x2blog.cn/supNate/?tid=4669
	*/
all: function(iterator) {
var result = true;
this.each(function(value, index) {
result = result && !!(iterator || Prototype.K)(value, index);
if (!result) throw $break;
});
return result;
},
	/*
	�ж�ö�ٶ����е�����Ԫ���Ƿ�������ָ����������ֵ������true����������򷵻�true�����򷵻�false
	��ԭ���all��������
 
	�������Ϊ�գ���Ȼ����true����һ���е������˼��
	*/
  any: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      if (result = !!(iterator || Prototype.K)(value, index))
        throw $break;
    });
    return result;
  },
	/*
	��������ö��Ԫ��ͨ��������ִ�еĽ������Ϊ���鷵��
	*/
  collect: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      results.push(iterator(value, index));
    });
    return results;
  },
	/*
	���ص�һ���ܹ�ʹ�õ���������true��ö��Ԫ�ص�ֵ�����û��true���򷵻�"undefined",��resultδ����ֵ
	���п��������߿��ǵ�һ��Сʧ�󣬱Ͼ�����"undefined"������һ���õķ�񣨽��ǲ²⣩
	*/
  detect: function (iterator) {
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },
	/*
	���������ܹ�ʹ�õ���������true��ö��Ԫ�أ���Ϊ���鷵�ء�
	*/
  findAll: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index))
        results.push(value);
    });
    return results;
  },
	/*
	grep��unix�����ϵͳ�µ�һ�������������������JavaScript��һ������ʵ��
	pattern������ģʽ�������з��ϴ�ģʽ��ö��Ԫ�ؽ��е��������㣬�������������浽�����в����ء�
	��Ҫע�⣬�����iterator�����ǿ�ѡ�ģ���ʱ������ö��Ԫ�ؽ���ģʽƥ�䣬�������е�ƥ����
	*/
  grep: function(pattern, iterator) {
    var results = [];
    this.each(function(value, index) {
      var stringValue = value.toString();
      if (stringValue.match(pattern))
        results.push((iterator || Prototype.K)(value, index));
    })
    return results;
  },
	/*
	�ж�ö�ٶ������Ƿ����ָ��ֵ��ö��Ԫ�أ�������Ȼʹ����each������������ѭ�����ɼ�prototype�������ṩһ��ruby���ı�̷�ʽ��
	�����ѭ��ʵ�֣��������������µĴ��룺
	for(var i=0;i<this.length;i++){
		if(this[i]==object)return true;
	}
	���ú����У������˵�������
	function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    }
	�����������Ϊeach�����Ĳ�����
	
	*/
  include: function(object) {
    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },
 
	/*
	������˼�ǡ�ע�롱���������൱�ڽ�memo��Ϊ��ϵ������������ȫ�ֱ�����ÿ�ε�����������в��������ز����������������������飺
	var arr=[1,2,3];
	�����뽫���ַ�����Ϊ��123
	���������join��������ͳ�����ǣ�
	var s="";
	for(var i=0;i<arr.length;i++){
		s+=arr[i];
	}
	����ͨ������inject��������
	var s=arr.inject("",function(memo,value){return memo+value});
	�������еĽ������ȫ��ͬ�ġ�
	*/
  inject: function(memo, iterator) {
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },
 
	/*
	������ö��Ԫ���ϵ���method�����������Ը�����������ݲ���
	��������method��ִ�н������Ϊ���鷵��
	*/
  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.collect(function(value) {
      return value[method].apply(value, args);
    });
  },
	/*
	�������ĵ���������ֵ
	*/
  max: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (value >= (result || value))
        result = value;
    });
    return result;
  },
	/*
	������С�ĵ���������ֵ
	*/
  min: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (value <= (result || value))
        result = value;
    });
    return result;
  },
	/*
	���յ������ķ��ؽ������ö��Ԫ�ط�Ϊ��������trues��falses������trues��������������true��ö��Ԫ�أ�falses���෴��
	*/
  partition: function(iterator) {
    var trues = [], falses = [];
    this.each(function(value, index) {
      ((iterator || Prototype.K)(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },
	/*
	��������ö��Ԫ�ص�property����
	*/
  pluck: function(property) {
    var results = [];
    this.each(function(value, index) {
      results.push(value[property]);
    });
    return results;
  },
 
	/*
	�������е�����ִ�н��Ϊfalse��ö��Ԫ��
	*/
  reject: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index))
        results.push(value);
    });
    return results;
  },
	/*
	�ṹ���ӵ�һ�������������Ǹ��ݵ�����iterator�Ľ����ö��Ԫ�ؽ�������ʹiteratorִ�н��С��Ԫ������ǰ�档
	��Ҫ�������������ĵ��ã�
	1��collect���������ص�ÿ������Ԫ�ذ�����ֵ�͵��������и�ֵ�Ľ������{value:value,criteria:iterator(value,index)}�õ�
	2����collect���ص�����ִ��sort��������ʱ����������õĶ��󣬲�����һ��ί�к���������ָ������������׼�ǶԵ��������ص�ֵ����С����ǰ��
	3����sort�Ľ��ִ��pluck������������value���Ե�ֵ����������Ƿ��ص�ö�ٶ����е�ԭ��ֵ��ֻ�Ǹ��ݵ�����iterator�Ľ������ЩԪ�ؽ�������
	*/
  sortBy: function(iterator) {
    return this.collect(function(value, index) {
      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },
 
	/*
	��ö�ٶ���ת��Ϊ���飬ʹ����collect������Prototype.K�������������ظ�����
	*/
  toArray: function() {
    return this.collect(Prototype.K);
  },
	/*
	ѹ��������ʵ�ָ��ӣ������в������-_-��
	���յĲ�����Ҫ�ǿ�ö�ٶ��󣬿����ж�����������һ�������ǵ���������ѡ��
	�����ǽ�����Ͳ�����ɵĶ�ά���н������жԻ������г���������ݣ��򲹳�ȱ�ٵ�����(��undefined)���л���������ɵ�������Ԫ�صĸ�������������������������ĸ�����1��
	ÿ����������ĵ�һ��Ԫ��˳����ɵ�һ�У��ڶ���Ԫ��˳����ɵڶ��У��������ơ�ֱ���������е�Ԫ������Ϊֹ��
	�����������þ��Ƕ�ת�����ÿһ�н���һ�����㡣
	���磺
	var arr1=[1,2,3];
	var arr2=[4,5,6];
	var arr3=[7,8,9];
	var arr=arr1.zip(arr2,arr3);
 
	//ʹ�õ�������������inspect������������﷨��ʾ�������ַ����������н���
	arr.each(function(s){
			document.write(s.inspect());
			document.write("<br/>");
		}
	);
	�õ��Ľ��Ϊ��
	[1, 4, 7]
	[2, 5, 8]
	[3, 6, 9]
 
	�����arr1=[1,2]���������䣬��ִ�н��Ϊ��
	[1, 4, 7]
	[2, 5, 8]
 
	*/
  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (typeof args.last() == 'function')
      iterator = args.pop();
	//������ö�ٶ�����Ϊһ��Ԫ�أ��������Ҳ�ǿ�ö�ٵģ����һ�����飬����ö�ٶ���ת��Ϊ���飨ͨ��$A��������
    var collections = [this].concat(args).map($A);
 
    return this.map(function(value, index) {
      iterator(value = collections.pluck(index));
      return value;
    });
  },
	/*
	��ʵ��������һ����ʵ�ֵĳ��󷽷�����Array�������ж�����е��ض���
	���Խ�thisת��Ϊ���飨toArray()�����ٵ���inspect��
	���ڷ�������ʽ��ö�ٶ���������'#<Enumerable:....>'��������ʽ
	*/
  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }
}
//��Enumerable�����һЩ�������˿�������
Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray
});
 
/*
��һ������ת��Ϊ���顣
�����ַ�����ֱ�ӱ�Ϊ�ַ����飬����$A("abc")���õ���["a","b","c"]
���򼯺϶����Ϊ���飬���������������Ĳ�������arguments��<select>��options���ϣ�
<form>��elements���ϵȵȣ�һ���ڵ�������ӽ��childNodes�ȵȡ�
*/
var $A = Array.from = function(iterable) {
if (!iterable) return [];
if (iterable.toArray) {
return iterable.toArray();
} else {
var results = [];
for (var i = 0; i < iterable.length; i++)
results.push(iterable[i]);
return results;
}
}
/*
������̳���Enumarable���󣨻��ࣩ
*/
Object.extend(Array.prototype, Enumerable);
/*
��һ�����ӣ�prototype��һ��˽�еĳ�Ա������Ա�����»��߿�ͷ�������_reverse��ž�����һ��˵���Ե����ã�������Ϊ���󷽷�ʹ�á�
*/
Array.prototype._reverse = Array.prototype.reverse;
 
/*
Ϊ����������һЩ��ݷ���
*/
Object.extend(Array.prototype, {
	/*
	������������Դ��Ruby�еĵ������÷�
	_each���������þ��ǽ������ÿ��Ԫ����Ϊiterator�����Ĳ�������ִ��iterator����������������飺var arr=[1,2,3,4,5,6];
	���Ҫ��ʾ���е�ÿ��Ԫ�أ�ͨ����������
	for(var i=0;i<arr.length;i++){
		alert(arr[i]);
	}
	��ʹ�ô˷�����
	arr._each(function(s){alert(s)});
	��ˣ���Ruby�Ĵ����к��ٳ���ѭ�����������ʹ��JavaScriptͬ��Ҳ�ܹ�ʵ�֡�
	*/
  _each: function(iterator) {
    for (var i = 0; i < this.length; i++)
      iterator(this[i]);
  },
 
	//�������
  clear: function() {
    this.length = 0;
    return this;
  },
	//��ȡ��һ��Ԫ�ص�ֵ
  first: function() {
    return this[0];
  },
	//��ȡ���һ��Ԫ�ص�ֵ
  last: function() {
    return this[this.length - 1];
  },
 
	/*
	����ɾ��һ�������е�δ����ֵ��nullֵ
	�����select�Ǵ�Emurable�м̳еķ�������select����findAll�����ı���
	*/
  compact: function() {
    return this.select(function(value) {
      return value != undefined || value != null;
    });
  },
	/*
	��һ��ö�ٶ����е���������Ԫ��ȫ��չ������󷵻�һ�����飬��һ���ݹ�Ĺ���
	*/
  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(value.constructor == Array ?
        value.flatten() : [value]);
    });
  },
	/*
	��������ɾ������ָ����Ԫ�أ�����ɾ����Ľ��
	*/
  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },
	/*
	����һ��Ԫ���������е�����
	*/
  indexOf: function(object) {
    for (var i = 0; i < this.length; i++)
      if (this[i] == object) return i;
    return -1;
  },
	/*
	������Ԫ��˳����ת��inline����ȷ��������
	*/
  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },
	/*
	ȡ������ĵ�һ��Ԫ�ز�����
	*/
  shift: function() {
    var result = this[0];
    for (var i = 0; i < this.length - 1; i++)
      this[i] = this[i + 1];
    this.length--;
    return result;
  },
	/*
	����������ַ�����ʾ
	*/
  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }
});
/*
�����ϣ�����ͨ�ò���
*/
var Hash = {
	/*
	ʵ�ֿ�ö�ٽӿڡ�
	��hash�����е�ÿ��Ԫ�ؽ��е�������������������Ϊ����һ���������������ĵ�һ��Ԫ����key���ڶ���Ԫ����value
	ͬʱ�������������������������key��value���ֱ��ʾ����ֵ��
	*/
  _each: function(iterator) {
    for (key in this) {
      var value = this[key];
      if (typeof value == 'function') continue;//��������
      var pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  },
	/*
	�������еļ���ɵ�����
	*/
  keys: function() {
    return this.pluck('key');
  },
	/*
	�������е�ֵ��ɵ�����
	*/
  values: function() {
    return this.pluck('value');
  },
	/*
	������hash����ϲ����������ͬ�����ò�������Ӧ����Ӧ��ֵ���ǵ����ߵġ�
	*/
  merge: function(hash) {
    return $H(hash).inject($H(this), function(mergedHash, pair) {
      mergedHash[pair.key] = pair.value;
      return mergedHash;
    });
  },
	/*
	��hash����ת��Ϊ��ѯ�ַ�����ʾ����ʽ
	*/
  toQueryString: function() {
    return this.map(function(pair) {
      return pair.map(encodeURIComponent).join('=');
    }).join('&');
  },
	/*
	��ȡhash������ַ�����ʾ
	*/
  inspect: function() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }
}
 
/*
��һ������ת��Ϊ��ϣ���󣬶����������������������Ϊkey��ֵ��Ϊvalue
ͬʱhash����Ҳ��һ����ö�ٶ���
*/
function $H(object) {
/*
object || {}ʹ�ò���Ϊ��ʱҲ�ܹ�����һ��hash����
*/
var hash = Object.extend({}, object || {});
Object.extend(hash, Enumerable);
Object.extend(hash, Hash);
return hash;
}
 
/*
��һ��ʵ��Enumerable�ӿڵĶ���
��������࣬�����ϾͿ�����ȫ����ʹ��forѭ���ˣ�һ�����ӣ�����1��100�ĺͣ�
��ͳд����
var s=0;
for(var i=0;i<=100;i++){
	s+=i;
}
document.write(s);
 
ʹ��ObjectRange��
var s=$R(0,100,false).inject(0,function(s,i){
	return s+i;
});
document.write(s);
*/
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
	/*
	���캯����start��ʾ��ʼ��λ�ã�end��ʾ������λ�ã�exclusive��ʾ�Ƿ��ų����һ������λ��
	exclusive��trueʱ��Ӧ�ڣ�
	for(var i=start;i<end;i++){
		//���
	}
	exclusive=falseʱ��Ӧ�ڣ�
	for(var i=start;i<=end;i++){
		//���
	}
	*/
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },
	/*
	ʵ��ö�ٽӿڵ�_each����
	�൱�ڣ�
	for(var i=start;i<end;i++){
		iterator(i);
	}
	*/
  _each: function(iterator) {
    var value = this.start;
    do {
      iterator(value);
      value = value.succ();
    } while (this.include(value));
  },
	/*
	�ж��Ƿ����ָ��������
	*/
  include: function(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }
});
/*
��һ���������ӣ���������ObjectRange����
*/
var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}
 
/*
��װXMLHttpRequest����ز���
*/
var Ajax = {
//��������ݵĻ�ȡXMLHttpRequest����ĺ���
getTransport: function() {
return Try.these(
function() {return new ActiveXObject('Msxml2.XMLHTTP')},
function() {return new ActiveXObject('Microsoft.XMLHTTP')},
function() {return new XMLHttpRequest()}
) || false;
},
//��ǰ�����������Ŀ
activeRequestCount: 0
}
 
/*
Ajax�ķ���ֵ
*/
Ajax.Responders = {
  responders: [],
 
	//ʵ��ö�ٽӿڵ�_each����
  _each: function(iterator) {
    this.responders._each(iterator);
  },
 
  register: function(responderToAdd) {
    if (!this.include(responderToAdd))
      this.responders.push(responderToAdd);
  },
 
  unregister: function(responderToRemove) {
    this.responders = this.responders.without(responderToRemove);
  },
 
  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (responder[callback] && typeof responder[callback] == 'function') {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) {}
      }
    });
  }
};
/*
��Ajax.Responders��ö�ٵ���
*/
Object.extend(Ajax.Responders, Enumerable);
 
Ajax.Responders.register({
onCreate: function() {
Ajax.activeRequestCount++;
},
 
onComplete: function() {
Ajax.activeRequestCount--;
}
});
 
//����Ajax�Ļ���
Ajax.Base = function() {};
Ajax.Base.prototype = {
	/*
	����XMLHttp���õĲ������ṩ��Ĭ��ֵ��method:'post',�첽���޲���
	*/
  setOptions: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      parameters:   ''
    }
    Object.extend(this.options, options || {});
  },
	/*
	�ж������Ƿ�ɹ�
	*/
  responseIsSuccess: function() {
    return this.transport.status == undefined
        || this.transport.status == 0
        || (this.transport.status >= 200 && this.transport.status < 300);
  },
	/*
	�ж������Ƿ�ʧ��
	*/
  responseIsFailure: function() {
    return !this.responseIsSuccess();
  }
}
 
//����һ��Ajax������
Ajax.Request = Class.create();
Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];
 
Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(url, options) {
    this.transport = Ajax.getTransport();
    this.setOptions(options);
    this.request(url);
  },
 
  request: function(url) {
    var parameters = this.options.parameters || '';
    if (parameters.length > 0) parameters += '&_=';
 
    try {
      this.url = url;
      if (this.options.method == 'get' && parameters.length > 0)
        this.url += (this.url.match(/\?/) ? '&' : '?') + parameters;
 
      Ajax.Responders.dispatch('onCreate', this, this.transport);
 
      this.transport.open(this.options.method, this.url,
        this.options.asynchronous);
 
      if (this.options.asynchronous) {
        this.transport.onreadystatechange = this.onStateChange.bind(this);
        setTimeout((function() {this.respondToReadyState(1)}).bind(this), 10);
      }
 
      this.setRequestHeaders();
 
      var body = this.options.postBody ? this.options.postBody : parameters;
      this.transport.send(this.options.method == 'post' ? body : null);
 
    } catch (e) {
      this.dispatchException(e);
    }
  },
 
  setRequestHeaders: function() {
    var requestHeaders =
      ['X-Requested-With', 'XMLHttpRequest',
       'X-Prototype-Version', Prototype.Version];
 
    if (this.options.method == 'post') {
      requestHeaders.push('Content-type',
        'application/x-www-form-urlencoded');
 
      /* Force "Connection: close" for Mozilla browsers to work around
       * a bug where XMLHttpReqeuest sends an incorrect Content-length
       * header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType)
        requestHeaders.push('Connection', 'close');
    }
 
    if (this.options.requestHeaders)
      requestHeaders.push.apply(requestHeaders, this.options.requestHeaders);
 
    for (var i = 0; i < requestHeaders.length; i += 2)
      this.transport.setRequestHeader(requestHeaders[i], requestHeaders[i+1]);
  },
 
  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState != 1)
      this.respondToReadyState(this.transport.readyState);
  },
 
  header: function(name) {
    try {
      return this.transport.getResponseHeader(name);
    } catch (e) {}
  },
 
  evalJSON: function() {
    try {
      return eval(this.header('X-JSON'));
    } catch (e) {}
  },
 
  evalResponse: function() {
    try {
      return eval(this.transport.responseText);
    } catch (e) {
      this.dispatchException(e);
    }
  },
 
  respondToReadyState: function(readyState) {
    var event = Ajax.Request.Events[readyState];
    var transport = this.transport, json = this.evalJSON();
 
    if (event == 'Complete') {
      try {
        (this.options['on' + this.transport.status]
         || this.options['on' + (this.responseIsSuccess() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(transport, json);
      } catch (e) {
        this.dispatchException(e);
      }
 
      if ((this.header('Content-type') || '').match(/^text\/javascript/i))
        this.evalResponse();
    }
 
    try {
      (this.options['on' + event] || Prototype.emptyFunction)(transport, json);
      Ajax.Responders.dispatch('on' + event, this, transport, json);
    } catch (e) {
      this.dispatchException(e);
    }
 
    /* Avoid memory leak in MSIE: clean up the oncomplete event handler */
    if (event == 'Complete')
      this.transport.onreadystatechange = Prototype.emptyFunction;
  },
 
  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});
 
Ajax.Updater = Class.create();
 
Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function(container, url, options) {
    this.containers = {
      success: container.success ? $(container.success) : $(container),
      failure: container.failure ? $(container.failure) :
        (container.success ? null : $(container))
    }
 
    this.transport = Ajax.getTransport();
    this.setOptions(options);
 
    var onComplete = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function(transport, object) {
      this.updateContent();
      onComplete(transport, object);
    }).bind(this);
 
    this.request(url);
  },
 
  updateContent: function() {
    var receiver = this.responseIsSuccess() ?
      this.containers.success : this.containers.failure;
    var response = this.transport.responseText;
 
    if (!this.options.evalScripts)
      response = response.stripScripts();
 
    if (receiver) {
      if (this.options.insertion) {
        new this.options.insertion(receiver, response);
      } else {
        Element.update(receiver, response);
      }
    }
 
    if (this.responseIsSuccess()) {
      if (this.onComplete)
        setTimeout(this.onComplete.bind(this), 10);
    }
  }
});
 
Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(container, url, options) {
    this.setOptions(options);
    this.onComplete = this.options.onComplete;
 
    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);
 
    this.updater = {};
    this.container = container;
    this.url = url;
 
    this.start();
  },
 
  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },
 
  stop: function() {
    this.updater.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },
 
  updateComplete: function(request) {
    if (this.options.decay) {
      this.decay = (request.responseText == this.lastText ?
        this.decay * this.options.decay : 1);
 
      this.lastText = request.responseText;
    }
    this.timer = setTimeout(this.onTimerEvent.bind(this),
      this.decay * this.frequency * 1000);
  },
 
  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});
document.getElementsByClassName = function(className, parentElement) {
  var children = ($(parentElement) || document.body).getElementsByTagName('*');
  return $A(children).inject([], function(elements, child) {
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
      elements.push(child);
    return elements;
  });
}
 
/*--------------------------------------------------------------------------*/
//����һЩHtml�ڵ�ͨ�õĲ���
if (!window.Element) {
  var Element = new Object();
}
 
 
Object.extend(Element, {
	/*
	�жϽڵ��Ƿ�ɼ�
	*/
  visible: function(element) {
    return $(element).style.display != 'none';
  },
	/*
	�л��ڵ�Ŀɼ�״̬
	*/
  toggle: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      Element[Element.visible(element) ? 'hide' : 'show'](element);
    }
  },
	/*
	���ز�����ָ���Ľڵ�
	*/
  hide: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = 'none';
    }
  },
	/*
	��ʾ������ָ���Ľڵ�
	*/
  show: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = '';
    }
  },
	/*
	ɾ��һ���ڵ�
	*/
  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
  },
	/*
	��ָ��html���element��ʾ�Ľڵ�
	setTimeout�Ǽ��߼��ɵ��÷������˾�̾��
	update����֮���Ի�ȡ����element.innerHTML=html���÷�����Ҫ��Ϊ��ʵ����������ļ����ԣ�
	��1������IE�������innerHTML��ֵ���ַ����к��нű���ǣ��ű��Ǳ����Եģ��������ã���firefox���ִ�нű���
	��2��setTimeoutʹ�ÿ����ں����ڿ���ͨ��eval����ȫ�ֺ�������������setTimeout��Ĭ�Ͽռ����ȫ�ֿռ�����ģ�����window����ķ�����������ȫ�ֱ�����ȫ�ֺ���ʵ���϶���window��������Ժͷ�������
	*/
  update: function(element, html) {
    $(element).innerHTML = html.stripScripts();
    setTimeout(function() {html.evalScripts()}, 10);
  },
	//��ȡ�ڵ�ĸ߶�
  getHeight: function(element) {
    element = $(element);
    return element.offsetHeight;
  },
	//��ȡһ��Ԫ�ص�class������һ�����飬���������е�class���ƣ�ClassNames����ʵ��
  classNames: function(element) {
    return new Element.ClassNames(element);
  },
	/*�ж�һ��Ԫ���Ƿ����ָ����classֵ*/
  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).include(className);
  },
	//Ϊһ���ڵ����class����
  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).add(className);
  },
	//��һ���ڵ��Ƴ�һ��class����
  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).remove(className);
  },
 
  // removes whitespace-only text node children
  //ɾ���հ��ı��ڵ㣬ʹ�ô˷����ܹ�ʹ��childNodes���Զ�������������ݣ�����ie����Ϊ�հ��ı��ڵ����ӽڵ㡣��firefox�����Ϊ��Щ�ڵ����ӽڵ㡣
  cleanWhitespace: function(element) {
    element = $(element);
    for (var i = 0; i < element.childNodes.length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        Element.remove(node);
    }
  },
	//�ж�һ���ڵ��Ƿ�Ϊ�գ����ȫ�ǿհ����ݣ�Ҳ��Ϊ��
  empty: function(element) {
    return $(element).innerHTML.match(/^\s*$/);
  },
	/*
	��������������ָ���ڵ��λ��
	*/
  scrollTo: function(element) {
    element = $(element);
    var x = element.x ? element.x : element.offsetLeft,
        y = element.y ? element.y : element.offsetTop;
    window.scrollTo(x, y);
  },
	/*
	�õ�ָ���ڵ��ָ����ʽ�ľ���ֵ��
	�����Ի�ü̳еõ�����ʽ��
	*/
  getStyle: function(element, style) {
    element = $(element);
    var value = element.style[style.camelize()];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css.getPropertyValue(style) : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[style.camelize()];
      }
    }
 
    if (window.opera && ['left', 'top', 'right', 'bottom'].include(style))
      if (Element.getStyle(element, 'position') == 'static') value = 'auto';
 
    return value == 'auto' ? null : value;
  },
	/*
	����ָ���ڵ����ʽ�����������style����ͬʱָ���������
	���磺
	Element.setStyle($("someElement"),{color:'#ff0000',background-color:'#000000'});
	�ͽ�ָ���ڵ����ʽ����Ϊ���ֺڵ�
	*/
  setStyle: function(element, style) {
    element = $(element);
    for (name in style)
      element.style[name.camelize()] = style[name];
  },
 
	/*
	���ؽڵ�Ŀ�Ⱥ͸߶ȣ���{width:xx,height:xx}��ʽ���ء�
	�÷���ʹ�����۽ڵ�ɼ���񣬶��ܹ���ȡ����ʾʱ�Ĵ�С��
	*/
  getDimensions: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'display') != 'none')
      return {width: element.offsetWidth, height: element.offsetHeight};
 
    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = '';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = 'none';
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },
	/*
	ʹ��Ԫ����Զ�λ
	*/
  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
  },
	/*
	ȡ���ڵ����Զ�λ��
	*/
  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
  },
	/*
	
	*/
  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return;
    element._overflow = element.style.overflow;
    if ((Element.getStyle(element, 'overflow') || 'visible') != 'hidden')
      element.style.overflow = 'hidden';
  },
 
  undoClipping: function(element) {
    element = $(element);
    if (element._overflow) return;
    element.style.overflow = element._overflow;
    element._overflow = undefined;
  }
});
 
var Toggle = new Object();
Toggle.display = Element.toggle;
 
/*--------------------------------------------------------------------------*/
 
Abstract.Insertion = function(adjacency) {
  this.adjacency = adjacency;
}
 
Abstract.Insertion.prototype = {
  initialize: function(element, content) {
    this.element = $(element);
    this.content = content.stripScripts();
 
    if (this.adjacency && this.element.insertAdjacentHTML) {
      try {
        this.element.insertAdjacentHTML(this.adjacency, this.content);
      } catch (e) {
        if (this.element.tagName.toLowerCase() == 'tbody') {
          this.insertContent(this.contentFromAnonymousTable());
        } else {
          throw e;
        }
      }
    } else {
      this.range = this.element.ownerDocument.createRange();
      if (this.initializeRange) this.initializeRange();
      this.insertContent([this.range.createContextualFragment(this.content)]);
    }
 
    setTimeout(function() {content.evalScripts()}, 10);
  },
 
  contentFromAnonymousTable: function() {
    var div = document.createElement('div');
    div.innerHTML = '<table><tbody>' + this.content + '</tbody></table>';
    return $A(div.childNodes[0].childNodes[0].childNodes);
  }
}
 
var Insertion = new Object();
 
Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion('beforeBegin'), {
  initializeRange: function() {
    this.range.setStartBefore(this.element);
  },
 
  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment, this.element);
    }).bind(this));
  }
});
 
Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion('afterBegin'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(true);
  },
 
  insertContent: function(fragments) {
    fragments.reverse(false).each((function(fragment) {
      this.element.insertBefore(fragment, this.element.firstChild);
    }).bind(this));
  }
});
 
Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion('beforeEnd'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(this.element);
  },
 
  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.appendChild(fragment);
    }).bind(this));
  }
});
 
Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion('afterEnd'), {
  initializeRange: function() {
    this.range.setStartAfter(this.element);
  },
 
  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment,
        this.element.nextSibling);
    }).bind(this));
  }
});
 
/*--------------------------------------------------------------------------*/
 
Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },
 
  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },
 
  set: function(className) {
    this.element.className = className;
  },
 
  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set(this.toArray().concat(classNameToAdd).join(' '));
  },
 
  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set(this.select(function(className) {
      return className != classNameToRemove;
    }).join(' '));
  },
 
  toString: function() {
    return this.toArray().join(' ');
  }
}
 
Object.extend(Element.ClassNames.prototype, Enumerable);
 
 
 
 
var Field = {
  clear: function() {
    for (var i = 0; i < arguments.length; i++)
      $(arguments[i]).value = '';
  },
 
  focus: function(element) {
    $(element).focus();
  },
 
  present: function() {
    for (var i = 0; i < arguments.length; i++)
      if ($(arguments[i]).value == '') return false;
    return true;
  },
 
  select: function(element) {
    $(element).select();
  },
 
  activate: function(element) {
    element = $(element);
    element.focus();
    if (element.select)
      element.select();
  }
}
 
/*--------------------------------------------------------------------------*/
 
var Form = {
  serialize: function(form) {
    var elements = Form.getElements($(form));
    var queryComponents = new Array();
 
    for (var i = 0; i < elements.length; i++) {
      var queryComponent = Form.Element.serialize(elements[i]);
      if (queryComponent)
        queryComponents.push(queryComponent);
    }
 
    return queryComponents.join('&');
  },
 
  getElements: function(form) {
    form = $(form);
    var elements = new Array();
 
    for (tagName in Form.Element.Serializers) {
      var tagElements = form.getElementsByTagName(tagName);
      for (var j = 0; j < tagElements.length; j++)
        elements.push(tagElements[j]);
    }
    return elements;
  },
 
  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');
 
    if (!typeName && !name)
      return inputs;
 
    var matchingInputs = new Array();
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) ||
          (name && input.name != name))
        continue;
      matchingInputs.push(input);
    }
 
    return matchingInputs;
  },
 
  disable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.blur();
      element.disabled = 'true';
    }
  },
 
  enable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.disabled = '';
    }
  },
 
  findFirstElement: function(form) {
    return Form.getElements(form).find(function(element) {
      return element.type != 'hidden' && !element.disabled &&
        ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },
 
  focusFirstElement: function(form) {
    Field.activate(Form.findFirstElement(form));
  },
 
  reset: function(form) {
    $(form).reset();
  }
}
 
Form.Element = {
  serialize: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);
 
    if (parameter) {
      var key = encodeURIComponent(parameter[0]);
      if (key.length == 0) return;
 
      if (parameter[1].constructor != Array)
        parameter[1] = [parameter[1]];
 
      return parameter[1].map(function(value) {
        return key + '=' + encodeURIComponent(value);
      }).join('&');
    }
  },
 
  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);
 
    if (parameter)
      return parameter[1];
  }
}
 
Form.Element.Serializers = {
	//��input������л�
  input: function(element) {
    switch (element.type.toLowerCase()) {
      case 'submit':
      case 'hidden':
      case 'password':
      case 'text':
        return Form.Element.Serializers.textarea(element);
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element);
    }
    return false;
  },
	//�Ե�ѡ��͸�ѡ�����л�
  inputSelector: function(element) {
    if (element.checked)
      return [element.name, element.value];
  },
	//���ı������л�
  textarea: function(element) {
    return [element.name, element.value];
  },
	//�������б�����л�
  select: function(element) {
    return Form.Element.Serializers[element.type == 'select-one' ?
      'selectOne' : 'selectMany'](element);
  },
	//�Ե�ѡ�����б�����л�
  selectOne: function(element) {
    var value = '', opt, index = element.selectedIndex;
    if (index >= 0) {
      opt = element.options[index];
      value = opt.value;
      if (!value && !('value' in opt))
        value = opt.text;
    }
    return [element.name, value];
  },
	//�Զ�ѡ�����б�����л�
  selectMany: function(element) {
    var value = new Array();
    for (var i = 0; i < element.length; i++) {
      var opt = element.options[i];
      if (opt.selected) {
        var optValue = opt.value;
        if (!optValue && !('value' in opt))
          optValue = opt.text;
        value.push(optValue);
      }
    }
    return [element.name, value];
  }
}
 
/*--------------------------------------------------------------------------*/
 
var $F = Form.Element.getValue;
 
/*--------------------------------------------------------------------------*/
 
Abstract.TimedObserver = function() {}
Abstract.TimedObserver.prototype = {
  initialize: function(element, frequency, callback) {
    this.frequency = frequency;
    this.element   = $(element);
    this.callback  = callback;
 
    this.lastValue = this.getValue();
    this.registerCallback();
  },
 
  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },
 
  onTimerEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
}
 
Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});
 
Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
 
/*--------------------------------------------------------------------------*/
 
Abstract.EventObserver = function() {}
Abstract.EventObserver.prototype = {
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;
 
    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },
 
  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },
 
  registerFormCallbacks: function() {
    var elements = Form.getElements(this.element);
    for (var i = 0; i < elements.length; i++)
      this.registerCallback(elements[i]);
  },
 
  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        case 'password':
        case 'text':
        case 'textarea':
        case 'select-one':
        case 'select-multiple':
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
}
 
Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});
 
Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) {
  var Event = new Object();
}
 
Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,
 
  element: function(event) {
    return event.target || event.srcElement;
  },
 
  isLeftClick: function(event) {
    return (((event.which) && (event.which == 1)) ||
            ((event.button) && (event.button == 1)));
  },
 
  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },
 
  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },
 
  stop: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },
 
  // find the first node with the given tagName, starting from the
  // node the event was triggered on; traverses the DOM upwards
  findElement: function(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName ||
        (element.tagName.toUpperCase() != tagName.toUpperCase())))
      element = element.parentNode;
    return element;
  },
 
  observers: false,
 
  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
  },
 
  unloadCache: function() {
    if (!Event.observers) return;
    for (var i = 0; i < Event.observers.length; i++) {
      Event.stopObserving.apply(this, Event.observers[i]);
      Event.observers[i][0] = null;
    }
    Event.observers = false;
  },
 
  observe: function(element, name, observer, useCapture) {
    var element = $(element);
    useCapture = useCapture || false;
 
    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.attachEvent))
      name = 'keydown';
 
    this._observeAndCache(element, name, observer, useCapture);
  },
 
  stopObserving: function(element, name, observer, useCapture) {
    var element = $(element);
    useCapture = useCapture || false;
 
    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.detachEvent))
      name = 'keydown';
 
    if (element.removeEventListener) {
      element.removeEventListener(name, observer, useCapture);
    } else if (element.detachEvent) {
      element.detachEvent('on' + name, observer);
    }
  }
});
 
/* prevent memory leaks in IE */
Event.observe(window, 'unload', Event.unloadCache, false);
var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,
 
  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },
 
  realOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return [valueL, valueT];
  },
 
  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  },
 
  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        p = Element.getStyle(element, 'position');
        if (p == 'relative' || p == 'absolute') break;
      }
    } while (element);
    return [valueL, valueT];
  },
 
  offsetParent: function(element) {
    if (element.offsetParent) return element.offsetParent;
    if (element == document.body) return element;
 
    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return element;
 
    return document.body;
  },
 
  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = this.cumulativeOffset(element);
 
    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },
 
  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = this.realOffset(element);
 
    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = this.cumulativeOffset(element);
 
    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },
 
  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },
 
  clone: function(source, target) {
    source = $(source);
    target = $(target);
    target.style.position = 'absolute';
    var offsets = this.cumulativeOffset(source);
    target.style.top    = offsets[1] + 'px';
    target.style.left   = offsets[0] + 'px';
    target.style.width  = source.offsetWidth + 'px';
    target.style.height = source.offsetHeight + 'px';
  },
 
  page: function(forElement) {
    var valueT = 0, valueL = 0;
 
    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
 
      // Safari fix
      if (element.offsetParent==document.body)
        if (Element.getStyle(element,'position')=='absolute') break;
 
    } while (element = element.offsetParent);
 
    element = forElement;
    do {
      valueT -= element.scrollTop  || 0;
      valueL -= element.scrollLeft || 0;
    } while (element = element.parentNode);
 
    return [valueL, valueT];
  },
 
  clone: function(source, target) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || {})
 
    // find page position of source
    source = $(source);
    var p = Position.page(source);
 
    // find coordinate system to use
    target = $(target);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(target,'position') == 'absolute') {
      parent = Position.offsetParent(target);
      delta = Position.page(parent);
    }
 
    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }
 
    // set position
    if(options.setLeft)   target.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if(options.setTop)    target.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if(options.setWidth)  target.style.width = source.offsetWidth + 'px';
    if(options.setHeight) target.style.height = source.offsetHeight + 'px';
  },
 
  absolutize: function(element) {
    element = $(element);
    if (element.style.position == 'absolute') return;
    Position.prepare();
 
    var offsets = Position.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;
 
    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;
 
    element.style.position = 'absolute';
    element.style.top    = top + 'px';;
    element.style.left   = left + 'px';;
    element.style.width  = width + 'px';;
    element.style.height = height + 'px';;
  },
 
  relativize: function(element) {
    element = $(element);
    if (element.style.position == 'relative') return;
    Position.prepare();
 
    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);
 
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
  }
}
 
// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;
 
      element = element.offsetParent;
    } while (element);
 
    return [valueL, valueT];
  }
}


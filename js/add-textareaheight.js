 window.onload = function () {
            var text = document.getElementById("text"); //用户看到的文本框
            var shadow = document.getElementById("shadow"); //隐藏的文本框

            text.oninput = //非IE的
            text.onpropertychange = //IE的
            onchange;
            
            function onchange() {
                shadow.value = text.value;
                setHeight();
                setTimeout(setHeight, 0); //针对IE 6/7/8的延迟, 否则有时会有一个字符的出入
                function setHeight() { text.style.height = shadow.scrollHeight + "px"; }
            }
        };
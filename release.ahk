^x::
ExitApp

^z::
FileSelectFile, file

Gui, New,+Resize +MinSize220x60,select coding form
Gui, Add, Text,, 选择或输入文件编码格式
Gui, Add, ComboBox, vEcodingChoice, ASCII|UTF-8|UTF-16|UTF-8-RAW|UTF-16-RAW
Gui, Add, Checkbox, vMyCheckbox1, 忽略tab符
Gui, Add, Checkbox, vMyCheckbox2, 去除换行符
Gui, Add, Checkbox, vMyCheckbox3, 自动退格
Gui, Add, Button, w50 h20 y23 default , OK
GuiControl, Text, EcodingChoice, ASCII

if file =  
    Gui, Destroy
else
    Gui, Show
return

GuiClose:
Gui, Destroy
return

ButtonOK:
GuiEscape:
Gui, Submit

MsgBox, The coding form is: %EcodingChoice%
regx = ASCII
IfInString, EcodingChoice, %regx%
{
    EcodingChoice = CP0
}
FileEncoding, %EcodingChoice%


FileRead, text, %file%
SwitchIME(0x04090409)
SetKeyDelay, 80
if MyCheckbox1 = 1
    StringReplace, text, text, `t, , All
if MyCheckbox2 = 1
    StringReplace, text, text, `r, , All
if MyCheckbox3 = 1
{
    StringReplace, text, text, {, lhkh, All
    StringReplace, text, text, }, rhkh, All
    
    StringReplace, text, text, #, {#}, All
    StringReplace, text, text, !, {!}, All
    StringReplace, text, text, ^, {^}, All
    StringReplace, text, text, +, {+}, All
    StringReplace, text, text, <, {<}, All
    StringReplace, text, text, >, {>}, All
    StringReplace, text, text, *, {*}, All
    StringReplace, text, text, $, {$}, All
    StringReplace, text, text, &, {&}, All
    StringReplace, text, text, lhkh, {{}, All
    StringReplace, text, text, rhkh,  {bs}{}}, All
    
    SendCode(text)
}
else
    SendCode(text)
return

SwitchIME(dwLayout){
    HKL:=DllCall("LoadKeyboardLayout", Str, dwLayout, UInt, 1)
    ControlGetFocus,ctl,A
    SendMessage,0x50,0,HKL,%ctl%,A
}

SendCode(text){

Loop, parse, text, `r`n,
{
    
    DeleteThisLine()
    SendRaw,%A_LoopField%
    
}

}

DeleteThisLine(){
    Send {Enter}
    Sleep, 1000
    Send {Tab}
    Send +{Home}{Backspace}
    Sleep, 100
}


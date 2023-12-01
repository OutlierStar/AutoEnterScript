global over:=1


Esc::
over:=!over
ExitApp

^z::

FileSelectFile, file

Gui, New,+Resize +MinSize220x60,select FileEncoding
Gui, Add, Text,, 选择或输入文件编码格式
Gui, Add, ComboBox, vEcodingChoice, ASCII|UTF-8|UTF-16|UTF-8-RAW|UTF-16-RAW
Gui, Add, Text,, 行间隔时间
Gui, Add, Edit
Gui, Add, UpDown, vMyUpDown Range1-1000, 50
Gui, Add, Text,, 字间隔时间
Gui, Add, Edit
Gui, Add, UpDown, vMyUpDown2 Range1-1000, 10

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

SetKeyDelay, MyUpDown2

StringReplace, text, text, `r, , All
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
    if (!over)
        break
    DeleteThisLine()
    SendRaw,%A_LoopField%
    
}

}

DeleteThisLine(){
    Send {Enter}
    Sleep, MyUpDown
    Send {Tab}
    Send +{Home}{Backspace}
    ;Sleep, 10
}

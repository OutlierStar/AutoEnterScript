#Requires AutoHotkey v2.0

global over:=true


Esc::{
    over:=false
ExitApp
}


^z::{
;classNN := ControlGetClassNN(ControlGetFocus("A"))
MouseGetPos , , &id, &control,2
ToolTip "ahk_id " id "`nahk_class " WinGetClass(id) "`n" WinGetTitle(id) "`nControl: " control
SetTimer () => ToolTip(), -10000
ControlSendText  "123",id
file := FileSelect(3, , "Open a file")

MyGui := Gui(,"select FileEncoding")
MyGui.Opt("+Resize +MinSize240x80")
MyGui.Add("Text",, "选择或输入文件编码格式")
MyGui.Add("ComboBox", "vEcodingChoice", ["CP0","UTF-8","UTF-16","UTF-8-RAW","UTF-16-RAW"])
MyGui.Add("Text",, "输入间隔延时")
MyGui.Add("Edit")
MyGui.Add("UpDown", "vMyUpDown Range1-10000", 50)

MyBtn := MyGui.Add("Button", "Default w50 h20 y23", "OK")
MyBtn.OnEvent("Click", MyBtn_Click)

if file =  ""
    MyGui.Destroy()
else
    MyGui.Show()



MyBtn_Click(*){

    obj := MyGui.Submit()
    MsgBox "The coding form is: " obj.EcodingChoice
; FileEncoding EcodingChoice
text := FileRead(file,obj.EcodingChoice)


switchIMEbyID(134481924)
SetKeyDelay obj.MyUpDown
SendCode(text,obj.MyUpDown)
return
}
switchIMEbyID(IMEID){
    winTitle:=WinGetTitle("A")
    PostMessage(0x50, 0, IMEID,, WinTitle )
}

SendCode(text,rate){

Loop parse, text, "`n" , "`r"
{
    if (!over)
        break
    DeleteThisLine(rate)
    ControlSendText A_LoopField,id
    
}

}


DeleteThisLine(rate){
    ControlSend "{Enter}",id
    ControlSend "{Tab}",id
    ControlSend "{Home}",id
    ControlSend "{Shift down}{End}{Shift up}",id
    ControlSend "{Backspace}",id  
}

}

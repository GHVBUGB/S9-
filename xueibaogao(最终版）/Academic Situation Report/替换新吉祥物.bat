@echo off
chcp 65001 >nul
echo ========================================
echo 正在处理新的吉祥物GIF...
echo ========================================
cd /d "%~dp0"
python convert_new.py
if %errorlevel% equ 0 (
    echo.
    echo ✓ 转换成功！
    echo 新的 mascot.webp 已生成
    echo.
    echo 现在请刷新浏览器查看新吉祥物！
) else (
    echo.
    echo ✗ 转换失败，请检查错误信息
)
echo.
pause


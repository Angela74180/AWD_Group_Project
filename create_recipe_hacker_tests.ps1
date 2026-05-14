# No Recipe Name
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0"
$session.Cookies.Add((New-Object System.Net.Cookie("session", ".eJwlzjEOwjAMAMC_ZGaIHcdJ-gM2foCc2BaVKkCBToi_U4nxtvuEq0973cLynrudwnXVsIQK3AxzJRAalTS2LsPdC7IM9JFIWumpkyVyAYSsbsLUM7RecwVxYfUWmwEBRweMVKhA6SMbEiTOcRT1Lj56y0k1eUZFTsoaORyR_WXzv8GDsr9vj3k-mE7hOR--bnZZR1ju-7Z9fz3MOh8.agV4bw.Pb3wQea83UUAiF0B96H2ryLpnAs", "/", "127.0.0.1")))
Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:5000/publish_recipe" `
-Method "POST" `
-WebSession $session `
-Headers @{
"Accept"="text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  "Accept-Encoding"="gzip, deflate, br, zstd"
  "Accept-Language"="en-US,en;q=0.9,en-AU;q=0.8"
  "Cache-Control"="max-age=0"
  "Origin"="http://127.0.0.1:5000"
  "Referer"="http://127.0.0.1:5000/create_recipe/0"
  "Sec-Fetch-Dest"="document"
  "Sec-Fetch-Mode"="navigate"
  "Sec-Fetch-Site"="same-origin"
  "Sec-Fetch-User"="?1"
  "Upgrade-Insecure-Requests"="1"
  "sec-ch-ua"="`"Chromium`";v=`"148`", `"Microsoft Edge`";v=`"148`", `"Not/A)Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
} `
-ContentType "application/x-www-form-urlencoded" `
-Body "recipe_name=&recipeType=Breakfast&recipeDifficulty=Simple&serves=1&tagName=TAG+1&tagName=TAG+2&timeSplit=on&prepHours=0&prepMins=0&cookHours=1&cookMins=0&Description=DESC+&coverPhoto=&ingredientName=ING+1&ingredientQuantity=16&ingredientUnits=%22Whole%22&ingredientDescription=DESC+ING&ingredientName=ING+2&ingredientQuantity=17&ingredientUnits=mL&ingredientDescription=DESC+2+ING&applianceName=Microwave&extraData=850&applianceDescription=MICROWAVE&applianceName=Other&extraData=TRANGEA&applianceDescription=TRANNNNNN&stepName=MY+STEP+1&stepDescription=STEP+DESC+1&stepPhoto=&stepName=MY+STEP+2&stepDescription=STEP+DESC+2&stepPhoto=&visibility=Public&allowRatings=on&allowReviews=on&publishButton="

# Recipe Name Too Long
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0"
$session.Cookies.Add((New-Object System.Net.Cookie("session", ".eJwlzjEOwjAMAMC_ZGaIHcdJ-gM2foCc2BaVKkCBToi_U4nxtvuEq0973cLynrudwnXVsIQK3AxzJRAalTS2LsPdC7IM9JFIWumpkyVyAYSsbsLUM7RecwVxYfUWmwEBRweMVKhA6SMbEiTOcRT1Lj56y0k1eUZFTsoaORyR_WXzv8GDsr9vj3k-mE7hOR--bnZZR1ju-7Z9fz3MOh8.agV4bw.Pb3wQea83UUAiF0B96H2ryLpnAs", "/", "127.0.0.1")))
Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:5000/publish_recipe" `
-Method "POST" `
-WebSession $session `
-Headers @{
"Accept"="text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  "Accept-Encoding"="gzip, deflate, br, zstd"
  "Accept-Language"="en-US,en;q=0.9,en-AU;q=0.8"
  "Cache-Control"="max-age=0"
  "Origin"="http://127.0.0.1:5000"
  "Referer"="http://127.0.0.1:5000/create_recipe/0"
  "Sec-Fetch-Dest"="document"
  "Sec-Fetch-Mode"="navigate"
  "Sec-Fetch-Site"="same-origin"
  "Sec-Fetch-User"="?1"
  "Upgrade-Insecure-Requests"="1"
  "sec-ch-ua"="`"Chromium`";v=`"148`", `"Microsoft Edge`";v=`"148`", `"Not/A)Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
} `
-ContentType "application/x-www-form-urlencoded" `
-Body "recipe_name=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&recipeType=Breakfast&recipeDifficulty=Simple&serves=1&tagName=TAG+1&tagName=TAG+2&timeSplit=on&prepHours=0&prepMins=0&cookHours=1&cookMins=0&Description=DESC+&coverPhoto=&ingredientName=ING+1&ingredientQuantity=16&ingredientUnits=%22Whole%22&ingredientDescription=DESC+ING&ingredientName=ING+2&ingredientQuantity=17&ingredientUnits=mL&ingredientDescription=DESC+2+ING&applianceName=Microwave&extraData=850&applianceDescription=MICROWAVE&applianceName=Other&extraData=TRANGEA&applianceDescription=TRANNNNNN&stepName=MY+STEP+1&stepDescription=STEP+DESC+1&stepPhoto=&stepName=MY+STEP+2&stepDescription=STEP+DESC+2&stepPhoto=&visibility=Public&allowRatings=on&allowReviews=on&publishButton="

# Recipe Name Too Long
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0"
$session.Cookies.Add((New-Object System.Net.Cookie("session", ".eJwlzjEOwjAMAMC_ZGaIHcdJ-gM2foCc2BaVKkCBToi_U4nxtvuEq0973cLynrudwnXVsIQK3AxzJRAalTS2LsPdC7IM9JFIWumpkyVyAYSsbsLUM7RecwVxYfUWmwEBRweMVKhA6SMbEiTOcRT1Lj56y0k1eUZFTsoaORyR_WXzv8GDsr9vj3k-mE7hOR--bnZZR1ju-7Z9fz3MOh8.agV4bw.Pb3wQea83UUAiF0B96H2ryLpnAs", "/", "127.0.0.1")))
Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:5000/publish_recipe" `
-Method "POST" `
-WebSession $session `
-Headers @{
"Accept"="text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  "Accept-Encoding"="gzip, deflate, br, zstd"
  "Accept-Language"="en-US,en;q=0.9,en-AU;q=0.8"
  "Cache-Control"="max-age=0"
  "Origin"="http://127.0.0.1:5000"
  "Referer"="http://127.0.0.1:5000/create_recipe/0"
  "Sec-Fetch-Dest"="document"
  "Sec-Fetch-Mode"="navigate"
  "Sec-Fetch-Site"="same-origin"
  "Sec-Fetch-User"="?1"
  "Upgrade-Insecure-Requests"="1"
  "sec-ch-ua"="`"Chromium`";v=`"148`", `"Microsoft Edge`";v=`"148`", `"Not/A)Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
} `
-ContentType "application/x-www-form-urlencoded" `
-Body "recipe_name=Recipe+TITLE&recipeType=Breakfast&recipeDifficulty=Simple&serves=1&tagName=TAG+1&tagName=TAG+2&timeSplit=on&prepHours=0&prepMins=0&cookHours=1&cookMins=0&Description=DESC+&coverPhoto=&ingredientName=ING+1&ingredientQuantity=16&ingredientUnits=%22Whole%22&ingredientDescription=DESC+ING&ingredientName=ING+2&ingredientQuantity=17&ingredientUnits=mL&ingredientDescription=DESC+2+ING&applianceName=Microwave&extraData=850&applianceDescription=MICROWAVE&applianceName=Other&extraData=TRANGEA&applianceDescription=TRANNNNNN&stepName=MY+STEP+1&stepDescription=STEP+DESC+1&stepPhoto=&stepName=MY+STEP+2&stepDescription=STEP+DESC+2&stepPhoto=&visibility=Public&allowRatings=on&allowReviews=on&publishButton="

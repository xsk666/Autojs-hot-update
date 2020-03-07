const baseUrl = "http://abc.svip925.top/";
const versionName = "热更新 b0.0.1";
log("正在进行版本检查…");
var res = http.get(baseUrl + "codelist.php?user=3104182180").body.json();
var a = [];
var name = res[0].fileName;
var a = name.slice(name.indexOf("b") + 1, name.indexOf(".j"));
var ver = versionName.slice(versionName.indexOf("b"), versionName.length).replace(/\D/g, '');

if (ver < a.replace(/\D/g, '')) {
    log("有新版本可以更新\n当前版本：" + versionName + "\n最新版本：热更新 " + a);
    confirm("有新版本可以更新", "当前版本：" + versionName + "\n\n最新版本：热更新 " + a, (value) => {
        if (value) {
            threads.start(function() {
                toast("正在更新…");
                codePath = engines.myEngine().cwd() + "/main.js";
                files.write(codePath, http.get(baseUrl + "download.php?user=3104182180&name=" + name).body.string())
                toast("更新完成\n\n正在打开…");
                engines.execScriptFile(codePath);
                toast("更新完成!")
                exit();
            })
        } else {
            toastLog("已取消更新。\n下次打开热更新将再次提示")
        }
    })
} else {
    log("版本检查完成：暂无新版本");
};
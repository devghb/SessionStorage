function ArtStorage()
{
    this.md5 = function(string){
        var md5 = new md5();
        return md5.get(string);
    }
    //初始化并清除所有缓存
    this.init = function(){
        if(!this.isCache()){
            return false;
        }
        window.sessionStorage.clear();
        return this;
    }
    //是否支持缓存
    this.isCache = function(){
        if(typeof(window.sessionStorage) == 'object'){
            return true;
        }
        else{
            return false;
        }
    }
    //设置缓存
    this.set = function(key,val,timeout){
        if(!this.isCache()){
            return false;
        }
        if(timeout > 0){
            var time = new Date().getTime() + timeout * 1000;
            window.sessionStorage.setItem(key,time+""+val);
        }
        else{
            var time = new Date().getTime() + 3600*24*1000;
            window.sessionStorage.setItem(key,timeout+""+val);
        }
        return true;
    }
    //获取缓存
    this.get = function(key){
        if(!this.isCache()){
            return false;
        }
        var val = window.sessionStorage.getItem(key);
        if(val == null){
            return null;
        }
        var timeout = val.substr(0,13);
        var newtime = new Date().getTime();
        if(newtime > timeout){
            return null;
        }
        else{
            return val.substr(13);
        }
    }
}

function ArtStorage()
{
	this.md5 = function(string){
		var md5 = new md5();
		return md5.get(string);
	}
	//��ʼ��,������л���
	this.init = function(){
		if(!this.isCache()){
			return false;
		}
		window.sessionStorage.clear();
		return this;
	}
	//�Ƿ�֧�ֻ���
	this.isCache = function(){
		if(typeof(window.sessionStorage) == 'object'){
			return true;
		}
		else{
			return false;
		}
	}
	//����
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
	//��ȡ
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

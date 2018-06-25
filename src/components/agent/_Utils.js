export function generateComputed(fieldName, nameInStore, updateFuncName) {
    return {
        get() {
            if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                return this.innerItem[fieldName];
            }

            return this.$store.state[nameInStore][fieldName];
        },
        set(val) {
            if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                this.innerItem[fieldName] = val;
            }else{
                this[updateFuncName](val);
            }
        }
    };   
};

export function getDateStr(date) {
    if(date instanceof Date) {
        return date.getFullYear() + '-' + padding(date.getMonth() + 1) + '-' + padding(date.getDate());
    }

    return '';
}

export function padding(n) {
    if(n<10) {
        return '0' + n;
    }

    return n.toString();
}
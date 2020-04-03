// let s = '1.1, 2.1, 3.9';
function sequenceSum(s){
    let result = 0;
    let num ='';
    for(let i = 0; i<s.length; i++){
        if(s[i]==',') {
            result+=parseFloat(num);
            num='';
            i++;
        }
        num+=s[i];
        if(i==s.length-1) result+=parseFloat(num);        
    }
    return result;
}

// let s = 'azcbobobegghakl';
function vowelsNumber(s){
    let str = s.toLowerCase();
    let count = 0;
    for(let i=0; i<s.length; i++){
        if(str[i]=='a'||str[i]=='e'||str[i]=='i'||str[i]=='o'||str[i]=='u') count++;
    }
    return count;
}



// let str1 = 'abcd';
// let str2 = 'bcdd';
function isIn(str1, str2){
    if(str1.length>str2.length){
        let str =''
        for(let i=0; i<str1.length; i++){
           str = str1.slice(i,i+str2.length)
            if(str==str2)return true;
            
        }
        if(str!=str2)return false;
    }
}


// let s = 'topot';
function isPalindrome(s){
    let palindrome ='';
    for(let i=s.length-1; i>=0; i--){
        palindrome+=s[i]
    };
    if(palindrome == s) return true;
    else return false;
}


// let L1 = [1, 2, 'a', 'c'];
// let  L2 = [1, 'b', 'c', 'd', 'e', 2];
function intersect(L1, L2){
    let result = [];
    for(let i = 0; i<L1.length; i++){
        for(let j=0; j<L2.length; j++){
            if(L1[i]==L2[j]){
                result.push(L1[i]);
                break;
            }            
        }
    }
    return result;
}

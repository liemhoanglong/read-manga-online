var MemberModel = require('../model/member.model');
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports= {
	getMember:async (id) => {
        const member = await MemberModel.findOne({_id: id});
        return member;
    },
    getMemberByEmail: async(email)=>{
        const member = await MemberModel.findOne({email: email});
        return member;
    },
    createNewMember: async (memberInfo)=>{
        const password = bcrypt.hashSync(memberInfo.password, saltRound);
        memberInfo.password = password;
        console.log("memberInfo after hash", memberInfo);
        const newMember = await MemberModel.create(memberInfo);
        console.log("newMember", newMember);
        return newMember;
    }
}



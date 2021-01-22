var MemberModel = require("../model/member.model");
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {
  getMember: async (id) => {
    const member = await MemberModel.findOne({ _id: id });
    return member;
  },
  getMemberByEmail: async (email) => {
    const member = await MemberModel.findOne({ email: email });
    return member;
  },
  createNewMember: async (memberInfo) => {
    const password = bcrypt.hashSync(memberInfo.password, saltRound);
    memberInfo.password = password;
    console.log("memberInfo after hash", memberInfo);
    const newMember = await MemberModel.create(memberInfo);
    console.log("newMember", newMember);
    return newMember;
  },
  update: async (email, mem) => {
    try {
      console.log(mem);
      await MemberModel.findOneAndUpdate({ email: email }, mem);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  
  // Begin of Nguyen Manh Linh's works====================================================================
  unfollow: async (memberID, seriesID) => {
    var member = await MemberModel.findOne({ _id: memberID });
    const indexTobeDelete = member.favoriteSeries.indexOf(seriesID);
    member.favoriteSeries.splice(indexTobeDelete, 1);
    member.save();
  }
  // End of Nguyen Manh Linh's works======================================================================
  
};

// Apply phone layout BEFORE first paint on narrow screens — never touches localStorage
(function(){
  var isNarrow = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (isNarrow) {
    document.documentElement.style.setProperty('--sidebar-w','0px');
    document.addEventListener('DOMContentLoaded', function(){
      document.body.classList.add('phone-mode');
    });
  }
})();

// --- Component Script --- 

// Early stubs — replaced by real implementations when main script loads
function go(p){ window._pendingNav=p; if(window._goImpl) window._goImpl(p); }
function updXP(){ if(window._updXPImpl) window._updXPImpl(); }

// --- Component Script --- 

// Spawn particles for device choice screen
(function spawnDCSParticles() {
  const container = document.getElementById('dcs-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('div');
    s.className = 'dcs-star';
    const size = Math.random() * 3 + 1;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${80 + Math.random()*30}%;
      animation-duration:${6 + Math.random()*10}s;
      animation-delay:${-Math.random()*10}s;
      opacity:0;
    `;
    container.appendChild(s);
  }
})();

// Auto-detect mobile and highlight recommended
(function dcsAutoDetect() {
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (!isMobile) {
    // On desktop, recommend desktop card instead
    const recBadge = document.getElementById('dcs-rec-badge');
    const phoneCard = document.getElementById('dcs-phone-card');
    if (recBadge) recBadge.remove();
    // Could add recommended to desktop but keep it clean
  }
})();

// --- Component Script --- 

function toggleMobMenu() {
  const drawer = document.getElementById('mob-drawer');
  const overlay = document.getElementById('mob-drawer-overlay');
  const btn = document.getElementById('mob-more-btn');
  const isOpen = drawer.style.display === 'block';
  if (isOpen) {
    closeMobMenu();
  } else {
    // Sync avatar & name
    const sbAvatar = document.getElementById('sb-avatar-display');
    const sbName = document.getElementById('sb-name');
    const sbXp = document.getElementById('sb-xp');
    if (sbAvatar) document.getElementById('mob-drawer-avatar').innerHTML = sbAvatar.innerHTML;
    if (sbName) document.getElementById('mob-drawer-name').textContent = sbName.textContent;
    if (sbXp) document.getElementById('mob-drawer-xp').textContent = sbXp.textContent;
    // Sync dark mode toggle
    updateMobThemeToggle();
    drawer.style.display = 'block';
    drawer.classList.add('open');
    overlay.style.display = 'block';
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeMobMenu() {
  const drawer = document.getElementById('mob-drawer');
  const overlay = document.getElementById('mob-drawer-overlay');
  const btn = document.getElementById('mob-more-btn');
  drawer.style.display = 'none';
  drawer.classList.remove('open');
  overlay.style.display = 'none';
  btn.classList.remove('open');
  document.body.style.overflow = '';
}
function updateMobThemeToggle() {
  const mainToggle = document.getElementById('theme-toggle');
  const mobToggle = document.getElementById('mob-theme-toggle');
  if (mainToggle && mobToggle) {
    if (mainToggle.classList.contains('on')) {
      mobToggle.classList.add('on');
    } else {
      mobToggle.classList.remove('on');
    }
  }
}
// Close drawer on back navigation / escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMobMenu();
});
// Keep mob drawer avatar in sync when profile updates
const _origUpdXP = window.updXP;
window.updXP = function() {
  if (_origUpdXP) _origUpdXP();
};

// --- Component Script --- 

// DATA
const HSK1=[
{h:'你',p:'nǐ',m:'you',t:3},{h:'好',p:'hǎo',m:'good',t:3},{h:'我',p:'wǒ',m:'I/me',t:3},
{h:'是',p:'shì',m:'am/is',t:4},{h:'他',p:'tā',m:'he',t:1},{h:'她',p:'tā',m:'she',t:1},
{h:'们',p:'men',m:'plural',t:0},{h:'的',p:'de',m:'of/possessive',t:0},
{h:'不',p:'bù',m:'not',t:4},{h:'在',p:'zài',m:'at/in',t:4},
{h:'有',p:'yǒu',m:'have',t:3},{h:'这',p:'zhè',m:'this',t:4},
{h:'那',p:'nà',m:'that',t:4},{h:'什么',p:'shénme',m:'what',t:2},
{h:'人',p:'rén',m:'person',t:2},{h:'大',p:'dà',m:'big',t:4},
{h:'小',p:'xiǎo',m:'small',t:3},{h:'多',p:'duō',m:'many',t:1},
{h:'少',p:'shǎo',m:'few',t:3},{h:'中国',p:'zhōngguó',m:'China',t:1},
{h:'学',p:'xué',m:'study',t:2},{h:'生',p:'shēng',m:'student/life',t:1},
{h:'老师',p:'lǎoshī',m:'teacher',t:3},{h:'朋友',p:'péngyǒu',m:'friend',t:2},
{h:'家',p:'jiā',m:'home/family',t:1},{h:'爸爸',p:'bàba',m:'father',t:4},
{h:'妈妈',p:'māma',m:'mother',t:1},{h:'哥哥',p:'gēge',m:'older brother',t:1},
{h:'姐姐',p:'jiějie',m:'older sister',t:3},{h:'弟弟',p:'dìdi',m:'younger brother',t:4},
{h:'妹妹',p:'mèimei',m:'younger sister',t:4},{h:'谢谢',p:'xièxie',m:'thank you',t:4},
{h:'再见',p:'zàijiàn',m:'goodbye',t:4},{h:'请',p:'qǐng',m:'please',t:3},
{h:'对不起',p:'duìbuqǐ',m:'sorry',t:4},{h:'没关系',p:'méiguānxi',m:'no problem',t:2},
{h:'吃',p:'chī',m:'eat',t:1},{h:'喝',p:'hē',m:'drink',t:1},
{h:'水',p:'shuǐ',m:'water',t:3},{h:'茶',p:'chá',m:'tea',t:2},
{h:'米饭',p:'mǐfàn',m:'rice',t:3},{h:'菜',p:'cài',m:'dish/vegetable',t:4},
{h:'苹果',p:'píngguǒ',m:'apple',t:2},{h:'钱',p:'qián',m:'money',t:2},
{h:'买',p:'mǎi',m:'buy',t:3},{h:'看',p:'kàn',m:'look/watch',t:4},
{h:'听',p:'tīng',m:'listen',t:1},{h:'说',p:'shuō',m:'speak',t:1},
{h:'读',p:'dú',m:'read',t:2},{h:'写',p:'xiě',m:'write',t:3},
{h:'去',p:'qù',m:'go',t:4},{h:'来',p:'lái',m:'come',t:2},
{h:'回',p:'huí',m:'return',t:2},{h:'想',p:'xiǎng',m:'want/think',t:3},
{h:'喜欢',p:'xǐhuan',m:'like',t:3},{h:'爱',p:'ài',m:'love',t:4},
{h:'很',p:'hěn',m:'very',t:3},{h:'太',p:'tài',m:'too (much)',t:4},
{h:'都',p:'dōu',m:'all/both',t:1},{h:'也',p:'yě',m:'also',t:3},
{h:'今天',p:'jīntiān',m:'today',t:1},{h:'明天',p:'míngtiān',m:'tomorrow',t:2},
{h:'昨天',p:'zuótiān',m:'yesterday',t:2},{h:'现在',p:'xiànzài',m:'now',t:4},
{h:'时候',p:'shíhou',m:'time/moment',t:2},{h:'年',p:'nián',m:'year',t:2},
{h:'月',p:'yuè',m:'month',t:4},{h:'日',p:'rì',m:'day/date',t:4},
{h:'号',p:'hào',m:'number/date',t:4},{h:'岁',p:'suì',m:'years old',t:4},
{h:'天气',p:'tiānqì',m:'weather',t:1},{h:'热',p:'rè',m:'hot',t:4},
{h:'冷',p:'lěng',m:'cold',t:3},{h:'下雨',p:'xiàyǔ',m:'rain',t:4},
];
const HSK2=[
{h:'已经',p:'yǐjīng',m:'already',t:3},{h:'可能',p:'kěnéng',m:'maybe',t:3},
{h:'应该',p:'yīnggāi',m:'should',t:1},{h:'必须',p:'bìxū',m:'must',t:4},
{h:'准备',p:'zhǔnbèi',m:'prepare',t:3},{h:'开始',p:'kāishǐ',m:'begin',t:1},
{h:'结束',p:'jiéshù',m:'end/finish',t:2},{h:'知道',p:'zhīdào',m:'know',t:1},
{h:'觉得',p:'juéde',m:'feel/think',t:2},{h:'希望',p:'xīwàng',m:'hope',t:1},
{h:'帮助',p:'bāngzhù',m:'help',t:1},{h:'问题',p:'wèntí',m:'question',t:4},
{h:'回答',p:'huídá',m:'answer',t:2},{h:'考试',p:'kǎoshì',m:'exam',t:3},
{h:'练习',p:'liànxí',m:'practice',t:4},{h:'教',p:'jiāo',m:'teach',t:1},
{h:'旅游',p:'lǚyóu',m:'travel',t:3},{h:'飞机',p:'fēijī',m:'airplane',t:1},
{h:'火车',p:'huǒchē',m:'train',t:3},{h:'地铁',p:'dìtiě',m:'subway',t:4},
{h:'公共汽车',p:'gōnggòng qìchē',m:'bus',t:1},{h:'医院',p:'yīyuàn',m:'hospital',t:1},
{h:'银行',p:'yínháng',m:'bank',t:2},{h:'超市',p:'chāoshì',m:'supermarket',t:1},
{h:'饭店',p:'fàndiàn',m:'restaurant',t:4},{h:'学校',p:'xuéxiào',m:'school',t:2},
{h:'公司',p:'gōngsī',m:'company',t:1},{h:'工作',p:'gōngzuò',m:'work/job',t:1},
{h:'身体',p:'shēntǐ',m:'body/health',t:1},{h:'眼睛',p:'yǎnjing',m:'eyes',t:3},
{h:'高兴',p:'gāoxìng',m:'happy',t:1},{h:'生气',p:'shēngqì',m:'angry',t:1},
{h:'难过',p:'nánguò',m:'sad',t:2},{h:'累',p:'lèi',m:'tired',t:4},
{h:'舒服',p:'shūfu',m:'comfortable',t:1},{h:'颜色',p:'yánsè',m:'color',t:2},
{h:'红',p:'hóng',m:'red',t:2},{h:'蓝',p:'lán',m:'blue',t:2},
{h:'绿',p:'lǜ',m:'green',t:4},{h:'白',p:'bái',m:'white',t:2},
{h:'黑',p:'hēi',m:'black',t:1},
];
const HSK3=[
{h:'晚会',p:'wǎnhuì',m:'evening party',t:3},
{h:'聚会',p:'jùhuì',m:'gathering/party',t:4},
{h:'祝贺',p:'zhùhè',m:'congratulate',t:4},
{h:'礼物',p:'lǐwù',m:'gift/present',t:3},
{h:'送',p:'sòng',m:'send/give as a gift',t:4},
{h:'踢足球',p:'tī zúqiú',m:'play soccer',t:1},
{h:'打篮球',p:'dǎ lánqiú',m:'play basketball',t:3},
{h:'游泳',p:'yóuyǒng',m:'swim',t:2},
{h:'跑步',p:'pǎobù',m:'run',t:3},
{h:'运动',p:'yùndòng',m:'exercise/sports',t:4},
{h:'爱好',p:'àihào',m:'hobby',t:4},
{h:'旅行',p:'lǚxíng',m:'travel/journey',t:3},
{h:'行李箱',p:'xínglixiāng',m:'suitcase',t:2},
{h:'护照',p:'hùzhào',m:'passport',t:4},
{h:'飞机票',p:'fēijīpiào',m:'airplane ticket',t:1},
{h:'出发',p:'chūfā',m:'set out/depart',t:1},
{h:'方便',p:'fāngbiàn',m:'convenient',t:1},
{h:'历史',p:'lìshǐ',m:'history',t:4},
{h:'地理',p:'dìlǐ',m:'geography',t:3},
{h:'数学',p:'shùxué',m:'mathematics',t:4},
{h:'化学',p:'huàxué',m:'chemistry',t:4},
{h:'物理',p:'wùlǐ',m:'physics',t:4},
{h:'作业',p:'zuòyè',m:'homework',t:4},
{h:'经理',p:'jīnglǐ',m:'manager',t:3},
{h:'同事',p:'tóngshì',m:'colleague',t:2},
{h:'开会',p:'kāihuì',m:'attend a meeting',t:1},
{h:'加班',p:'jiābān',m:'work overtime',t:1},
{h:'请假',p:'qǐngjià',m:'ask for leave',t:3},
{h:'报告',p:'bàogào',m:'report',t:4},
{h:'信用卡',p:'xìnyòngkǎ',m:'credit card',t:4},
{h:'刷卡',p:'shuākǎ',m:'swipe card',t:1},
{h:'存钱',p:'cúnqián',m:'deposit money',t:2},
{h:'服务员',p:'fúwùyuán',m:'waiter/waitress',t:2},
{h:'菜单',p:'càidān',m:'menu',t:1},
{h:'不但',p:'búdàn',m:'not only',t:2},
{h:'而且',p:'érqiě',m:'but also/and',t:3},
{h:'或者',p:'huòzhě',m:'or',t:3},
{h:'除了',p:'chúle',m:'except/besides',t:2},
{h:'选择',p:'xuǎnzé',m:'choose/select',t:2},
{h:'决定',p:'juédìng',m:'decide/decision',t:2},
{h:'难受',p:'nánshòu',m:'uncomfortable/sad',t:4},
{h:'着急',p:'zhāojí',m:'worried/anxious',t:2},
{h:'紧张',p:'jǐnzhāng',m:'nervous/tense',t:3},
{h:'害怕',p:'hàipà',m:'scared/afraid',t:4},
{h:'放心',p:'fàngxīn',m:'rest assured',t:4},
{h:'起来',p:'qǐlái',m:'stand up/start to',t:3},
{h:'过去',p:'guòqù',m:'go over/past',t:4},
{h:'出来',p:'chūlái',m:'come out',t:2},
{h:'完成',p:'wánchéng',m:'complete/finish',t:2},
{h:'解决',p:'jiějué',m:'solve/resolve',t:2},
{h:'成功',p:'chénggōng',m:'succeed/successful',t:2}
];
const ALL_WORDS=[...HSK1,...HSK2,...HSK3];

// --- Component Script --- 

// LESSONS / GRAMMAR / STORIES / RADICALS / EXAMS
const UNITS=[
{id:1,title:'Hello World',emoji:'👋',color:'var(--green)',lessons:[
{id:101,title:'Greetings',words:['你','好','谢谢','再见','请','对不起','没关系'],sentences:[
{cn:'你好！',py:'Nǐ hǎo!',en:'Hello!',words:[{h:'你',p:'nǐ',r:'you'},{h:'好',p:'hǎo',r:'good'}]},
{cn:'谢谢你！',py:'Xièxie nǐ!',en:'Thank you!',words:[{h:'谢谢',p:'xièxie',r:'thanks'},{h:'你',p:'nǐ',r:'you'}]},
{cn:'再见！',py:'Zàijiàn!',en:'Goodbye!',words:[{h:'再',p:'zài',r:'again'},{h:'见',p:'jiàn',r:'see'}]},
]},
{id:102,title:'Who Am I?',words:['我','是','他','她','们','叫','什么'],sentences:[
{cn:'我是学生。',py:'Wǒ shì xuéshēng.',en:'I am a student.',words:[{h:'我',p:'wǒ',r:'I'},{h:'是',p:'shì',r:'am'},{h:'学生',p:'xuéshēng',r:'student'}]},
{cn:'你叫什么？',py:'Nǐ jiào shénme?',en:'What is your name?',words:[{h:'你',p:'nǐ',r:'you'},{h:'叫',p:'jiào',r:'called'},{h:'什么',p:'shénme',r:'what'}]},
]},
{id:103,title:'Numbers 1-10',words:['一','二','三','四','五','六','七','八','九','十'],sentences:[
{cn:'我有三个朋友。',py:'Wǒ yǒu sān gè péngyǒu.',en:'I have 3 friends.',words:[{h:'我',p:'wǒ',r:'I'},{h:'有',p:'yǒu',r:'have'},{h:'三',p:'sān',r:'three'},{h:'个',p:'gè',r:'MW'},{h:'朋友',p:'péngyǒu',r:'friends'}]},
]},
]},
{id:2,title:'About Me',emoji:'👤',color:'var(--blue)',lessons:[
{id:201,title:'My Family',words:['爸爸','妈妈','哥哥','姐姐','弟弟','妹妹','家'],sentences:[
{cn:'这是我的家。',py:'Zhè shì wǒ de jiā.',en:'This is my home.',words:[{h:'这',p:'zhè',r:'this'},{h:'是',p:'shì',r:'is'},{h:'我的',p:'wǒ de',r:'my'},{h:'家',p:'jiā',r:'home'}]},
]},
{id:202,title:'Age & Birthday',words:['岁','年','月','日','号','多','大'],sentences:[
{cn:'你多大了？',py:'Nǐ duō dà le?',en:'How old are you?',words:[{h:'你',p:'nǐ',r:'you'},{h:'多大',p:'duō dà',r:'how old'},{h:'了',p:'le',r:'particle'}]},
]},
{id:203,title:'Countries',words:['中国','人','学','生','朋友','老师'],sentences:[
{cn:'我是中国人。',py:'Wǒ shì zhōngguó rén.',en:'I am Chinese.',words:[{h:'我',p:'wǒ',r:'I'},{h:'是',p:'shì',r:'am'},{h:'中国',p:'zhōngguó',r:'China'},{h:'人',p:'rén',r:'person'}]},
]},
]},
{id:3,title:'Daily Life',emoji:'☀️',color:'var(--gold)',lessons:[
{id:301,title:'Time Words',words:['今天','明天','昨天','现在','时候'],sentences:[
{cn:'今天天气很好。',py:'Jīntiān tiānqì hěn hǎo.',en:'The weather is nice today.',words:[{h:'今天',p:'jīntiān',r:'today'},{h:'天气',p:'tiānqì',r:'weather'},{h:'很',p:'hěn',r:'very'},{h:'好',p:'hǎo',r:'good'}]},
]},
{id:302,title:'Weather',words:['天气','热','冷','下雨'],sentences:[
{cn:'今天很热。',py:'Jīntiān hěn rè.',en:'It is very hot today.',words:[{h:'今天',p:'jīntiān',r:'today'},{h:'很',p:'hěn',r:'very'},{h:'热',p:'rè',r:'hot'}]},
]},
{id:303,title:'Colors',words:['红','蓝','绿','白','黑','颜色'],sentences:[
{cn:'你喜欢什么颜色？',py:'Nǐ xǐhuan shénme yánsè?',en:'What color do you like?',words:[{h:'你',p:'nǐ',r:'you'},{h:'喜欢',p:'xǐhuan',r:'like'},{h:'什么',p:'shénme',r:'what'},{h:'颜色',p:'yánsè',r:'color'}]},
]},
]},
{id:4,title:'Food & Drink',emoji:'🍜',color:'var(--orange)',lessons:[
{id:401,title:'Basic Food',words:['吃','喝','水','茶','米饭','菜','苹果'],sentences:[
{cn:'我想吃米饭。',py:'Wǒ xiǎng chī mǐfàn.',en:'I want to eat rice.',words:[{h:'我',p:'wǒ',r:'I'},{h:'想',p:'xiǎng',r:'want'},{h:'吃',p:'chī',r:'eat'},{h:'米饭',p:'mǐfàn',r:'rice'}]},
]},
{id:402,title:'At the Restaurant',words:['饭店','买','钱','多少'],sentences:[
{cn:'这个多少钱？',py:'Zhège duōshao qián?',en:'How much is this?',words:[{h:'这个',p:'zhège',r:'this'},{h:'多少',p:'duōshao',r:'how much'},{h:'钱',p:'qián',r:'money'}]},
]},
{id:403,title:'Drinks & Snacks',words:['咖啡','牛奶','果汁','面包'],sentences:[
{cn:'我想喝茶。',py:'Wǒ xiǎng hē chá.',en:'I want to drink tea.',words:[{h:'我',p:'wǒ',r:'I'},{h:'想',p:'xiǎng',r:'want'},{h:'喝',p:'hē',r:'drink'},{h:'茶',p:'chá',r:'tea'}]},
]},
]},
{id:5,title:'Getting Around',emoji:'🚌',color:'var(--purple)',lessons:[
{id:501,title:'Transport',words:['飞机','火车','地铁','公共汽车'],sentences:[
{cn:'我坐地铁去学校。',py:'Wǒ zuò dìtiě qù xuéxiào.',en:'I take the subway to school.',words:[{h:'我',p:'wǒ',r:'I'},{h:'坐',p:'zuò',r:'ride'},{h:'地铁',p:'dìtiě',r:'subway'},{h:'去',p:'qù',r:'go'},{h:'学校',p:'xuéxiào',r:'school'}]},
]},
{id:502,title:'Places',words:['医院','银行','超市','学校','公司'],sentences:[
{cn:'超市在哪儿？',py:'Chāoshì zài nǎr?',en:'Where is the supermarket?',words:[{h:'超市',p:'chāoshì',r:'supermarket'},{h:'在',p:'zài',r:'at'},{h:'哪儿',p:'nǎr',r:'where'}]},
]},
{id:503,title:'Directions',words:['左','右','前','后','旁边'],sentences:[
{cn:'请问，银行在哪儿？',py:'Qǐngwèn, yínháng zài nǎr?',en:'Excuse me, where is the bank?',words:[{h:'请问',p:'qǐngwèn',r:'excuse me'},{h:'银行',p:'yínháng',r:'bank'},{h:'在',p:'zài',r:'at'},{h:'哪儿',p:'nǎr',r:'where'}]},
]},
]},
{id:6,title:'Feelings & Life',emoji:'💬',color:'var(--pink)',lessons:[
{id:601,title:'Emotions',words:['高兴','生气','难过','累','舒服'],sentences:[
{cn:'我很高兴！',py:'Wǒ hěn gāoxìng!',en:'I am very happy!',words:[{h:'我',p:'wǒ',r:'I'},{h:'很',p:'hěn',r:'very'},{h:'高兴',p:'gāoxìng',r:'happy'}]},
]},
{id:602,title:'Hobbies',words:['喜欢','看','听','说','读','写','爱'],sentences:[
{cn:'你喜欢做什么？',py:'Nǐ xǐhuan zuò shénme?',en:'What do you like to do?',words:[{h:'你',p:'nǐ',r:'you'},{h:'喜欢',p:'xǐhuan',r:'like'},{h:'做',p:'zuò',r:'do'},{h:'什么',p:'shénme',r:'what'}]},
]},
{id:603,title:'Work & Study',words:['工作','公司','考试','练习','帮助'],sentences:[
{cn:'我在学中文。',py:'Wǒ zài xué zhōngwén.',en:'I am studying Chinese.',words:[{h:'我',p:'wǒ',r:'I'},{h:'在',p:'zài',r:'currently'},{h:'学',p:'xué',r:'study'},{h:'中文',p:'zhōngwén',r:'Chinese'}]},
]},
]},
{id:7,title:'HSK2 · Everyday Life',color:'var(--teal)',lessons:[
{id:701,title:'At Home',words:['房间','门','窗户','桌子','椅子','床','厕所'],sentences:[
{cn:'我的房间很大。',py:'Wǒ de fángjiān hěn dà.',en:'My room is very big.',words:[{h:'我的',p:'wǒ de',r:'my'},{h:'房间',p:'fángjiān',r:'room'},{h:'很',p:'hěn',r:'very'},{h:'大',p:'dà',r:'big'}]},
{cn:'请关门。',py:'Qǐng guān mén.',en:'Please close the door.',words:[{h:'请',p:'qǐng',r:'please'},{h:'关',p:'guān',r:'close'},{h:'门',p:'mén',r:'door'}]},
]},
{id:702,title:'Body & Health',words:['身体','头','眼睛','耳朵','手','脚','肚子'],sentences:[
{cn:'我的肚子疼。',py:'Wǒ de dùzi téng.',en:'My stomach hurts.',words:[{h:'我的',p:'wǒ de',r:'my'},{h:'肚子',p:'dùzi',r:'stomach'},{h:'疼',p:'téng',r:'hurts'}]},
]},
{id:703,title:'Clothing',words:['衣服','裤子','鞋子','帽子','穿','戴','件'],sentences:[
{cn:'你穿的衣服真好看！',py:'Nǐ chuān de yīfu zhēn hǎokàn!',en:'Your clothes look great!',words:[{h:'你',p:'nǐ',r:'you'},{h:'穿的',p:'chuān de',r:'wearing'},{h:'衣服',p:'yīfu',r:'clothes'},{h:'真',p:'zhēn',r:'really'},{h:'好看',p:'hǎokàn',r:'nice'}]},
]},
]},
{id:8,title:'HSK2 · Ability & Plans',color:'#e67e22',lessons:[
{id:801,title:'Can & Know How',words:['会','能','可以','应该','要','必须'],sentences:[
{cn:'你会说中文吗？',py:'Nǐ huì shuō zhōngwén ma?',en:'Can you speak Chinese?',words:[{h:'你',p:'nǐ',r:'you'},{h:'会',p:'huì',r:'can'},{h:'说',p:'shuō',r:'speak'},{h:'中文',p:'zhōngwén',r:'Chinese'},{h:'吗',p:'ma',r:'Q'}]},
{cn:'我能帮你。',py:'Wǒ néng bāng nǐ.',en:'I can help you.',words:[{h:'我',p:'wǒ',r:'I'},{h:'能',p:'néng',r:'can'},{h:'帮',p:'bāng',r:'help'},{h:'你',p:'nǐ',r:'you'}]},
]},
{id:802,title:'Want & Need',words:['想','希望','需要','打算','准备'],sentences:[
{cn:'我打算明天去北京。',py:'Wǒ dǎsuàn míngtiān qù Běijīng.',en:'I plan to go to Beijing tomorrow.',words:[{h:'我',p:'wǒ',r:'I'},{h:'打算',p:'dǎsuàn',r:'plan'},{h:'明天',p:'míngtiān',r:'tomorrow'},{h:'去',p:'qù',r:'go'},{h:'北京',p:'Běijīng',r:'Beijing'}]},
]},
{id:803,title:'Already & Not Yet',words:['已经','还没','快要','刚才','马上'],sentences:[
{cn:'我已经吃了。',py:'Wǒ yǐjīng chī le.',en:'I have already eaten.',words:[{h:'我',p:'wǒ',r:'I'},{h:'已经',p:'yǐjīng',r:'already'},{h:'吃',p:'chī',r:'eat'},{h:'了',p:'le',r:'ASP'}]},
{cn:'他还没来。',py:'Tā hái méi lái.',en:'He hasn\'t come yet.',words:[{h:'他',p:'tā',r:'he'},{h:'还没',p:'hái méi',r:'not yet'},{h:'来',p:'lái',r:'come'}]},
]},
]},
{id:9,title:'HSK2 · Past & Future',color:'#8e44ad',lessons:[
{id:901,title:'Describing the Past',words:['以前','刚刚','那时候','小时候','去年'],sentences:[
{cn:'以前我不会说中文。',py:'Yǐqián wǒ bú huì shuō zhōngwén.',en:'Before I couldn\'t speak Chinese.',words:[{h:'以前',p:'yǐqián',r:'before'},{h:'我',p:'wǒ',r:'I'},{h:'不会',p:'bú huì',r:'couldn\'t'},{h:'说',p:'shuō',r:'speak'},{h:'中文',p:'zhōngwén',r:'Chinese'}]},
]},
{id:902,title:'Future Goals',words:['以后','将来','愿意','决定','成功'],sentences:[
{cn:'我以后想去中国工作。',py:'Wǒ yǐhòu xiǎng qù zhōngguó gōngzuò.',en:'I want to work in China in the future.',words:[{h:'我',p:'wǒ',r:'I'},{h:'以后',p:'yǐhòu',r:'in future'},{h:'想',p:'xiǎng',r:'want'},{h:'去',p:'qù',r:'go'},{h:'中国',p:'zhōngguó',r:'China'},{h:'工作',p:'gōngzuò',r:'work'}]},
]},
{id:903,title:'Comparing Things',words:['一样','最','更','越来越','比较'],sentences:[
{cn:'今天比昨天冷。',py:'Jīntiān bǐ zuótiān lěng.',en:'Today is colder than yesterday.',words:[{h:'今天',p:'jīntiān',r:'today'},{h:'比',p:'bǐ',r:'than'},{h:'昨天',p:'zuótiān',r:'yesterday'},{h:'冷',p:'lěng',r:'cold'}]},
{cn:'我的中文越来越好了。',py:'Wǒ de zhōngwén yuè lái yuè hǎo le.',en:'My Chinese is getting better and better.',words:[{h:'我的',p:'wǒ de',r:'my'},{h:'中文',p:'zhōngwén',r:'Chinese'},{h:'越来越',p:'yuè lái yuè',r:'more and more'},{h:'好',p:'hǎo',r:'good'},{h:'了',p:'le',r:'ASP'}]},
]},
]},
{id:10,title:'HSK3 · Socializing & Hobbies',color:'var(--pink)',lessons:[
{id:1001,title:'Social Gathering',words:['晚会','聚会','祝贺','礼物','送'],sentences:[
{cn:'祝贺你拿到奖学金！这是送给你的礼物。',py:'Zhùhè nǐ nádào jiǎngxuéjīn! Zhè shì sòng gěi nǐ de lǐwù.',en:'Congratulate you on getting the scholarship! This is a gift for you.',words:[{h:'祝贺',p:'zhùhè',r:'congratulate'},{h:'你',p:'nǐ',r:'you'},{h:'礼物',p:'lǐwù',r:'gift'},{h:'送',p:'sòng',r:'give'}]},
]},
{id:1002,title:'Hobbies & Sports',words:['踢足球','打篮球','游泳','跑步','运动','爱好'],sentences:[
{cn:'我的爱好是踢足球和游泳。',py:'Wǒ de àihào shì tī zúqiú hé yóuyǒng.',en:'My hobby is playing soccer and swimming.',words:[{h:'爱好',p:'àihào',r:'hobby'},{h:'踢足球',p:'tī zúqiú',r:'play soccer'},{h:'游泳',p:'yóuyǒng',r:'swim'}]},
]},
{id:1003,title:'Travel Preparation',words:['旅行','行李箱','护照','飞机票','出发','方便'],sentences:[
{cn:'我去旅行需要准备护照和飞机票。',py:'Wǒ qù lǚxíng xūyào zhǔnbèi hùzhào hé fēijīpiào.',en:'I need to prepare my passport and plane ticket for travel.',words:[{h:'旅行',p:'lǚxíng',r:'travel'},{h:'护照',p:'hùzhào',r:'passport'},{h:'飞机票',p:'fēijīpiào',r:'plane ticket'}]},
]},
]},
{id:11,title:'HSK3 · Professional Work',color:'var(--purple)',lessons:[
{id:1101,title:'Classroom Study',words:['历史','地理','数学','作业'],sentences:[
{cn:'我今天有太多的数学作业。',py:'Wǒ jīntiān yǒu tài duō de shùxué zuòyè.',en:'I have too much math homework today.',words:[{h:'数学',p:'shùxué',r:'math'},{h:'作业',p:'zuòyè',r:'homework'}]},
]},
{id:1102,title:'At the Office',words:['经理','同事','开会','加班','请假','报告'],sentences:[
{cn:'经理，我今天想请假。',py:'Jīnglǐ, wǒ jīntiān xiǎng qǐngjià.',en:'Manager, I would like to ask for leave today.',words:[{h:'经理',p:'jīnglǐ',r:'manager'},{h:'请假',p:'qǐngjià',r:'ask for leave'}]},
]},
{id:1103,title:'Finance & Card',words:['银行','信用卡','刷卡','服务员','菜单'],sentences:[
{cn:'服务员，这里可以刷信用卡吗？',py:'Fúwùyuán, zhèlǐ kěyǐ shuā xìnyòngkǎ ma?',en:'Waiter, can I swipe credit card here?',words:[{h:'服务员',p:'fúwùyuán',r:'waiter'},{h:'刷卡',p:'shuākǎ',r:'swipe card'},{h:'信用卡',p:'xìnyòngkǎ',r:'credit card'}]},
]},
]},
{id:12,title:'HSK3 · Logic & Feelings',color:'var(--orange)',lessons:[
{id:1201,title:'Logical Choices',words:['不但','而且','或者','除了','选择','决定'],sentences:[
{cn:'我不但喜欢中文，而且喜欢历史。',py:'Wǒ búdàn xǐhuan zhōngwén, érqiě xǐhuan lìshǐ.',en:'I not only like Chinese, but also like history.',words:[{h:'不但',p:'búdàn',r:'not only'},{h:'而且',p:'érqiě',r:'but also'}]},
]},
{id:1202,title:'Feelings & Concerns',words:['难受','着急','紧张','害怕','放心'],sentences:[
{cn:'明天要考试，我很紧张。',py:'Míngtiān yào kǎoshì, wǒ hěn jǐnzhāng.',en:'There is an exam tomorrow, I am very nervous.',words:[{h:'紧张',p:'jǐnzhāng',r:'nervous'}]},
]},
{id:1203,title:'Direction & Results',words:['起来','出来','完成','解决','成功'],sentences:[
{cn:'我们终于成功解决了这个问题。',py:'Wǒmen zhōngyú chénggōng jiějué le zhège wèntí.',en:'We finally successfully resolved this issue.',words:[{h:'成功',p:'chénggōng',r:'succeeded'},{h:'解决',p:'jiějué',r:'resolved'},{h:'问题',p:'wèntí',r:'issue'}]},
]},
]},
];
const GRAMMAR=[
{id:1,title:'Basic Word Order',rule:'Subject + Verb + Object',emoji:'📐',examples:[
{cn:'我喝茶。',py:'Wǒ hē chá.',en:'I drink tea.',parts:[{h:'我',r:'S',c:0},{h:'喝',r:'V',c:1},{h:'茶',r:'O',c:2}]},
{cn:'她看书。',py:'Tā kàn shū.',en:'She reads books.',parts:[{h:'她',r:'S',c:0},{h:'看',r:'V',c:1},{h:'书',r:'O',c:2}]},
],tip:'Chinese word order is similar to English: Subject + Verb + Object. 我(I) 吃(eat) 饭(rice).'},
{id:2,title:'Negation with 不',rule:'Subject + 不 + Verb',emoji:'🚫',examples:[
{cn:'我不喝咖啡。',py:'Wǒ bù hē kāfēi.',en:"I don't drink coffee.",parts:[{h:'我',r:'S',c:0},{h:'不',r:'NEG',c:3},{h:'喝',r:'V',c:1},{h:'咖啡',r:'O',c:2}]},
],tip:'不 (bù) negates present and future actions. Use 没 (méi) for past actions.'},
{id:3,title:'Questions with 吗',rule:'Statement + 吗？',emoji:'❓',examples:[
{cn:'你是学生吗？',py:'Nǐ shì xuéshēng ma?',en:'Are you a student?',parts:[{h:'你',r:'S',c:0},{h:'是',r:'V',c:1},{h:'学生',r:'O',c:2},{h:'吗',r:'Q',c:3}]},
],tip:'Add 吗 at the end of any statement to make it a yes/no question. Super easy!'},
{id:4,title:'Possessive 的',rule:'Owner + 的 + Thing',emoji:'👤',examples:[
{cn:'这是我的书。',py:'Zhè shì wǒ de shū.',en:'This is my book.',parts:[{h:'这',r:'S',c:0},{h:'是',r:'V',c:1},{h:'我',r:'Owner',c:4},{h:'的',r:'DE',c:3},{h:'书',r:'Thing',c:2}]},
],tip:'的 works like apostrophe-s in English. 我的 = my, 你的 = your, 他的 = his.'},
{id:5,title:'Measure Words',rule:'Number + Measure Word + Noun',emoji:'📏',examples:[
{cn:'三个人',py:'sān gè rén',en:'three people',parts:[{h:'三',r:'Num',c:0},{h:'个',r:'MW',c:3},{h:'人',r:'Noun',c:2}]},
],tip:'个 (gè) is the most common measure word. When in doubt, use 个!'},
{id:6,title:'Time Placement',rule:'Subject + Time + Verb',emoji:'⏰',examples:[
{cn:'我明天去学校。',py:'Wǒ míngtiān qù xuéxiào.',en:'I go to school tomorrow.',parts:[{h:'我',r:'S',c:0},{h:'明天',r:'Time',c:5},{h:'去',r:'V',c:1},{h:'学校',r:'Place',c:2}]},
],tip:'Time words go BEFORE the verb in Chinese, not at the end like English.'},
{id:7,title:'了 Completed Action',rule:'Subject + Verb + 了 + Object',level:'HSK2',examples:[
{cn:'我吃了三个苹果。',py:'Wǒ chī le sān gè píngguǒ.',en:'I ate three apples.',parts:[{h:'我',r:'S',c:0},{h:'吃',r:'V',c:1},{h:'了',r:'ASP',c:3},{h:'三个',r:'Num',c:5},{h:'苹果',r:'O',c:2}]},
{cn:'他去了中国。',py:'Tā qù le zhōngguó.',en:'He went to China.',parts:[{h:'他',r:'S',c:0},{h:'去',r:'V',c:1},{h:'了',r:'ASP',c:3},{h:'中国',r:'O',c:2}]},
],tip:'了 (le) after a verb means the action is completed. Think of it as past tense! But careful — 了 is NOT always past tense. It marks "change of state" too.'},
{id:8,title:'过 Experience',rule:'Subject + Verb + 过 + Object',level:'HSK2',examples:[
{cn:'我去过中国。',py:'Wǒ qù guò zhōngguó.',en:'I have been to China.',parts:[{h:'我',r:'S',c:0},{h:'去',r:'V',c:1},{h:'过',r:'EXP',c:4},{h:'中国',r:'O',c:2}]},
],tip:'过 (guò) means you\'ve experienced something at least once. "I\'ve eaten it before" = 我吃过. It\'s about life experience!'},
{id:9,title:'正在 Ongoing Action',rule:'Subject + 正在 + Verb',level:'HSK2',examples:[
{cn:'他正在吃饭。',py:'Tā zhèngzài chīfàn.',en:'He is eating right now.',parts:[{h:'他',r:'S',c:0},{h:'正在',r:'PROG',c:5},{h:'吃饭',r:'V',c:1}]},
{cn:'我正在学中文。',py:'Wǒ zhèngzài xué zhōngwén.',en:'I am studying Chinese right now.',parts:[{h:'我',r:'S',c:0},{h:'正在',r:'PROG',c:5},{h:'学',r:'V',c:1},{h:'中文',r:'O',c:2}]},
],tip:'正在 = "right now, in the middle of doing." Like English "-ing"! You can also use just 在: 我在吃饭 = I\'m eating.'},
{id:10,title:'比 Comparisons',rule:'A + 比 + B + Adjective',level:'HSK2',examples:[
{cn:'他比我高。',py:'Tā bǐ wǒ gāo.',en:'He is taller than me.',parts:[{h:'他',r:'A',c:0},{h:'比',r:'COMP',c:3},{h:'我',r:'B',c:4},{h:'高',r:'Adj',c:1}]},
{cn:'中文比英文难。',py:'Zhōngwén bǐ yīngwén nán.',en:'Chinese is harder than English.',parts:[{h:'中文',r:'A',c:0},{h:'比',r:'COMP',c:3},{h:'英文',r:'B',c:4},{h:'难',r:'Adj',c:1}]},
],tip:'比 (bǐ) = "compared to." A 比 B + adj. DON\'T use 很 with 比! Never say 他比我很高 ❌'},
{id:11,title:'因为...所以 Because...So',rule:'因为 + Reason, 所以 + Result',level:'HSK2',examples:[
{cn:'因为下雨，所以我不去。',py:'Yīnwèi xiàyǔ, suǒyǐ wǒ bú qù.',en:"Because it's raining, so I won't go.",parts:[{h:'因为',r:'Because',c:0},{h:'下雨',r:'Reason',c:5},{h:'所以',r:'So',c:3},{h:'我',r:'S',c:4},{h:'不去',r:'Result',c:1}]},
],tip:'因为...所以 is "because...therefore." In Chinese you can use BOTH words together (unlike English where you pick one). You can also drop either half!'},
{id:12,title:'虽然...但是 Although...But',rule:'虽然 + Fact, 但是 + Contrast',level:'HSK2',examples:[
{cn:'虽然很难，但是很有意思。',py:'Suīrán hěn nán, dànshì hěn yǒu yìsi.',en:'Although difficult, but very interesting.',parts:[{h:'虽然',r:'Although',c:0},{h:'很难',r:'Fact',c:3},{h:'但是',r:'But',c:4},{h:'很有意思',r:'Contrast',c:1}]},
],tip:'虽然...但是 = "although...but." Fun fact: In Chinese you CAN use both "although" AND "but" in the same sentence — English says that\'s wrong, Chinese says it\'s perfect!'},
{id:13,title:'把 (bǎ) Construction',rule:'Subject + 把 + Object + Verb + Action',level:'HSK3',examples:[
{cn:'我把书看了。',py:'Wǒ bǎ shū kàn le.',en:'I read the book.',parts:[{h:'我',r:'S',c:0},{h:'把',r:'BA',c:4},{h:'书',r:'O',c:2},{h:'看',r:'V',c:1},{h:'了',r:'ASP',c:3}]},
{cn:'请把门关上。',py:'Qǐng bǎ mén guān shàng.',en:'Please close the door.',parts:[{h:'请',r:'Please',c:0},{h:'把',r:'BA',c:4},{h:'门',r:'O',c:2},{h:'关上',r:'V',c:1}]},
],tip:'The 把 (bǎ) structure is used to emphasize what happens to the object. "Subject took Object and did Verb to it."'},
{id:14,title:'被 (bèi) Passive',rule:'Object + 被 + (Subject) + Verb',level:'HSK3',examples:[
{cn:'苹果被他吃了。',py:'Píngguǒ bèi tā chī le.',en:'The apple was eaten by him.',parts:[{h:'苹果',r:'O',c:2},{h:'被',r:'BEI',c:4},{h:'他',r:'S',c:0},{h:'吃了',r:'V',c:1}]},
],tip:'被 (bèi) is used for passive voice, often for negative things ("was eaten," "was stolen").'},
{id:15,title:'越...越 (The more...the more)',rule:'越 + A + 越 + B',level:'HSK3',examples:[
{cn:'他越吃越胖。',py:'Tā yuè chī yuè pàng.',en:'The more he eats, the fatter he gets.',parts:[{h:'他',r:'S',c:0},{h:'越',r:'More',c:4},{h:'吃',r:'V',c:1},{h:'越',r:'More',c:4},{h:'胖',r:'Adj',c:2}]},
],tip:'Use 越...越... (yuè...yuè...) to say "the more X, the more Y."'},
{id:16,title:'如果...就 (If...then)',rule:'如果 + Condition, 就 + Result',level:'HSK3',examples:[
{cn:'如果下雨，我就不去。',py:'Rúguǒ xiàyǔ, wǒ jiù bú qù.',en:"If it rains, then I won't go.",parts:[{h:'如果',r:'If',c:0},{h:'下雨',r:'Cond',c:2},{h:'我',r:'S',c:4},{h:'就',r:'Then',c:3},{h:'不去',r:'Result',c:1}]},
{cn:'如果你努力，就会成功。',py:'Rúguǒ nǐ nǔlì, jiù huì chénggōng.',en:'If you work hard, you will succeed.',parts:[{h:'如果',r:'If',c:0},{h:'你',r:'S',c:4},{h:'努力',r:'Cond',c:2},{h:'就',r:'Then',c:3},{h:'会成功',r:'Result',c:1}]},
],tip:'如果 (rúguǒ) means "if," and it often pairs with 就 (jiù) meaning "then" in the next clause.'},
{id:17,title:'一边...一边 (Simultaneous)',rule:'一边 + Verb 1, 一边 + Verb 2',level:'HSK3',examples:[
{cn:'他一边吃饭，一边看电视。',py:'Tā yìbiān chīfàn, yìbiān kàn diànshì.',en:'He is eating while watching TV.',parts:[{h:'他',r:'S',c:0},{h:'一边',r:'While',c:4},{h:'吃饭',r:'V1',c:1},{h:'一边',r:'While',c:4},{h:'看电视',r:'V2',c:2}]},
{cn:'她一边唱歌，一边跳舞。',py:'Tā yìbiān chànggē, yìbiān tiàowǔ.',en:'She is singing while dancing.',parts:[{h:'她',r:'S',c:0},{h:'一边',r:'While',c:4},{h:'唱歌',r:'V1',c:1},{h:'一边',r:'While',c:4},{h:'跳舞',r:'V2',c:2}]},
],tip:'一边 (yìbiān) is used for doing two actions at the exact same time. "While doing A, doing B."'},
{id:18,title:'连...都 (Even...)',rule:'连 + Extreme Case + 都 + Verb',level:'HSK3',examples:[
{cn:'这个问题连老师都不知道。',py:'Zhège wèntí lián lǎoshī dōu bù zhīdào.',en:'Even the teacher does not know this question.',parts:[{h:'这个问题',r:'Topic',c:2},{h:'连',r:'Even',c:4},{h:'老师',r:'S',c:0},{h:'都',r:'Also',c:3},{h:'不知道',r:'V',c:1}]},
{cn:'连小孩子都会说"你好"。',py:'Lián xiǎo háizi dōu huì shuō "nǐ hǎo".',en:'Even small children can say "hello".',parts:[{h:'连',r:'Even',c:4},{h:'小孩子',r:'S',c:0},{h:'都',r:'Also',c:3},{h:'会说',r:'V',c:1}]},
],tip:'连...都/也 (lián...dōu/yě) emphasizes an extreme case. "Even X does Y."'},
{id:19,title:'是...的 (Emphasizing Past)',rule:'是 + [Focus] + 的',level:'HSK2',examples:[
{cn:'他是昨天来的。',py:'Tā shì zuótiān lái de.',en:'He came yesterday (emphasizing when).',parts:[{h:'他',r:'S',c:0},{h:'是',r:'V',c:1},{h:'昨天',r:'T',c:5},{h:'来',r:'V',c:1},{h:'的',r:'ASP',c:3}]},
{cn:'这件衣服是在网上买的。',py:'Zhè jiàn yīfu shì zài wǎngshàng mǎi de.',en:'This clothes was bought online (emphasizing where).',parts:[{h:'这件衣服',r:'S',c:0},{h:'是',r:'V',c:1},{h:'在网上',r:'Place',c:5},{h:'买',r:'V',c:1},{h:'的',r:'ASP',c:3}]},
],tip:'是...的 highlights HOW, WHERE, WHEN or WHO did something in the past. The action already happened — you\'re just emphasizing a detail!'},
{id:20,title:'被 (bèi) Passive',rule:'Object + 被 + (Subject) + Verb',level:'HSK3',examples:[
{cn:'苹果被他吃了。',py:'Píngguǒ bèi tā chī le.',en:'The apple was eaten by him.',parts:[{h:'苹果',r:'O',c:2},{h:'被',r:'BEI',c:4},{h:'他',r:'S',c:0},{h:'吃了',r:'V',c:1}]},
{cn:'我的自行车被人偷了。',py:'Wǒ de zìxíngchē bèi rén tōu le.',en:'My bicycle was stolen.',parts:[{h:'我的自行车',r:'O',c:2},{h:'被',r:'BEI',c:4},{h:'人',r:'S',c:0},{h:'偷了',r:'V',c:1}]},
],tip:'被 (bèi) is used for passive voice, often for negative things ("was eaten," "was stolen"). The receiver of the action comes first!'},
{id:21,title:'把 (bǎ) Construction',rule:'Subject + 把 + Object + Verb + Result',level:'HSK3',examples:[
{cn:'我把书看了。',py:'Wǒ bǎ shū kàn le.',en:'I read the book (through).',parts:[{h:'我',r:'S',c:0},{h:'把',r:'BA',c:4},{h:'书',r:'O',c:2},{h:'看',r:'V',c:1},{h:'了',r:'ASP',c:3}]},
{cn:'请把门关上。',py:'Qǐng bǎ mén guān shàng.',en:'Please close the door.',parts:[{h:'请',r:'S',c:0},{h:'把',r:'BA',c:4},{h:'门',r:'O',c:2},{h:'关上',r:'V',c:1}]},
{cn:'我把手机放在桌子上。',py:'Wǒ bǎ shǒujī fàng zài zhuōzi shàng.',en:'I put the phone on the table.',parts:[{h:'我',r:'S',c:0},{h:'把',r:'BA',c:4},{h:'手机',r:'O',c:2},{h:'放',r:'V',c:1},{h:'在桌子上',r:'Place',c:5}]},
],tip:'把 (bǎ) says "Subject took Object and did V to it." It must always show a RESULT or completion — never use 把 with simple actions!'},
{id:22,title:'越...越 (The more...the more)',rule:'越 + A + 越 + B',level:'HSK3',examples:[
{cn:'他越吃越胖。',py:'Tā yuè chī yuè pàng.',en:'The more he eats, the fatter he gets.',parts:[{h:'他',r:'S',c:0},{h:'越',r:'More',c:4},{h:'吃',r:'V',c:1},{h:'越',r:'More',c:4},{h:'胖',r:'Adj',c:2}]},
{cn:'这本书越看越有意思。',py:'Zhè běn shū yuè kàn yuè yǒu yìsi.',en:'The more you read this book, the more interesting it gets.',parts:[{h:'这本书',r:'O',c:2},{h:'越',r:'More',c:4},{h:'看',r:'V',c:1},{h:'越',r:'More',c:4},{h:'有意思',r:'Adj',c:2}]},
],tip:'越...越 (yuè...yuè) means "the more X, the more Y." Great for dramatic descriptions!'},
{id:23,title:'好...极了 / 极 (Extremely)',rule:'好 / Adj + 极了',level:'HSK2',examples:[
{cn:'今天热极了！',py:'Jīntiān rè jí le!',en:'Today is extremely hot!',parts:[{h:'今天',r:'T',c:5},{h:'热',r:'Adj',c:1},{h:'极了',r:'EXP',c:4}]},
{cn:'这个菜好吃极了！',py:'Zhège cài hǎochī jí le!',en:'This dish is absolutely delicious!',parts:[{h:'这个菜',r:'S',c:0},{h:'好吃',r:'Adj',c:1},{h:'极了',r:'EXP',c:4}]},
],tip:'极了 (jí le) at the end of an adjective = "extremely/absolutely." Much stronger than 很! Like saying "ridiculously good."'},
{id:24,title:'快要...了 (About to)',rule:'快要 + Verb + 了',level:'HSK2',examples:[
{cn:'快要下雨了。',py:'Kuàiyào xiàyǔ le.',en:"It's about to rain.",parts:[{h:'快要',r:'ASP',c:3},{h:'下雨',r:'V',c:1},{h:'了',r:'ASP',c:3}]},
{cn:'我快要毕业了！',py:'Wǒ kuàiyào bìyè le!',en:"I'm about to graduate!",parts:[{h:'我',r:'S',c:0},{h:'快要',r:'ASP',c:3},{h:'毕业',r:'V',c:1},{h:'了',r:'ASP',c:3}]},
],tip:'快要...了 = "about to, soon." It signals something is IMMINENT — happening very soon. The 了 at the end shows a change in situation!'},
{id:25,title:'再 vs 又 (Again)',rule:'再 = future again · 又 = past again',level:'HSK2',examples:[
{cn:'请再说一遍。',py:'Qǐng zài shuō yíbiàn.',en:'Please say it again (request).',parts:[{h:'请',r:'S',c:0},{h:'再',r:'ASP',c:3},{h:'说',r:'V',c:1},{h:'一遍',r:'O',c:2}]},
{cn:'她又迟到了！',py:'Tā yòu chídào le!',en:'She is late again (she was late before)!',parts:[{h:'她',r:'S',c:0},{h:'又',r:'ASP',c:3},{h:'迟到',r:'V',c:1},{h:'了',r:'ASP',c:3}]},
],tip:'再 = will do again (future/request). 又 = did again (already happened). Don\'t mix them up! "再见" uses 再 because you\'ll see them AGAIN later.'},
{id:26,title:'太...了 (Too much)',rule:'太 + Adjective + 了',level:'HSK1',examples:[
{cn:'这个太贵了！',py:'Zhège tài guì le!',en:"This is too expensive!",parts:[{h:'这个',r:'S',c:0},{h:'太',r:'NEG',c:3},{h:'贵',r:'Adj',c:1},{h:'了',r:'ASP',c:3}]},
{cn:'太好了！',py:'Tài hǎo le!',en:'Great! / Excellent! (lit. Too good!)',parts:[{h:'太',r:'NEG',c:3},{h:'好',r:'Adj',c:1},{h:'了',r:'ASP',c:3}]},
],tip:'太...了 = "too" but in Chinese it can be POSITIVE too! "太好了" = "Excellent!" (literally "too good"). Context makes it positive or negative.'},
{id:27,title:'只要...就 (As long as)',rule:'只要 + Condition + 就 + Result',level:'HSK3',examples:[
{cn:'只要你努力，就会成功。',py:'Zhǐyào nǐ nǔlì, jiù huì chénggōng.',en:'As long as you work hard, you will succeed.',parts:[{h:'只要',r:'If',c:0},{h:'你',r:'S',c:4},{h:'努力',r:'Cond',c:2},{h:'就',r:'Then',c:3},{h:'会成功',r:'Result',c:1}]},
{cn:'只要有你，我就幸福。',py:'Zhǐyào yǒu nǐ, wǒ jiù xìngfú.',en:'As long as I have you, I am happy.',parts:[{h:'只要',r:'If',c:0},{h:'有你',r:'Cond',c:2},{h:'我',r:'S',c:4},{h:'就',r:'Then',c:3},{h:'幸福',r:'Result',c:1}]},
],tip:'只要...就 = "as long as...then." A softer condition than 如果 — it says any single condition is enough to guarantee the result.'},
{id:28,title:'对...来说 (From X\'s perspective)',rule:'对 + Person + 来说 + statement',level:'HSK3',examples:[
{cn:'对我来说，学中文很有趣。',py:'Duì wǒ lái shuō, xué zhōngwén hěn yǒuqù.',en:'For me, learning Chinese is very interesting.',parts:[{h:'对',r:'Place',c:5},{h:'我',r:'S',c:0},{h:'来说',r:'V',c:1},{h:'学中文',r:'O',c:2},{h:'很有趣',r:'Adj',c:4}]},
{cn:'对孩子们来说，玩很重要。',py:'Duì háizimen lái shuō, wán hěn zhòngyào.',en:'For children, playing is very important.',parts:[{h:'对',r:'Place',c:5},{h:'孩子们',r:'S',c:0},{h:'来说',r:'V',c:1},{h:'玩',r:'O',c:2},{h:'很重要',r:'Adj',c:4}]},
],tip:'对...来说 = "from the perspective of / for." Use it to introduce someone\'s point of view elegantly.'}
];
const CONVOS=[
{id:1,title:'Morning Routine',emoji:'🌅',turns:[
{s:'A',cn:'早上好！',py:'Zǎoshang hǎo!',en:'Good morning!'},
{s:'B',cn:'早上好！你今天怎么样？',py:'Zǎoshang hǎo! Nǐ jīntiān zěnmeyàng?',en:'Good morning! How are you today?'},
{s:'A',cn:'我很好，谢谢！你呢？',py:'Wǒ hěn hǎo, xièxie! Nǐ ne?',en:"I'm great, thanks! And you?"},
{s:'B',cn:'我也很好！今天天气不错。',py:'Wǒ yě hěn hǎo! Jīntiān tiānqì búcuò.',en:"I'm good too! The weather is nice today."},
{s:'A',cn:'是的，我想出去走走。你有什么计划？',py:'Shì de, wǒ xiǎng chūqù zǒuzou. Nǐ yǒu shénme jìhuà?',en:'Yes, I want to go out for a walk. What plans do you have?'},
{s:'B',cn:'我打算去买点新鲜水果，然后去公园看书。',py:'Wǒ dǎsuàn qù mǎi diǎn xīnxiān shuǐguǒ, ránhòu qù gōngyuán kànshū.',en:'I plan to buy some fresh fruit, then go to the park to read a book.'},
{s:'A',cn:'太棒了！我们可以一起去公园！',py:'Tài bàng le! Wǒmen kěyǐ yìqǐ qù gōngyuán!',en:'Awesome! We can go to the park together!'},
{s:'B',cn:'好啊，那我们半小时后在门口见面吧。',py:'Hǎo a, nà wǒmen bàn xiǎoshí hòu zài ménkǒu jiànmiàn ba.',en:'Sure, let\'s meet at the entrance in half an hour.'},
]},
{id:2,title:'Meeting Someone New',emoji:'🤝',turns:[
{s:'A',cn:'你好！我叫小明。',py:'Nǐ hǎo! Wǒ jiào Xiǎomíng.',en:'Hello! My name is Xiaoming.'},
{s:'B',cn:'你好，小明！我叫小红。很高兴认识你！',py:'Nǐ hǎo, Xiǎomíng! Wǒ jiào Xiǎohóng. Hěn gāoxìng rènshi nǐ!',en:'Hi Xiaoming! I am Xiaohong. Nice to meet you!'},
{s:'A',cn:'你是哪国人？',py:'Nǐ shì nǎ guó rén?',en:'Where are you from?'},
{s:'B',cn:'我是中国人。你呢？',py:'Wǒ shì zhōngguó rén. Nǐ ne?',en:"I'm Chinese. And you?"},
{s:'A',cn:'我是摩洛哥人。我叫茉莉花。',py:'Wǒ shì móluògē rén. Wǒ jiào Mòlìhuā.',en:'I am Moroccan. My name is Yasmen.'},
{s:'B',cn:'哇，摩洛哥是一个非常美丽的国家！',py:'Wa, móluògē shì yígè fēicháng měilì de guójiā!',en:'Wow, Morocco is a very beautiful country!'},
{s:'A',cn:'谢谢你的夸奖！欢迎你以后来摩洛哥玩。',py:'Xièxie nǐ de kuājiǎng! Huānyíng nǐ yǐhòu lái móluògē wán.',en:'Thanks for your compliment! Welcome to visit Morocco in the future.'},
{s:'B',cn:'太好了，我一直很想去撒哈拉沙漠！',py:'Tài hǎo le, wǒ yìzhí hěn xiǎng qù sāhālà shāmò!',en:'Great, I have always wanted to go to the Sahara Desert!'},
]},
{id:3,title:'At the Café',emoji:'☕',turns:[
{s:'A',cn:'你好，我想喝一杯咖啡。',py:'Nǐ hǎo, wǒ xiǎng hē yì bēi kāfēi.',en:'Hello, I would like a coffee.'},
{s:'B',cn:'好的！你要大杯还是小杯？',py:'Hǎo de! Nǐ yào dà bēi háishì xiǎo bēi?',en:'Sure! Do you want large or small?'},
{s:'A',cn:'大杯，谢谢。多少钱？',py:'Dà bēi, xièxie. Duōshao qián?',en:'Large, thanks. How much?'},
{s:'B',cn:'十五块。你还需要点什么点心吗？',py:'Shíwǔ kuài. Nǐ hái xūyào diǎn shénme diǎnxīn ma?',en:'15 yuan. Do you need any pastries?'},
{s:'A',cn:'这块巧克力蛋糕看起来不错，多少钱？',py:'Zhè kuài qiǎokèlì dàngāo kànqǐlái búcuò, duōshao qián?',en:'This chocolate cake looks good, how much is it?'},
{s:'B',cn:'那个是十二块。今天买咖啡和蛋糕可以打折。',py:'Nàge shì shí\'èr kuài. Jīntiān mǎi kāfēi hé dàngāo kěyǐ dǎzhé.',en:'That one is 12 yuan. Buying coffee and cake today gives a discount.'},
{s:'A',cn:'好的，那我也要一块巧克力蛋糕，谢谢。',py:'Hǎo de, nà wǒ yě yào yí kuài qiǎokèlì dàngāo, xièxie.',en:'Okay, then I will also take a piece of chocolate cake, thank you.'},
{s:'B',cn:'一共二十五块，请这边扫码付款。',py:'Yígòng èrshíwǔ kuài, qǐng zhèbiān sǎo mǎ fùkuǎn.',en:'That is 25 yuan in total, please scan the code to pay here.'},
]},
{id:4,title:'Asking for Directions',emoji:'🗺️',turns:[
{s:'A',cn:'请问，地铁站在哪儿？',py:'Qǐngwèn, dìtiě zhàn zài nǎr?',en:'Excuse me, where is the subway station?'},
{s:'B',cn:'往前走，然后左转。',py:'Wǎng qián zǒu, ránhòu zuǒ zhuǎn.',en:'Go straight, then turn left.'},
{s:'A',cn:'远不远？',py:'Yuǎn bù yuǎn?',en:'Is it far?'},
{s:'B',cn:'不远，走五分钟就到了。',py:'Bù yuǎn, zǒu wǔ fēnzhōng jiù dào le.',en:'Not far, 5 minutes walking.'},
{s:'A',cn:'附近有银行吗？我想取点现金。',py:'Fùjìn yǒu yínháng ma? Wǒ xiǎng qǔ diǎn xiànjīn.',en:'Is there a bank nearby? I want to withdraw some cash.'},
{s:'B',cn:'有的，地铁站旁边就有一家中国银行。',py:'Yǒu de, dìtiě zhàn pángbiān jiù yǒu yì jiā zhōngguó yínháng.',en:'Yes, right next to the subway station there is a Bank of China.'},
{s:'A',cn:'太方便了，非常感谢你的热心帮助！',py:'Tài fāngbiàn le, fēicháng gǎnxiè nǐ de rèxīn bāngzhù!',en:'That is so convenient, thank you very much for your kind help!'},
{s:'B',cn:'不用客气，祝你今天过得愉快！',py:'Bú yòng kèqi, zhù nǐ jīntiān guò de yúkuài!',en:'You are welcome, have a great day!'},
]},
{id:5,title:'Talking About Hobbies',emoji:'🎨',turns:[
{s:'A',cn:'你喜欢做什么？',py:'Nǐ xǐhuan zuò shénme?',en:'What do you like to do?'},
{s:'B',cn:'我喜欢看电影和听音乐。你呢？',py:'Wǒ xǐhuan kàn diànyǐng hé tīng yīnyuè. Nǐ ne?',en:'I like watching movies and listening to music. You?'},
{s:'A',cn:'我喜欢学中文！',py:'Wǒ xǐhuan xué zhōngwén!',en:'I like learning Chinese!'},
{s:'B',cn:'太好了！你的中文很好！',py:'Tài hǎo le! Nǐ de zhōngwén hěn hǎo!',en:'Great! Your Chinese is very good!'},
{s:'A',cn:'其实我每天都会跟AI老师聊天练习。',py:'Qíshí wǒ měitiān dū huì gēn AI lǎoshī liáotiān liànxí.',en:'Actually I chat with an AI teacher every day to practice.'},
{s:'B',cn:'怪不得你的口音这么标准！我也想试试。',py:'Guàibùdé nǐ de kǒuyīn zhème biāozhǔn! Wǒ yě xiǎng shìshi.',en:'No wonder your accent is so standard! I want to try too.'},
{s:'A',cn:'好啊，我可以把这个神奇的平台推荐给你！',py:'Hǎo a, wǒ kěyǐ bǎ zhège shénqí de píngtái tuījiàn gěi nǐ!',en:'Sure, I can recommend this amazing platform to you!'},
{s:'B',cn:'太感谢你了，我很期待开始学中文。',py:'Tài gǎnxiè nǐ le, wǒ hěn qīdài kāishǐ xué中文。',en:'Thank you so much, I look forward to starting my Chinese studies.'},
]},
{id:6,title:'Making Plans',emoji:'📅',turns:[
{s:'A',cn:'你明天有空吗？',py:'Nǐ míngtiān yǒu kòng ma?',en:'Are you free tomorrow?'},
{s:'B',cn:'有空！你想做什么？',py:'Yǒu kòng! Nǐ xiǎng zuò shénme?',en:'Yes! What do you want to do?'},
{s:'A',cn:'我们去看电影吧！',py:'Wǒmen qù kàn diànyǐng ba!',en:"Let's go watch a movie!"},
{s:'B',cn:'好啊！几点见？',py:'Hǎo a! Jǐ diǎn jiàn?',en:'Sure! What time?'},
{s:'A',cn:'下午三点怎么样？我们在电影院门口见面。',py:'Xiàwǔ sān diǎn zěnmeyàng? Wǒmen zài diànyǐngyuàn ménkǒu jiànmiàn.',en:'How about 3:00 PM? We meet at the cinema entrance.'},
{s:'B',cn:'三点没问题。那部新科幻片特别好看。',py:'Sān diǎn méi wèntǐ. Nà bù xīn kēhuàn piàn tèbié hǎokàn.',en:'3:00 is fine. That new sci-fi movie is supposed to be really good.'},
{s:'A',cn:'好的，那我去提前买票。',py:'Hǎo de, nà wǒ qù tíqián mǎi piào.',en:'Okay, then I will go buy the tickets in advance.'},
{s:'B',cn:'太好了，那我买爆米花和可乐！明天见！',py:'Tài hǎo le, nà wǒ mǎi bàomǐhuā hé kělè! Míngtiān jiàn!',en:'Awesome, then I will buy popcorn and cola! See you tomorrow!'},
]},
{id:7,title:'At the Doctor',emoji:'🏥',turns:[
{s:'A',cn:'医生，我不舒服。',py:'Yīshēng, wǒ bù shūfu.',en:"Doctor, I don't feel well."},
{s:'B',cn:'哪里不舒服？',py:'Nǎlǐ bù shūfu?',en:'Where does it hurt?'},
{s:'A',cn:'我头疼，还有点儿发烧。',py:'Wǒ tóu téng, hái yǒudiǎnr fāshāo.',en:'I have a headache and a slight fever.'},
{s:'B',cn:'好，我给你开一些药。多喝水，多休息。',py:'Hǎo, wǒ gěi nǐ kāi yìxiē yào. Duō hē shuǐ, duō xiūxi.',en:"OK, I'll prescribe some medicine. Drink more water, rest more."},
{s:'A',cn:'医生，我需要吃几天药？',py:'Yīshēng, wǒ xūyào chī jǐ tiān yào?',en:'Doctor, how many days do I need to take the medicine?'},
{s:'B',cn:'吃三天就可以了。如果三天后还是不舒服，再来找我。',py:'Chī sān tiān jiù kěyǐ le. Rúguǒ sān tiān hòu háishì bù shūfu, zài lái zhǎo wǒ.',en:'Taking it for three days is enough. If you still feel unwell after three days, come back to see me.'},
{s:'A',cn:'好的，我一定会按时吃药和好好休息的。',py:'Hǎo de, wǒ yídìng huì ànshí chī yào hé hǎohāo xiūxi de.',en:'Okay, I will definitely take my medicine on time and rest well.'},
{s:'B',cn:'别担心，好好保养，你很快就会好起来的。',py:'Bié dānxīn, hǎohāo bǎoyǎng, nǐ hěn kuài jiù huì hǎo qǐlái de.',en:'Don\'t worry, take good care, you will get better very soon.'},
]},
{id:8,title:'Shopping for Clothes',emoji:'👗',turns:[
{s:'A',cn:'这件衣服多少钱？',py:'Zhè jiàn yīfu duōshao qián?',en:'How much is this clothing?'},
{s:'B',cn:'两百块。',py:'Liǎng bǎi kuài.',en:'200 yuan.'},
{s:'A',cn:'太贵了！便宜一点儿可以吗？',py:'Tài guì le! Piányi yìdiǎnr kěyǐ ma?',en:'Too expensive! Can you make it cheaper?'},
{s:'B',cn:'好吧，一百五。这是最低价格了。',py:'Hǎo ba, yìbǎi wǔ. Zhè  shì zuìdī jiàgé le.',en:'Okay, 150. This is the lowest price.'},
{s:'A',cn:'请问这件有蓝色的吗？我喜欢蓝色。',py:'Qǐngwèn zhè jiàn yǒu lánsè de ma? Wǒ xǐhuan lánsè.',en:'Is there a blue version of this? I like blue.'},
{s:'B',cn:'有的，请稍等，我去库房给你拿一件蓝色的中码。',py:'Yǒu de, qǐng shāoděng, wǒ qù kùfáng gěi nǐ ná yí jiàn lánsè de zhōng mǎ.',en:'Yes, please wait a moment, I will go to the storeroom to get a blue one in medium size.'},
{s:'A',cn:'好的，如果合适的话，我就买下它。',py:'Hǎo de, rúguǒ héshì de huà, wǒ jiù mǎi xià tā.',en:'Great, if it fits, I will buy it.'},
{s:'B',cn:'没问题，试衣间就在那边，你可以试穿。',py:'Méi wèntǐ, shìyījiān jiù zài nàbiān, nǐ kěyǐ shìchuān.',en:'No problem, the fitting room is right over there, you can try it on.'},
]},
{id:9,title:'Phone Call',emoji:'📱',turns:[
{s:'A',cn:'喂？你在哪儿？',py:'Wèi? Nǐ zài nǎr?',en:'Hello? Where are you?'},
{s:'B',cn:'我在家。怎么了？',py:'Wǒ zài jiā. Zěnme le?',en:"I'm at home. What's up?"},
{s:'A',cn:'我们今天晚上一起吃饭吧！',py:'Wǒmen jīntiān wǎnshang yìqǐ chīfàn ba!',en:"Let's have dinner together tonight!"},
{s:'B',cn:'好啊！在哪儿吃？',py:'Hǎo a! Zài nǎr chī?',en:'Sure! Where?'},
{s:'A',cn:'去我们上次去过的那家火锅店吧，特别美味！',py:'Qù wǒmen shàngcì qù guò de nà jiā huǒguō diàn ba, tèbié měiwèi!',en:'Let\'s go to the hotpot restaurant we visited last time, it was delicious!'},
{s:'B',cn:'太好了，我正想吃火锅呢。几点出发？',py:'Tài hǎo le, wǒ zhèng xiǎng chī huǒguō ne. Jǐ diǎn chūfā?',en:'Awesome, I am just in the mood for hotpot. What time do we set off?'},
{s:'A',cn:'下午六点半在店门口碰头，可以吗？',py:'Xiàwǔ liù diǎn bàn zài diàn ménkǒu pèngtóu, kěyǐ ma?',en:'How about meeting in front of the restaurant at 6:30 PM?'},
{s:'B',cn:'没问题，我会准时到的，到时见！',py:'Méi wèntǐ, wǒ huì zhǔnshí dào de, dào shí jiàn!',en:'No problem, I will be on time. See you then!'},
]},
{id:10,title:'Complimenting Someone',emoji:'🌟',turns:[
{s:'A',cn:'你今天很漂亮！',py:'Nǐ jīntiān hěn piàoliang!',en:'You look beautiful today!'},
{s:'B',cn:'谢谢！你也很帅！',py:'Xièxie! Nǐ yě hěn shuài!',en:'Thanks! You look handsome too!'},
{s:'A',cn:'你的中文说得真好！',py:'Nǐ de zhōngwén shuō de zhēn hǎo!',en:'Your Chinese is really good!'},
{s:'B',cn:'哪里哪里，还要多练习。',py:'Nǎlǐ nǎlǐ, hái yào duō liànxí.',en:"You flatter me, I still need to practice."},
{s:'A',cn:'你的声调和词汇都用得特别准确。',py:'Nǐ de shēngdiào hé cíhuì dōu yòng de tèbié zhǔnquè.',en:'Your tones and vocabulary are used very accurately.'},
{s:'B',cn:'听到你这么说我太开心了，这给了我很多信心！',py:'Tīngdào nǐ zhème shuō wǒ tài kāixīn le, zhè gěi le wǒ hěnduō xìnxīn!',en:'I am so happy to hear you say that, it gives me a lot of confidence!'},
{s:'A',cn:'保持努力，你会成为真正的中文大师！',py:'Bǎochí nǔlì, nǐ huì chéngwéi zhēnzhèng de zhōngwén dàshī!',en:'Keep working hard, you will become a true Chinese master!'},
{s:'B',cn:'借你吉言，我会继续每天在汉语星练习的。',py:'Jiè nǐ jíyán, wǒ huì jìxù měitiān zài hànyǔxīng liànxí de.',en:'Thanks for your blessing, I will keep practicing daily on HanyuXing.'},
]},
{id:11,title:'Weekend Plans',emoji:'🎉',turns:[
{s:'A',cn:'周末你有什么计划？',py:'Zhōumò nǐ yǒu shénme jìhuà?',en:'What are your weekend plans?'},
{s:'B',cn:'我想去旅游。你呢？',py:'Wǒ xiǎng qù lǚyóu. Nǐ ne?',en:'I want to travel. You?'},
{s:'A',cn:'我想在家休息。',py:'Wǒ xiǎng zài jiā xiūxi.',en:'I want to rest at home.'},
{s:'B',cn:'也不错！好好休息。',py:'Yě búcuò! Hǎohāo xiūxi.',en:'Not bad either! Rest well.'},
{s:'A',cn:'你打算去哪里旅游？去大自然还是大城市？',py:'Nǐ dǎsuàn qù nǎlǐ lǚyóu? Qù dàzìrán háishì dà chéngshì?',en:'Where do you plan to travel? To nature or a big city?'},
{s:'B',cn:'我计划去海边，吹吹海风，吃吃新鲜的海鲜。',py:'Wǒ jìhuà qù hǎibiān, chuīchuī hǎifēng, chīchī xīnxiān de hǎixiān.',en:'I plan to go to the seaside, enjoy the breeze, and eat fresh seafood.'},
{s:'A',cn:'听起来太惬意了！祝你旅途愉快，拍很多美丽的照片！',py:'Tīng qǐlái tai qièyì le! Zhù nǐ lǚtú yúkuài, pāi hěnduō měilì de zhàopiān!',en:'Sounds so relaxing! Wish you a great trip and take lots of beautiful photos!'},
{s:'B',cn:'非常感谢！等我回来给你带当地的特色小吃。',py:'Fēicháng gǎnxiè! Děng wǒ huílái gěi nǐ dài dāngdì de tèsè xiǎochī.',en:'Thanks a lot! I will bring you some local specialty snacks when I get back.'},
]},
{id:12,title:'At School',emoji:'🏫',turns:[
{s:'A',cn:'你学什么专业？',py:'Nǐ xué shénme zhuānyè?',en:'What do you study?'},
{s:'B',cn:'我学中文。你呢？',py:'Wǒ xué zhōngwén. Nǐ ne?',en:'I study Chinese. You?'},
{s:'A',cn:'我学计算机。中文难不难？',py:'Wǒ xué jìsuànjī. Zhōngwén nán bù nán?',en:'I study CS. Is Chinese hard?'},
{s:'B',cn:'有点儿难，但是很有意思！',py:'Yǒudiǎnr nán, dànshì hěn yǒu yìsi!',en:'A bit hard, but very interesting!'},
{s:'A',cn:'特别是汉字，写起来就像是画画一样。',py:'Tèbié shì hànzì, xiě qǐlái jiù xiàng shì huàhuà yíyàng.',en:'Especially Chinese characters, writing them is just like drawing pictures.'},
{s:'B',cn:'确实如此！一旦懂了字根，就觉得汉字非常有逻辑。',py:'Quèshí rúcǐ! Yídàn dǒng le zìgēn, jiù juéde hànzì fēicháng yǒu luójí.',en:'Indeed! Once you understand the radicals, characters feel very logical.'},
{s:'A',cn:'我们以后可以互相学习，我教你计算机，你教我中文。',py:'Wǒmen yǐhòu kěyǐ hùxiāng xuéxí, wǒ jiāo nǐ jìsuànjī, nǐ jiāo wǒ中文。',en:'We can learn from each other in the future: I teach you CS, you teach me Chinese.'},
{s:'B',cn:'一言为定！这个主意实在是太棒了！',py:'Yì yán wéi dìng! Zhège zhǔyì shízài shì tài bàng le。',en:'It\'s a deal! That idea is absolutely wonderful!'},
]},
];

const KIDS_STORIES=[
{
  id:1,
  title:'The Boy Who Cried Wolf',
  cnTitle:'狼来了',
  pyTitle:'Láng Lái Le',
  color:'var(--pink)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--pink)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--pink)" stroke-width="3"/>
    <polygon points="28,26 40,36 24,42" fill="#7f8c8d" stroke="#2c3e50" stroke-width="2"/>
    <polygon points="72,26 60,36 76,42" fill="#7f8c8d" stroke="#2c3e50" stroke-width="2"/>
    <circle cx="50" cy="54" r="22" fill="#95a5a6" stroke="#2c3e50" stroke-width="2"/>
    <polygon points="50,54 44,48 56,48" fill="#2c3e50"/>
    <circle cx="42" cy="46" r="3" fill="#2d3436"/><circle cx="58" cy="46" r="3" fill="#2d3436"/>
    <polygon points="46,62 50,56 54,62" fill="#fff"/>
  </svg>`,
  slides:[
    {cn:'以前，有一个放羊的孩子。',py:'Yǐqián, yǒu yígè fàngyáng de háizi.',en:'Long ago, there was a shepherd boy.'},
    {cn:'他每天在山上放羊，觉得很无聊。',py:'Tā měitiān zài shānshàng fàngyáng, juéde hěn wúliáo.',en:'He watched sheep on the hill daily and felt bored.'},
    {cn:'一天，他大喊：“狼来了！狼来了！”',py:'Yìtiān, tā dàhǎn: "Láng lái le! Láng lái le!"',en:'One day, he shouted: "Wolf! Wolf!"'},
    {cn:'农民们跑来帮忙，但是没有狼。',py:'Nóngmínmen pǎo lái bāngmáng, dànshì méiyǒu láng.',en:'Peasants ran to help, but there was no wolf.'},
    {cn:'孩子哈哈大笑，农民们很生气。',py:'Háizi hāhā dàxiào, nóngmínmen hěn shēngqì.',en:'The boy laughed, and the peasants were very angry.'},
    {cn:'后来，狼真的来了，但没人相信他了。',py:'Hòulái, láng zhēn de lái le, dàn méi rén xiāngxìn tā le.',en:'Later, the wolf really came, but no one believed him.'}
  ],
  quiz:{
    q:'Why did the peasants not help the boy in the end?',
    opts:['They were busy','They knew he was lying before','They were afraid of the wolf'],
    a:'They knew he was lying before'
  }
},
{
  id:2,
  title:'The Tortoise and the Hare',
  cnTitle:'龟兔赛跑',
  pyTitle:'Guī Tù Sài Pǎo',
  color:'var(--yellow)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--yellow)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--yellow)" stroke-width="3"/>
    <ellipse cx="40" cy="52" rx="12" ry="16" fill="#fff" stroke="#7f8c8d" stroke-width="2"/>
    <ellipse cx="36" cy="30" rx="4" ry="12" fill="#ffecb3" stroke="#7f8c8d" stroke-width="2"/>
    <ellipse cx="44" cy="30" rx="4" ry="12" fill="#ffecb3" stroke="#7f8c8d" stroke-width="2"/>
    <path d="M54 58 A 12 12 0 0 1 78 58 Z" fill="var(--green)" stroke="var(--green-d)" stroke-width="2"/>
    <circle cx="78" cy="56" r="4" fill="#81c784"/>
  </svg>`,
  slides:[
    {cn:'兔子说：“我跑得最快！”',py:'Tùzi shuō: "Wǒ pǎo de zuì kuài!"',en:'The rabbit said: "I run the fastest!"'},
    {cn:'乌龟说：“我们来赛跑吧。”',py:'Wūguī shuō: "Wǒmen lái sàipǎo ba."',en:'The tortoise said: "Let\'s have a race."'},
    {cn:'比赛开始了，兔子跑得极快。',py:'Bǐsài kāishǐ le, tùzi pǎo de jí kuài.',en:'The race began, and the rabbit ran extremely fast.'},
    {cn:'兔子觉得乌龟太慢，就睡着了。',py:'Tùzi juéde wūguī tài màn, jiù shuìzháo le.',en:'The rabbit thought the tortoise was too slow, so he fell asleep.'},
    {cn:'乌龟一步一步坚持跑，不停下。',py:'Wūguī yíbù yíbù jiānchí pǎo, bù tíng xià.',en:'The tortoise kept running step-by-step without stopping.'},
    {cn:'最后，乌龟赢了，兔子输了。',py:'Zuìhòu, wūguī yíng le, tùzi shū le.',en:'Finally, the tortoise won, and the rabbit lost.'}
  ],
  quiz:{
    q:'Why did the tortoise win the race?',
    opts:['Because he ran faster','Because the rabbit slept and he didn\'t stop','Because he cheated'],
    a:'Because the rabbit slept and he didn\'t stop'
  }
},
{
  id:3,
  title:'Pulling the Radish',
  cnTitle:'拔萝卜',
  pyTitle:'Bá Luó Bo',
  color:'var(--blue)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--blue)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--blue)" stroke-width="3"/>
    <path d="M50,30 Q65,65 50,85 Q35,65 50,30 Z" fill="#e8f5e9" stroke="var(--green)" stroke-width="2"/>
    <path d="M50,30 Q60,10 65,15 Q50,22 50,30" fill="var(--green)"/>
    <path d="M50,30 Q40,10 35,15 Q50,22 50,30" fill="var(--green)"/>
    <circle cx="50" cy="60" r="6" fill="var(--pink)" opacity=".7"/>
  </svg>`,
  slides:[
    {cn:'老爷爷种了一个大萝卜。',py:'Lǎoyéye zhòng le yígè dà luóbo.',en:'Grandpa planted a huge radish.'},
    {cn:'萝卜长得非常大，老爷爷拔不动。',py:'Luóbo zhǎng de fēicháng dà, lǎoyéye bá bú dòng.',en:'The radish grew very big, and grandpa couldn\'t pull it.'},
    {cn:'他叫来老奶奶一起拔萝卜。',py:'Tā jiào lái lǎonǎinai yìqǐ bá luóbo.',en:'He called grandma to pull the radish together.'},
    {cn:'“嗨哟，嗨哟，拔萝卜！”',py:'"Hāiyō, hāiyō, bá luóbo!"',en:'"Heave-ho, heave-ho, pull the radish!"'},
    {cn:'他们叫来小狗和小猫帮忙。',py:'Tāmen jiào lái xiǎogǒu hé xiǎomāo bāngmáng.',en:'They called the dog and cat to help.'},
    {cn:'大家一起用力，大萝卜终于拔出来了！',py:'Dàjiā yìqǐ yònglì, dà luóbo zhōngyú bá chū lái le!',en:'Everyone pulled hard together, and the giant radish finally came out!'}
  ],
  quiz:{
    q:'What helped them finally pull out the giant radish?',
    opts:['Grandpa worked harder','Everyone worked together','The cat ate the radish'],
    a:'Everyone worked together'
  }
},
{
  id:4,
  title:'Little Horse Crosses the River',
  cnTitle:'小马过河',
  pyTitle:'Xiǎo Mǎ Guò Hé',
  color:'var(--orange)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--orange)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--orange)" stroke-width="3"/>
    <path d="M40 35 Q50 25 60 35 L65 55 L35 55 Z" fill="#d35400"/>
    <circle cx="45" cy="40" r="3" fill="#fff"/><circle cx="55" cy="40" r="3" fill="#fff"/>
    <rect x="25" y="65" width="50" height="15" rx="5" fill="#3498db" opacity=".6"/>
  </svg>`,
  slides:[
    {cn:'小马要过河，不知道水深不深。',py:'Xiǎomǎ yào guò hé, bù zhīdào shuǐ shēn bù shēn.',en:'Little horse wants to cross the river, but doesn\'t know if the water is deep.'},
    {cn:'老牛说：“水很浅，刚到小腿。”',py:'Lǎoniú shuō: "Shuǐ hěn qiǎn, gāng dào xiǎotuǐ."',en:'Old cow says: "The water is very shallow, just reaches the calf."'},
    {cn:'松鼠说：“水很深，会淹死的！”',py:'Sōngshǔ shuō: "Shuǐ hěn shēn, huì yān sǐ de!"',en:'Squirrel says: "The water is very deep, you will drown!"'},
    {cn:'小马不知道该听谁的。',py:'Xiǎomǎ bù zhīdào gāi tīng shuí de.',en:'Little horse doesn\'t know who to listen to.'},
    {cn:'妈妈说：“你自己去试一试吧。”',py:'Māma shuō: "Nǐ zìjǐ qù shìyíshì ba."',en:'Mom says: "Go try it yourself."'},
    {cn:'小马过河了，水不深也不浅。',py:'Xiǎomǎ guò hé le, shuǐ bù shēn yě bù qiǎn.',en:'Little horse crossed the river, the water was neither deep nor shallow.'}
  ],
  quiz:{
    q:'What is the moral of the story?',
    opts:['Don\'t listen to squirrels','Cows are always right','You must try things yourself'],
    a:'You must try things yourself'
  }
},
{
  id:5,
  title:'Three Little Pigs',
  cnTitle:'三只小猪',
  pyTitle:'Sān Zhī Xiǎo Zhū',
  color:'var(--pink)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--pink)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--pink)" stroke-width="3"/>
    <circle cx="50" cy="50" r="18" fill="#ffb6c1"/>
    <circle cx="50" cy="55" r="8" fill="#ff69b4"/>
    <circle cx="46" cy="55" r="2" fill="#fff"/><circle cx="54" cy="55" r="2" fill="#fff"/>
    <circle cx="43" cy="45" r="2.5" fill="#333"/><circle cx="57" cy="45" r="2.5" fill="#333"/>
  </svg>`,
  slides:[
    {cn:'有三只小猪，他们要建房子。',py:'Yǒu sān zhī xiǎozhū, tāmen yào jiàn fángzi.',en:'There were three little pigs, they wanted to build houses.'},
    {cn:'大哥建了草房子，很快建好了。',py:'Dàgē jiàn le cǎo fángzi, hěn kuài jiàn hǎo le.',en:'The eldest brother built a straw house, finished very quickly.'},
    {cn:'二哥建了木头房子。',py:'Èrgē jiàn le mùtou fángzi.',en:'The second brother built a wooden house.'},
    {cn:'小弟建了砖房子，非常结实。',py:'Xiǎodì jiàn le zhuān fángzi, fēicháng jiēshi.',en:'The youngest brother built a brick house, very solid.'},
    {cn:'大灰狼来了，吹倒了草房子和木房子。',py:'Dàhuīláng lái le, chuīdǎo le cǎo fángzi hé mù fángzi.',en:'The big bad wolf came, and blew down the straw and wood houses.'},
    {cn:'大灰狼吹不倒砖房子，小猪们安全了。',py:'Dàhuīláng chuī bù dǎo zhuān fángzi, xiǎozhūmen ānquán le.',en:'The wolf couldn\'t blow down the brick house, the pigs were safe.'}
  ],
  quiz:{
    q:'Which house was the strongest?',
    opts:['The straw house','The wooden house','The brick house'],
    a:'The brick house'
  }
},
{
  id:6,
  title:'Monkeys Fish the Moon',
  cnTitle:'猴子捞月',
  pyTitle:'Hóuzi Lāo Yuè',
  color:'var(--purple)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--purple)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--purple)" stroke-width="3"/>
    <circle cx="50" cy="65" r="15" fill="#f1c40f"/>
    <path d="M40 30 Q50 40 60 30" fill="none" stroke="#8e44ad" stroke-width="3"/>
  </svg>`,
  slides:[
    {cn:'晚上，猴子们在树上玩。',py:'Wǎnshang, hóuzimen zài shù shàng wán.',en:'At night, the monkeys were playing in the tree.'},
    {cn:'一只小猴子看井里，大叫：“月亮掉水里了！”',py:'Yì zhī xiǎo hóuzi kàn jǐng lǐ, dà jiào: "Yuèliang diào shuǐ lǐ le!"',en:'A little monkey looked in the well and yelled: "The moon fell in the water!"'},
    {cn:'大猴子说：“我们快把月亮捞上来！”',py:'Dà hóuzi shuō: "Wǒmen kuài bǎ yuèliang lāo shànglái!"',en:'The big monkey said: "Let\'s fish the moon out quickly!"'},
    {cn:'猴子们挂在树上，去水里捞月亮。',py:'Hóuzimen guà zài shù shàng, qù shuǐ lǐ lāo yuèliang.',en:'The monkeys hung from the tree, going into the water to fish the moon.'},
    {cn:'手碰到水，月亮就不见了。',py:'Shǒu pèng dào shuǐ, yuèliang jiù bújiàn le.',en:'When their hands touched the water, the moon disappeared.'},
    {cn:'老猴子抬头看：“月亮还在天上呢！”',py:'Lǎo hóuzi táitóu kàn: "Yuèliang hái zài tiānshàng ne!"',en:'The old monkey looked up: "The moon is still in the sky!"'}
  ],
  quiz:{
    q:'Where was the real moon?',
    opts:['In the water','In the sky','In the tree'],
    a:'In the sky'
  }
}
];
const RADICALS=[
{r:'人',name:'Person',py:'rén',examples:['你','他','们','什']},
{r:'口',name:'Mouth',py:'kǒu',examples:['吃','喝','吗','叫']},
{r:'女',name:'Woman',py:'nǚ',examples:['她','好','妈','姐']},
{r:'水',name:'Water',py:'shuǐ',examples:['河','海','没','法']},
{r:'日',name:'Sun',py:'rì',examples:['明','时','早','是']},
{r:'木',name:'Tree',py:'mù',examples:['林','森','本','果']},
{r:'心',name:'Heart',py:'xīn',examples:['想','思','您','忙']},
{r:'手',name:'Hand',py:'shǒu',examples:['打','找','把','拉']},
{r:'言',name:'Speech',py:'yán',examples:['说','话','请','谢']},
{r:'金',name:'Metal',py:'jīn',examples:['钱','银','铁','错']},
{r:'火',name:'Fire',py:'huǒ',examples:['热','烧','炒','灯']},
{r:'土',name:'Earth',py:'tǔ',examples:['地','在','城','坐']},
{r:'力',name:'Strength',py:'lì',examples:['加','男','动','助']},
{r:'大',name:'Big',py:'dà',examples:['天','太','夫','奇']},
{r:'刀',name:'Knife',py:'dāo',examples:['分','切','初','别']},
{r:'门',name:'Gate',py:'mén',examples:['问','间','闭','开']},
{r:'月',name:'Moon/Flesh',py:'yuè',examples:['朋','胖','服','脸']},
{r:'贝',name:'Shell/Money',py:'bèi',examples:['贵','买','卖','财']},
{r:'雨',name:'Rain',py:'yǔ',examples:['雪','零','电','需']},
{r:'食',name:'Food',py:'shí',examples:['饭','馆','饿','饮']}
];
// ====== HSK EXAM QUESTION BANKS ======
const EXAMS={
  hsk1:[
    {q:'How do you say "Hello" in Chinese?',opts:['你好','谢谢','再见','对不起'],a:0},
    {q:'What does "我" mean?',opts:['You','He','I / Me','We'],a:2},
    {q:'Which character means "water"?',opts:['火','水','土','木'],a:1},
    {q:'What does "多少钱" mean?',opts:['What time is it?','How old are you?','How much does it cost?','Where is it?'],a:2},
    {q:'Choose the correct pinyin for "谢谢".',opts:['xièxie','zhīzhī','jiéjié','xiāxia'],a:0},
    {q:'"今天" means:',opts:['Yesterday','Tomorrow','Today','Now'],a:2},
    {q:'What does "大" mean?',opts:['Small','Good','Big','Tall'],a:2},
    {q:'Which word means "eat"?',opts:['喝','看','吃','说'],a:2},
    {q:'What is the correct sentence for "I drink water"?',opts:['我喝水','水喝我','喝我水','我水喝'],a:0},
    {q:'"再见" is used when:',opts:['Meeting someone','Saying thank you','Saying goodbye','Asking for directions'],a:2},
    {q:'What does "她" mean?',opts:['He','She','They','It'],a:1},
    {q:'"好" in "你好" means:',opts:['Hello','Thank you','Good','Come'],a:2},
    {q:'Which number is "三"?',opts:['1','2','3','4'],a:2},
    {q:'What does "不" mean?',opts:['Yes','Also','Not / No','Very'],a:2},
    {q:'"我是学生" means:',opts:['I am a teacher','I am a student','He is a student','She is a student'],a:1}
  ],
  hsk2:[
    {q:'What does "已经" mean?',opts:['Not yet','In the future','Already','Sometimes'],a:2},
    {q:'"因为...所以" is used to express:',opts:['Comparison','Cause and effect','Condition','Contrast'],a:1},
    {q:'Which is the correct use of 了?',opts:['我去了中国','我了去中国','了我去中国','我去中了国'],a:0},
    {q:'What does "但是" mean?',opts:['Therefore','Because','However / But','Also'],a:2},
    {q:'"他比我高" means:',opts:['He is shorter than me','We are the same height','He is taller than me','I am taller than him'],a:2},
    {q:'What does "正在" indicate?',opts:['Completed action','Ongoing / current action','Future plan','Past habit'],a:1},
    {q:'"你会说中文吗？" asks:',opts:['Do you like Chinese?','Can you speak Chinese?','Are you learning Chinese?','Do you understand Chinese?'],a:1},
    {q:'What does "需要" mean?',opts:['Want','Can','Need / Require','Should'],a:2},
    {q:'"他还没来" means:',opts:['He came already','He is coming now','He hasn\'t come yet','He won\'t come'],a:2},
    {q:'Which connective means "although...but"?',opts:['因为...所以','如果...就','虽然...但是','不但...而且'],a:2},
    {q:'What does "以前" mean?',opts:['After / Later','Before / In the past','Now','Soon'],a:1},
    {q:'"我打算明天去北京" uses 打算 to mean:',opts:['Can','Want to','Plan to','Should'],a:2},
    {q:'What does "一样" mean?',opts:['Different','The same / Equal','Better','Worse'],a:1},
    {q:'Which measure word is most common for people?',opts:['条','只','个','件'],a:2},
    {q:'"越来越好" means:',opts:['Getting worse','Getting better and better','As good as before','Not very good'],a:1}
  ],
  hsk3:[
    {q:'把 in "请把门关上" indicates:',opts:['Passive voice','Emphasis on the object receiving action','Comparison','Ongoing action'],a:1},
    {q:'What does "被" indicate?',opts:['Active voice','Future tense','Passive voice','Comparison'],a:2},
    {q:'"越吃越胖" means:',opts:['Eating less and less','The more he eats, the fatter he gets','He doesn\'t eat much','He is thin because he eats little'],a:1},
    {q:'"如果...就" expresses:',opts:['Cause and effect','Contrast','Condition / If-then','Sequence'],a:2},
    {q:'What does "一边...一边" describe?',opts:['Doing one thing after another','Doing two things simultaneously','Choosing between two things','Comparing two things'],a:1},
    {q:'"连老师都不知道" uses 连...都 to mean:',opts:['Only the teacher knows','Even the teacher doesn\'t know','The teacher knows everything','No one knows'],a:1},
    {q:'What does "祝贺" mean?',opts:['Worry','Congratulate','Apologize','Request'],a:1},
    {q:'"我不但喜欢中文，而且喜欢历史" uses 不但...而且 to mean:',opts:['Either...or','Not only...but also','Although...but','Because...so'],a:1},
    {q:'What does "紧张" mean?',opts:['Relaxed','Excited','Nervous / Tense','Angry'],a:2},
    {q:'"成功解决了这个问题" means:',opts:['Failed to solve the problem','About to solve the problem','Successfully solved the problem','The problem is not solved'],a:2},
    {q:'What does "方便" mean?',opts:['Difficult','Far away','Convenient','Expensive'],a:2},
    {q:'"请假" means:',opts:['Take a vacation','Ask for leave / time off','Request help','Ask a question'],a:1},
    {q:'What does "爱好" mean?',opts:['Love relationship','Hobby / Interest','Favourite food','Good habit'],a:1},
    {q:'"旅行" means:',opts:['Exercise','Shopping','Travel','Cooking'],a:2},
    {q:'What does "决定" mean?',opts:['Hope','Plan','Wonder','Decide'],a:3}
  ],
  hsk4:[
    {q:'"他宁可步行，也不坐地铁" means:',opts:['He prefers the subway','He would rather walk than take the subway','He doesn\'t know how to take the subway','He walks and takes the subway'],a:1},
    {q:'What is the function of 竟然 in a sentence?',opts:['To indicate purpose','To express surprise at an unexpected result','To indicate time','To show contrast'],a:1},
    {q:'"只有努力，才能成功" means:',opts:['Success is impossible','Only by working hard can one succeed','Working hard is unnecessary','Success brings effort'],a:1},
    {q:'What does "反而" indicate?',opts:['Continuation of a trend','A reversal / contrary result','Comparison','Condition'],a:1},
    {q:'Which is the correct use of 把 for disposal?',opts:['他把书看了','把他书看了','他书把看了','看了他把书'],a:0},
    {q:'"尽管...还是" expresses:',opts:['Cause and effect','Even though...still','If...then','Not only...but also'],a:1},
    {q:'What does "由于" mean?',opts:['In order to','Due to / Because of','Despite','Although'],a:1},
    {q:'"她之所以成功，是因为她努力" emphasises:',opts:['The result of success','The reason for her success','That she was lucky','That success is hard'],a:1},
    {q:'What does "逐渐" mean?',opts:['Suddenly','Gradually','Occasionally','Frequently'],a:1},
    {q:'"无论...都" means:',opts:['Either...or','No matter what...always','Although...but','Only if...then'],a:1},
    {q:'What does "况且" mean?',opts:['However','Moreover / Besides','Therefore','In contrast'],a:1},
    {q:'"他的建议值得参考" means:',opts:['His suggestion is wrong','His suggestion is worth considering','He gave no suggestion','His suggestion was rejected'],a:1},
    {q:'What does "承认" mean?',opts:['Deny','Complain','Admit / Acknowledge','Suggest'],a:2},
    {q:'"不得不" means:',opts:['Must not','Don\'t want to','Have no choice but to','Might'],a:2},
    {q:'What does "坚持" mean?',opts:['Give up','Hesitate','Persist / Keep going','Argue'],a:2}
  ]
};
// ══ EXTENDED STORIES (HSK-LEVEL TAGGED) ══
const EXTRA_STORIES = [
// ── HSK 1 Stories ──────────────────────────────────
{
  id:7, hsk:1,
  title:'My Family',
  cnTitle:'我的家人',
  pyTitle:'Wǒ de Jiārén',
  color:'var(--green)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--green)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--green)" stroke-width="3"/>
    <circle cx="35" cy="44" r="8" fill="#f4a261"/><circle cx="50" cy="40" r="10" fill="#e76f51"/><circle cx="65" cy="44" r="8" fill="#f4a261"/>
    <rect x="28" y="54" width="14" height="16" rx="4" fill="#457b9d"/>
    <rect x="43" y="52" width="14" height="18" rx="4" fill="#e63946"/>
    <rect x="58" y="54" width="14" height="16" rx="4" fill="#457b9d"/>
  </svg>`,
  slides:[
    {cn:'我有一个家。',py:'Wǒ yǒu yígè jiā.',en:'I have a family.'},
    {cn:'我有爸爸和妈妈。',py:'Wǒ yǒu bàba hé māma.',en:'I have a dad and a mom.'},
    {cn:'我也有一个弟弟。',py:'Wǒ yě yǒu yígè dìdi.',en:'I also have a younger brother.'},
    {cn:'我的爸爸很高。',py:'Wǒ de bàba hěn gāo.',en:'My dad is very tall.'},
    {cn:'我的妈妈很漂亮。',py:'Wǒ de māma hěn piàoliang.',en:'My mom is very beautiful.'},
    {cn:'我爱我的家人！',py:'Wǒ ài wǒ de jiārén!',en:'I love my family!'},
  ],
  quiz:{
    q:'What does the child say about their family?',
    opts:['They have no family','They have a dad, mom and younger brother','They only have a sister'],
    a:'They have a dad, mom and younger brother'
  }
},
{
  id:8, hsk:1,
  title:'I Like to Eat',
  cnTitle:'我喜欢吃',
  pyTitle:'Wǒ Xǐhuān Chī',
  color:'var(--orange)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--orange)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--orange)" stroke-width="3"/>
    <circle cx="50" cy="52" r="18" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
    <circle cx="44" cy="46" r="4" fill="#ef5350"/><circle cx="56" cy="46" r="4" fill="#66bb6a"/>
    <circle cx="50" cy="58" r="4" fill="#ffa726"/><circle cx="41" cy="56" r="3" fill="#ab47bc"/><circle cx="59" cy="56" r="3" fill="#29b6f6"/>
  </svg>`,
  slides:[
    {cn:'我喜欢吃东西。',py:'Wǒ xǐhuān chī dōngxi.',en:'I like to eat things.'},
    {cn:'我喜欢吃米饭。',py:'Wǒ xǐhuān chī mǐfàn.',en:'I like to eat rice.'},
    {cn:'我不喜欢吃鱼。',py:'Wǒ bù xǐhuān chī yú.',en:"I don't like to eat fish."},
    {cn:'我喜欢喝水和喝茶。',py:'Wǒ xǐhuān hē shuǐ hé hē chá.',en:'I like to drink water and tea.'},
    {cn:'苹果很好吃！',py:'Píngguǒ hěn hǎochī!',en:'Apples are very delicious!'},
    {cn:'我每天都吃早饭。',py:'Wǒ měitiān dōu chī zǎofàn.',en:'I eat breakfast every day.'},
  ],
  quiz:{
    q:'What does the child NOT like to eat?',
    opts:['Rice','Fish','Apples'],
    a:'Fish'
  }
},
{
  id:9, hsk:1,
  title:'My School',
  cnTitle:'我的学校',
  pyTitle:'Wǒ de Xuéxiào',
  color:'var(--blue)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--blue)" opacity=".15"/>
    <rect x="28" y="45" width="44" height="32" rx="4" fill="#e3f2fd" stroke="#1cb0f6" stroke-width="2"/>
    <polygon points="50,20 22,46 78,46" fill="#1cb0f6"/>
    <rect x="43" y="60" width="14" height="17" rx="2" fill="#fff" stroke="#1cb0f6" stroke-width="1.5"/>
    <rect x="30" y="52" width="10" height="10" rx="2" fill="#fff" stroke="#1cb0f6" stroke-width="1.5"/>
    <rect x="60" y="52" width="10" height="10" rx="2" fill="#fff" stroke="#1cb0f6" stroke-width="1.5"/>
  </svg>`,
  slides:[
    {cn:'我去学校上课。',py:'Wǒ qù xuéxiào shàngkè.',en:'I go to school for class.'},
    {cn:'我的老师叫王老师。',py:'Wǒ de lǎoshī jiào Wáng lǎoshī.',en:'My teacher is called Teacher Wang.'},
    {cn:'我在学校学习汉语。',py:'Wǒ zài xuéxiào xuéxí hànyǔ.',en:'I study Chinese at school.'},
    {cn:'我有很多同学。',py:'Wǒ yǒu hěnduō tóngxué.',en:'I have many classmates.'},
    {cn:'下课了，我回家。',py:'Xià kè le, wǒ huí jiā.',en:'Class is over, I go home.'},
    {cn:'我喜欢我的学校！',py:'Wǒ xǐhuān wǒ de xuéxiào!',en:'I love my school!'},
  ],
  quiz:{
    q:'What subject does the child study at school?',
    opts:['English','Chinese (Hanyu)','Math'],
    a:'Chinese (Hanyu)'
  }
},
// ── HSK 2 Stories ──────────────────────────────────
{
  id:10, hsk:2,
  title:'A Rainy Day',
  cnTitle:'下雨天',
  pyTitle:'Xià Yǔ Tiān',
  color:'var(--blue)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--blue)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--blue)" stroke-width="3"/>
    <ellipse cx="50" cy="42" rx="20" ry="12" fill="#90caf9"/>
    <line x1="38" y1="58" x2="34" y2="68" stroke="#42a5f5" stroke-width="2" stroke-linecap="round"/>
    <line x1="47" y1="58" x2="43" y2="68" stroke="#42a5f5" stroke-width="2" stroke-linecap="round"/>
    <line x1="56" y1="58" x2="52" y2="68" stroke="#42a5f5" stroke-width="2" stroke-linecap="round"/>
    <line x1="65" y1="58" x2="61" y2="68" stroke="#42a5f5" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  slides:[
    {cn:'今天天气不好，下雨了。',py:'Jīntiān tiānqì bù hǎo, xià yǔ le.',en:"Today the weather is bad, it's raining."},
    {cn:'我本来打算去公园，但是现在不能去了。',py:'Wǒ běnlái dǎsuàn qù gōngyuán, dànshì xiànzài bù néng qù le.',en:'I originally planned to go to the park, but now I cannot.'},
    {cn:'因为下雨，所以我待在家里。',py:'Yīnwèi xià yǔ, suǒyǐ wǒ dāi zài jiā lǐ.',en:"Because it's raining, I'm staying home."},
    {cn:'我正在看书，喝热茶。',py:'Wǒ zhèngzài kàn shū, hē rè chá.',en:"I'm reading books and drinking hot tea."},
    {cn:'我已经看了两个小时了。',py:'Wǒ yǐjīng kàn le liǎng gè xiǎoshí le.',en:"I've been reading for two hours already."},
    {cn:'虽然天气不好，但是我觉得很舒服！',py:'Suīrán tiānqì bù hǎo, dànshì wǒ juéde hěn shūfu!',en:'Although the weather is bad, I feel very comfortable!'},
  ],
  quiz:{
    q:'Why did the person stay home?',
    opts:['They were sick','It was raining','They were tired'],
    a:'It was raining'
  }
},
{
  id:11, hsk:2,
  title:'Shopping at the Market',
  cnTitle:'在市场买东西',
  pyTitle:'Zài Shìchǎng Mǎi Dōngxi',
  color:'var(--yellow)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--yellow)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--yellow)" stroke-width="3"/>
    <rect x="30" y="42" width="40" height="26" rx="5" fill="#fff9c4" stroke="#ffc107" stroke-width="2"/>
    <rect x="36" y="50" width="8" height="10" rx="2" fill="#ef9a9a"/>
    <rect x="47" y="50" width="8" height="10" rx="2" fill="#a5d6a7"/>
    <rect x="58" y="50" width="8" height="10" rx="2" fill="#90caf9"/>
    <path d="M38 42 Q50 30 62 42" fill="none" stroke="#ffc107" stroke-width="2.5"/>
    <circle cx="38" cy="42" r="2.5" fill="#ff8f00"/><circle cx="62" cy="42" r="2.5" fill="#ff8f00"/>
  </svg>`,
  slides:[
    {cn:'今天我去市场买东西了。',py:'Jīntiān wǒ qù shìchǎng mǎi dōngxi le.',en:'Today I went to the market to shop.'},
    {cn:'我需要买水果和蔬菜。',py:'Wǒ xūyào mǎi shuǐguǒ hé shūcài.',en:'I need to buy fruit and vegetables.'},
    {cn:'一个苹果多少钱？',py:'Yígè píngguǒ duōshǎo qián?',en:'How much is one apple?'},
    {cn:'老板说苹果比昨天便宜了。',py:'Lǎobǎn shuō píngguǒ bǐ zuótiān piányí le.',en:'The vendor said apples are cheaper than yesterday.'},
    {cn:'我已经买了很多了！',py:'Wǒ yǐjīng mǎi le hěnduō le!',en:"I've already bought a lot!"},
    {cn:'我把所有东西都放进篮子里了。',py:'Wǒ bǎ suǒyǒu dōngxi dōu fàng jìn lánzi lǐ le.',en:'I put everything into the basket.'},
  ],
  quiz:{
    q:'What did the person go to buy at the market?',
    opts:['Clothes and shoes','Fruit and vegetables','Books and stationery'],
    a:'Fruit and vegetables'
  }
},
// ── HSK 3 Stories ──────────────────────────────────
{
  id:12, hsk:3,
  title:'The New Student',
  cnTitle:'新同学',
  pyTitle:'Xīn Tóngxué',
  color:'var(--purple)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="var(--purple)" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="var(--purple)" stroke-width="3"/>
    <circle cx="40" cy="44" r="10" fill="#f9a825"/><circle cx="62" cy="44" r="10" fill="#7c4dff"/>
    <path d="M36 56 Q40 70 44 56" fill="none" stroke="#f9a825" stroke-width="2"/>
    <path d="M58 56 Q62 70 66 56" fill="none" stroke="#7c4dff" stroke-width="2"/>
    <line x1="50" y1="44" x2="50" y2="56" stroke="#aaa" stroke-width="2" stroke-dasharray="3"/>
  </svg>`,
  slides:[
    {cn:'今天班上来了一位新同学。',py:'Jīntiān bān shàng lái le yíwèi xīn tóngxué.',en:'A new classmate came to our class today.'},
    {cn:'他叫李明，是从上海来的。',py:'Tā jiào Lǐ Míng, shì cóng Shànghǎi lái de.',en:'His name is Li Ming, and he came from Shanghai.'},
    {cn:'老师让大家欢迎他，我们都鼓掌了。',py:'Lǎoshī ràng dàjiā huānyíng tā, wǒmen dōu gǔzhǎng le.',en:'The teacher asked everyone to welcome him, and we all clapped.'},
    {cn:'下课以后，我过去跟他聊天。',py:'Xià kè yǐhòu, wǒ guòqù gēn tā liáotiān.',en:'After class, I went over to chat with him.'},
    {cn:'他一边介绍自己，一边给我看上海的照片。',py:'Tā yìbiān jièshào zìjǐ, yìbiān gěi wǒ kàn Shànghǎi de zhàopiān.',en:'He introduced himself while showing me photos of Shanghai.'},
    {cn:'我们越聊越开心，成了好朋友！',py:'Wǒmen yuè liáo yuè kāixīn, chéng le hǎo péngyǒu!',en:'The more we talked, the happier we were — we became good friends!'},
  ],
  quiz:{
    q:'Where did Li Ming come from?',
    opts:['Beijing','Shanghai','Guangzhou'],
    a:'Shanghai'
  }
},
{
  id:13, hsk:3,
  title:'Lost in the City',
  cnTitle:'在城市里迷路了',
  pyTitle:'Zài Chéngshì Lǐ Mí Lù Le',
  color:'var(--red)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="#ff4b4b" opacity=".12"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="#ff4b4b" stroke-width="3"/>
    <path d="M30 65 L30 45 L50 30 L70 45 L70 65 Z" fill="#ffe0e0" stroke="#ff4b4b" stroke-width="2"/>
    <rect x="43" y="53" width="14" height="12" rx="2" fill="#fff" stroke="#ff4b4b" stroke-width="1.5"/>
    <circle cx="50" cy="38" r="5" fill="#ff4b4b"/>
    <path d="M50 43 L50 48" stroke="#ff4b4b" stroke-width="2"/>
    <text x="50" y="48" text-anchor="middle" font-size="8" fill="#cc0000">?</text>
  </svg>`,
  slides:[
    {cn:'有一次，我去一个陌生的城市出差。',py:'Yǒu yícì, wǒ qù yígè mòshēng de chéngshì chūchāi.',en:'Once, I went on a business trip to an unfamiliar city.'},
    {cn:'下了地铁，我发现自己迷路了。',py:'Xià le dìtiě, wǒ fāxiàn zìjǐ mí lù le.',en:'After getting off the subway, I found that I was lost.'},
    {cn:'我掏出手机，但是没有信号。',py:'Wǒ tāo chū shǒujī, dànshì méiyǒu xìnhào.',en:'I took out my phone, but there was no signal.'},
    {cn:'我只好向路人请教，问怎么走。',py:'Wǒ zhǐhǎo xiàng lùrén qǐngjiào, wèn zěnme zǒu.',en:'I had no choice but to ask passers-by for directions.'},
    {cn:'一位热心的老奶奶不但告诉了我方向，而且陪我走了一段路。',py:'Yíwèi rèxīn de lǎonǎinai bùdàn gàosù le wǒ fāngxiàng, érqiě péi wǒ zǒu le yíduàn lù.',en:'A kind old lady not only told me the direction, but also walked with me for a while.'},
    {cn:'连当地人都夸她是城市里最热心的志愿者！',py:'Lián dāngdì rén dōu kuā tā shì chéngshì lǐ zuì rèxīn de zhìyuànzhě!',en:'Even the locals praised her as the most warm-hearted volunteer in the city!'},
  ],
  quiz:{
    q:'Why could the traveler not use the phone?',
    opts:['The battery died','There was no signal','They forgot the phone at home'],
    a:'There was no signal'
  }
},
// ── HSK 4 Stories ──────────────────────────────────
{
  id:14, hsk:4,
  title:'Chasing a Dream',
  cnTitle:'追逐梦想',
  pyTitle:'Zhuīzhú Mèngxiǎng',
  color:'var(--gold)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="#f59e0b" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="#f59e0b" stroke-width="3"/>
    <polygon points="50,22 56,40 74,40 60,52 65,70 50,58 35,70 40,52 26,40 44,40" fill="#ffd700" stroke="#f59e0b" stroke-width="1.5"/>
  </svg>`,
  slides:[
    {cn:'小时候，我梦想成为一名音乐家。',py:'Xiǎoshíhou, wǒ mèngxiǎng chéngwéi yìmíng yīnyuèjiā.',en:'When I was young, I dreamed of becoming a musician.'},
    {cn:'尽管父母不支持，我还是坚持练琴。',py:'Jǐnguǎn fùmǔ bù zhīchí, wǒ háishì jiānchí liàn qín.',en:'Even though my parents did not support me, I still persisted in practising.'},
    {cn:'由于我付出了很多努力，我的水平逐渐提高了。',py:'Yóuyú wǒ fùchū le hěnduō nǔlì, wǒ de shuǐpíng zhújiàn tígāo le.',en:'Due to my great effort, my level gradually improved.'},
    {cn:'十八岁那年，我考上了音乐学院。',py:'Shíbā suì nà nián, wǒ kǎo shàng le yīnyuè xuéyuàn.',en:'At the age of eighteen, I got into a music academy.'},
    {cn:'之所以能成功，是因为我无论遇到什么困难，都没有放弃。',py:'Zhīsuǒyǐ néng chénggōng, shì yīnwèi wǒ wúlùn yùdào shénme kùnnán, dōu méiyǒu fàngqì.',en:'The reason I succeeded was because no matter what difficulties I faced, I never gave up.'},
    {cn:'梦想值得追逐，况且，努力永远不会白费。',py:'Mèngxiǎng zhídé zhuīzhú, kuàngqiě, nǔlì yǒngyuǎn bù huì báifèi.',en:'Dreams are worth chasing; moreover, effort is never wasted.'},
  ],
  quiz:{
    q:'What did the person dream of becoming as a child?',
    opts:['A doctor','A musician','A teacher'],
    a:'A musician'
  }
},
// ── HSK 5 Stories ──────────────────────────────────
{
  id:15, hsk:5,
  title:'The Wisdom of Silence',
  cnTitle:'沉默的智慧',
  pyTitle:'Chénmò de Zhìhuì',
  color:'var(--teal)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="#2bb8a4" opacity=".15"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="#2bb8a4" stroke-width="3"/>
    <circle cx="50" cy="46" r="16" fill="#e0f7f4" stroke="#2bb8a4" stroke-width="2"/>
    <path d="M44 46 Q50 38 56 46" fill="none" stroke="#2bb8a4" stroke-width="2"/>
    <circle cx="43" cy="44" r="2" fill="#2bb8a4"/><circle cx="57" cy="44" r="2" fill="#2bb8a4"/>
    <path d="M44 52 Q50 48 56 52" fill="none" stroke="#00897b" stroke-width="1.5"/>
    <path d="M30 68 Q50 58 70 68" fill="none" stroke="#2bb8a4" stroke-width="2" opacity=".5"/>
  </svg>`,
  slides:[
    {cn:'古代有一位著名的哲学家，弟子们都争相向他求教。',py:'Gǔdài yǒu yíwèi zhùmíng de zhéxuéjiā, dìzǐmen dōu zhēngxiāng xiàng tā qiújiào.',en:'In ancient times, there was a famous philosopher whose disciples all competed to seek his guidance.'},
    {cn:'有一天，一个弟子急匆匆地跑来，说要向他汇报一个重要消息。',py:'Yǒu yìtiān, yígè dìzǐ jícōngcōng de pǎo lái, shuō yào xiàng tā huìbào yígè zhòngyào xiāoxi.',en:'One day, a disciple came rushing over, saying he had important news to report.'},
    {cn:'哲学家抬起手，平静地说："你说的话，经过三重筛选了吗？"',py:'Zhéxuéjiā tái qǐ shǒu, píngjìng de shuō: "Nǐ shuō de huà, jīngguò sān chóng shāixuǎn le ma?"',en:'The philosopher raised his hand calmly and said, "Have the words you\'re about to say passed through three filters?"'},
    {cn:'弟子愣住了，不得不承认这些话既不真实、也无益处。',py:'Dìzǐ lèng zhù le, bùdébù chéngrèn zhèxiē huà jì bù zhēnshí, yě wú yìchù.',en:'The disciple was stunned and had to admit the words were neither true nor beneficial.'},
    {cn:'哲学家微笑道："既然如此，何必说出口？沉默，有时候比言语更有力量。"',py:'Zhéxuéjiā wēixiào dào: "Jìrán rúcǐ, hébì shuō chū kǒu? Chénmò, yǒushíhou bǐ yányǔ gèng yǒu lìliang."',en:'The philosopher smiled and said, "If that\'s the case, why say it? Silence is sometimes more powerful than words."'},
    {cn:'这个故事告诉我们：言多必失，说话之前，应当三思而后行。',py:'Zhège gùshi gàosù wǒmen: yán duō bì shī, shuōhuà zhīqián, yīngdāng sānsī ér hòu xíng.',en:'This story tells us: saying too much brings mistakes; before speaking, one should think thrice.'},
  ],
  quiz:{
    q:'What three filters did the philosopher mention?',
    opts:['Truth, kindness, and usefulness','Speed, clarity, and length','Logic, emotion, and evidence'],
    a:'Truth, kindness, and usefulness'
  }
},
// ── HSK 6 Stories ──────────────────────────────────
{
  id:16, hsk:6,
  title:'The Last Brushstroke',
  cnTitle:'最后一笔',
  pyTitle:'Zuìhòu Yī Bǐ',
  color:'var(--red)',
  ill:`<svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">
    <rect width="100" height="100" rx="20" fill="#e8192c" opacity=".12"/>
    <circle cx="50" cy="50" r="32" fill="#fff" stroke="#e8192c" stroke-width="3"/>
    <rect x="32" y="32" width="36" height="36" rx="3" fill="#fff8f0" stroke="#e8192c" stroke-width="1.5"/>
    <text x="50" y="57" text-anchor="middle" font-family="serif" font-size="22" font-weight="900" fill="#e8192c">龙</text>
    <line x1="60" y1="38" x2="68" y2="30" stroke="#333" stroke-width="2" stroke-linecap="round"/>
    <rect x="63" y="22" width="4" height="12" rx="2" fill="#795548"/>
    <circle cx="65" cy="21" r="4" fill="#999" opacity=".7"/>
  </svg>`,
  slides:[
    {cn:'唐代画家张僧繇以画龙闻名天下，其笔下的龙栩栩如生，令观者叹为观止。',py:'Tángdài huàjiā Zhāng Sēngyáo yǐ huà lóng wénmíng tiānxià, qí bǐ xià de lóng xǔxǔ rú shēng, lìng guānzhě tàn wéi guān zhǐ.',en:'The Tang Dynasty painter Zhang Sengyao was world-famous for painting dragons; his dragons were so lifelike they left viewers in awe.'},
    {cn:'他在金陵安乐寺的墙上画了四条龙，笔势遒劲，气韵流动，却刻意省去了每条龙的眼睛。',py:'Tā zài Jīnlíng Ānlèsì de qiáng shàng huà le sì tiáo lóng, bǐshì qiújìn, qìyùn liúdòng, què kèyì shěngqù le měi tiáo lóng de yǎnjīng.',en:'He painted four dragons on the wall of Anle Temple in Jinling—vigorous brushwork, flowing spirit—yet deliberately omitted the eyes of each dragon.'},
    {cn:'围观的人们百思不得其解，纷纷追问缘由。',py:'Wéiguān de rénmen bǎisī bùdé qí jiě, fēnfēn zhuīwèn yuányóu.',en:'The onlookers were utterly puzzled and pressed him for the reason.'},
    {cn:'张僧繇从容答道："若是点睛，龙必破壁腾飞而去。"众人皆以为妄言。',py:'Zhāng Sēngyáo cóngróng dá dào: "Ruòshì diǎn jīng, lóng bì pò bì téng fēi ér qù." Zhòngrén jiē yǐwéi wàng yán.',en:'Zhang Sengyao replied calmly, "If I add the pupils, the dragons will burst through the wall and fly away." Everyone thought it was nonsense.'},
    {cn:'在众人的再三恳求下，他举笔为其中两条龙点上了眼睛。霎时，雷声大作，两条龙果真破壁而出，腾空而去，令在场之人目瞪口呆。',py:'Zài zhòngrén de zàisān kěnqiú xià, tā jǔ bǐ wèi qízhōng liǎng tiáo lóng diǎn shàng le yǎnjīng. Shàshí, léi shēng dà zuò, liǎng tiáo lóng guǒzhēn pò bì ér chū, téngkōng ér qù, lìng zàichǎng zhī rén mùdèng kǒudāi.',en:'Under persistent entreaties, he raised his brush and added eyes to two of the dragons. Instantly, thunder roared and the two dragons truly burst through the wall and soared skyward, leaving everyone present dumbstruck.'},
    {cn:'这个典故由此流传千古，"画龙点睛"也成为形容一个关键之笔使整体焕然生辉的成语。',py:'Zhège diǎngù yóucǐ liúchuán qiāngǔ, "huà lóng diǎn jīng" yě chéngwéi xíngróng yígè guānjiàn zhī bǐ shǐ zhěngtǐ huànrán shēnghuī de chéngyǔ.',en:'This tale has been passed down for millennia; "adding eyes to the painted dragon" became the idiom for a single decisive touch that transforms the whole into brilliance.'},
  ],
  quiz:{
    q:'What does the idiom 画龙点睛 (huà lóng diǎn jīng) mean?',
    opts:['Painting a dragon from scratch','A single crucial touch that brings the whole to life','Being overly detailed in artwork'],
    a:'A single crucial touch that brings the whole to life'
  }
},
];
// Merge extra stories into KIDS_STORIES
EXTRA_STORIES.forEach(s => { if (!KIDS_STORIES.find(k => k.id === s.id)) KIDS_STORIES.push(s); });

window.EXAMS=EXAMS;
window.UNITS=UNITS;
window.GRAMMAR=GRAMMAR;
window.CONVOS=CONVOS;
window.KIDS_STORIES=KIDS_STORIES;
window.RADICALS=RADICALS;

// --- Component Script --- 

// CORE APP ENGINE
// ══════════════════════════════════════════════════
// HANYUSTAR CORE APP ENGINE
// ══════════════════════════════════════════════════

// ─── GROQ API CONFIG ──────────────────────────────
const GROQ_KEY = 'your_groq_api_key_here';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ─── SVG ICON LIBRARY (Replace Emojis) ─────────
const SVG_ICONS = {
  logo: `<svg viewBox="0 0 128 128" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="64" cy="64" r="60"/><path d="M50 68L60 78L80 58" stroke-linecap="round" stroke-linejoin="round"/><text x="40" y="90" font-size="24" font-weight="bold" fill="currentColor">HY</text></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l9-9 9 9v7a2 2 0 01-2 2h-2a2 2 0 01-2-2v-3a2 2 0 00-2-2h-2a2 2 0 00-2 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20a2 2 0 012 2v10a2 2 0 01-2 2H6.5A2.5 2.5 0 014 16.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  game: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  speaker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>`,
  fire: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c1.1 0 2-1.1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2zm9 7h-6V4c0-1.1-.9-2-2-2s-2 .9-2 2v5H3c-1.1 0-2 .9-2 2s.9 2 2 2h6v5c0 1.1.9 2 2 2s2-.9 2-2v-5h6c1.1 0 2-.9 2-2s-.9-2-2-2z"/></svg>`,
  lightning: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8 16 12 19 16 16"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  volume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20H21M3 21l1.5-4.5L17 4l2.5 2.5L6.5 19.5 3 21z"/></svg>`,
};

function icon(name, size = '20px') {
  const svg = SVG_ICONS[name] || SVG_ICONS.book;
  return `<span style="display:inline-flex;width:${size};height:${size};color:inherit;line-height:1">${svg}</span>`;
}

// ─── DB / STATE ───────────────────────────────────
let db = {
  name: '',
  xp: 0,
  streak: 0,
  lastDate: '',
  saved: [],
  done: {},
  pin: '',
  avatar: 0,
  unlockedCourses: ['hsk1','hsk2','hsk3','hsk4','business','travel','kids','all'],
  completedLessons: {}
};

// ─── REAL CROSS-DEVICE AUTH (Persistent Storage) ──
// Users are stored with key: "user:{normalizedName}"
// Each user record: { pin, xp, streak, lastDate, saved, done, avatar, ... }

function _userKey(name) {
  return 'user:' + name.toLowerCase().trim().replace(/\s+/g, '_');
}

async function cloudSaveUser() {
  if (!db.name) return;
  const key = _userKey(db.name);
  const data = JSON.stringify({
    name: db.name,
    pin: db.pin,
    xp: db.xp || 0,
    streak: db.streak || 0,
    lastDate: db.lastDate || '',
    saved: db.saved || [],
    done: db.done || {},
    avatar: db.avatar || 0,
    unlockedCourses: db.unlockedCourses || ['hsk1','hsk2','hsk3','hsk4','business','travel','kids','all'],
    completedLessons: db.completedLessons || {}
  });
  try {
    await window.storage.set(key, data, true); // shared=true so any device can access
  } catch(e) {
    // Cloud unavailable, fall back silently
  }
  // Also keep local cache
  try { localStorage.setItem('hx_db', data); } catch(e) {}
}

async function cloudLoadUser(name) {
  const key = _userKey(name);
  try {
    const result = await window.storage.get(key, true); // shared=true
    if (result && result.value) {
      return JSON.parse(result.value);
    }
  } catch(e) {}
  return null;
}

function loadDB() {
  // Load local cache for fast startup (cloud load happens async at login)
  try {
    const s = localStorage.getItem('hx_db');
    if (s) {
      const d = JSON.parse(s);
      Object.assign(db, d);
    }
  } catch(e) {}
}

function saveDB() {
  // Save locally immediately for speed, then cloud async
  try { localStorage.setItem('hx_db', JSON.stringify(db)); } catch(e) {}
  cloudSaveUser().catch(() => {}); // fire-and-forget cloud save
}

// ─── XP / STREAK ──────────────────────────────────
function addXP(n) {
  db.xp += n;
  const today = new Date().toDateString();
  if (db.lastDate !== today) {
    if (db.lastDate === new Date(Date.now() - 86400000).toDateString()) {
      db.streak = (db.streak || 0) + 1;
    } else if (db.lastDate !== today) {
      db.streak = 1;
    }
    db.lastDate = today;
  }
  saveDB();
  updXP();
  toast('+' + n + ' XP', 'success');
}

function updXP() {
  window._updXPImpl = updXP;
  const xp = db.xp || 0;
  const lvl = Math.floor(xp / 100) + 1;
  const pct = xp % 100;
  const streak = db.streak || 0;
  // Home page
  const hFill = document.getElementById('h-xp-fill');
  if (hFill) hFill.style.width = pct + '%';
  const hXp = document.getElementById('h-xp');
  if (hXp) hXp.textContent = xp;
  const hLvl = document.getElementById('h-lvl');
  if (hLvl) hLvl.textContent = lvl;
  const hLvl2 = document.getElementById('h-lvl2');
  if (hLvl2) hLvl2.textContent = lvl;
  const hRemain = document.getElementById('h-remain');
  if (hRemain) hRemain.textContent = (lvl * 100);
  const hStreak = document.getElementById('h-streak');
  if (hStreak) hStreak.textContent = streak;
  // Sidebar
  const sbXp = document.getElementById('sb-xp');
  if (sbXp) sbXp.textContent = xp + ' XP';
  const sbName = document.getElementById('sb-name');
  if (sbName) sbName.textContent = db.name || 'Learner';
  // Profile page display
  const pnd = document.getElementById('profile-name-display');
  if (pnd) pnd.textContent = db.name || 'Learner';
  // Progress badge
  const pb = document.getElementById('progress-badge');
  if (pb) pb.textContent = lvl + ' ★';
}

// ─── TOAST ────────────────────────────────────────
let toastTimer;
function toast(msg, type = 'info') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'toast toast-' + type + ' show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ─── SPEAK ────────────────────────────────────────
let _bestZhVoice = null, _bestEnVoice = null, _voicesLoaded = false;
let _speakQueue = [], _speakBusy = false;
let _chromeTTSKeepAlive = null;

function loadBestVoices() {
  if (_voicesLoaded) return;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return;
  _voicesLoaded = true;
  const zhPriority = ['Google 普通话（中国大陆）','Ting-Ting','Meijia','Google Chinese (China)','Mei-Jia','Zhang Wei','Li-mu','Google 中文(台灣)'];
  const enPriority = ['Google UK English Female','Samantha','Karen','Moira','Alex','Victoria','Daniel','Serena','Google US English'];
  _bestZhVoice = zhPriority.reduce((f,n)=>f||voices.find(v=>v.name.includes(n))||null,null)||voices.find(v=>v.lang.startsWith('zh'))||null;
  _bestEnVoice = enPriority.reduce((f,n)=>f||voices.find(v=>v.name.includes(n))||null,null)||voices.find(v=>v.lang.startsWith('en'))||null;
}

// Chrome fix: keep speechSynthesis alive during long sessions
function _keepSpeechAlive() {
  if (_chromeTTSKeepAlive) clearInterval(_chromeTTSKeepAlive);
  _chromeTTSKeepAlive = setInterval(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 10000);
}

// Play one utterance, call done() when finished
function _playOne(text, lang, done) {
  if (!text || !window.speechSynthesis) { done(); return; }
  if (!_voicesLoaded) loadBestVoices();
  const isChinese = /[\u4e00-\u9fff]/.test(text);
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang || (isChinese ? 'zh-CN' : 'en-US');
  if (lang === 'zh-CN' || isChinese) {
    u.rate = 0.82; u.pitch = 1.05; u.volume = 1.0;
    if (_bestZhVoice) u.voice = _bestZhVoice;
  } else {
    u.rate = 0.95; u.pitch = 1.0; u.volume = 1.0;
    if (_bestEnVoice) u.voice = _bestEnVoice;
  }
  
  let finished = false;
  const finish = () => { if (!finished) { finished = true; done(); } };
  u.onend = finish;
  u.onerror = finish;
  // Safety timeout in case onend never fires (Chrome bug)
  const safetyTimer = setTimeout(finish, (text.length * 120) + 3000);
  u.onend = () => { clearTimeout(safetyTimer); finish(); };
  u.onerror = () => { clearTimeout(safetyTimer); finish(); };
  
  try {
    window.speechSynthesis.speak(u);
    _keepSpeechAlive();
  } catch(e) { finish(); }
}

function _runQueue() {
  if (_speakBusy || _speakQueue.length === 0) return;
  _speakBusy = true;
  const { text, lang } = _speakQueue.shift();
  _playOne(text, lang, () => { _speakBusy = false; setTimeout(_runQueue, 80); });
}

// speak() — single utterance, cancels current queue (used by existing code)
function speak(text, lang) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  _speakQueue = []; _speakBusy = false;
  _speakQueue.push({ text, lang: lang || (/[\u4e00-\u9fff]/.test(text) ? 'zh-CN' : 'en-US') });
  setTimeout(_runQueue, 80);
}

// speakBilingual(text) — splits mixed English+Chinese message, speaks each part
// with the right voice in order, no cancellation between segments
function speakBilingual(text) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  _speakQueue = []; _speakBusy = false;

  // Remove pinyin annotations like (nǐ hǎo) or [jiā yóu] — browser will mispronounce them
  const cleaned = text
    .replace(/\([a-z\u00c0-\u024f\s,]+\)/gi, ' ')
    .replace(/\[[a-z\u00c0-\u024f\s,]+\]/gi, ' ');

  // Split into alternating Chinese / non-Chinese segments
  const re = /[\u4e00-\u9fff\u3000-\u303f，。！？、；：""''（）《》]+|[^\u4e00-\u9fff\u3000-\u303f，。！？、；：""''（）《》]+/g;
  let match;
  while ((match = re.exec(cleaned)) !== null) {
    const seg = match[0].trim();
    if (!seg) continue;
    const isCh = /[\u4e00-\u9fff]/.test(seg);
    if (isCh) {
      _speakQueue.push({ text: seg, lang: 'zh-CN' });
    } else {
      const stripped = seg.replace(/[—\-–,.\s!?()[\]"']/g, '').trim();
      if (stripped.length > 1) _speakQueue.push({ text: seg, lang: 'en-US' });
    }
  }
  setTimeout(_runQueue, 80);
}

// ─── NAVIGATION ───────────────────────────────────
let curPage = 'home';
let prevPage = 'home';

function go(page) {
  window._goImpl = go;
  prevPage = curPage;
  curPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('pg-' + page);
  if (el) { el.classList.add('active'); el.scrollTop = 0; }
  window.scrollTo(0, 0);
  // Update nav
  document.querySelectorAll('.sb-item, .mob-tab, .sidebar-item').forEach(item => {
    item.classList.toggle('active', (item.dataset.page === page));
  });
  // Render page content
  if (page === 'home') renderHome();
  else if (page === 'learn') renderLearn();
  else if (page === 'lesson') { if (typeof renderLessonContent === 'function') renderLessonContent(); }
  else if (page === 'chars') charTab('radicals', null);
  else if (page === 'grammar') renderGrammar();
  else if (page === 'convos') renderConvos();
  else if (page === 'chat') initChat();
  else if (page === 'games') {}
  else if (page === 'writing') renderWritingPage();
  else if (page === 'pronlab') renderPronLab();
  else if (page === 'voiceteacher') renderVoiceTeacher();
  else if (page === 'advanced-speaking') renderAdvancedSpeaking();
  else if (page === 'chinahistory') renderChinaHistory();
  else if (page === 'saved') renderSaved();
  else if (page === 'stories') renderStories();
  else if (page === 'profile') renderProfile();
  else if (page === 'hsk1exam') renderExam('hsk1');
  else if (page === 'hsk2exam') renderExam('hsk2');
  else if (page === 'hsk3exam') renderExam('hsk3');
  else if (page === 'hsk4exam') renderExam('hsk4');
  else if (page === 'grammartest') renderGrammarTest();
}

// Games use showSub to navigate to sub-pages (quiz, matching, etc.)
function showSub(name) {
  go(name);
  // trigger game init
  if (name === 'quiz') { startQuiz(); }
  else if (name === 'matching') { startMatch(); }
  else if (name === 'tones') { startTones(); }
  else if (name === 'builder') { startBuilder(); }
  else if (name === 'listening') { startListening(); }
  else if (name === 'flashcards') { startFlashcards(); }
  else if (name === 'speaking') { startSpeakingGame(); }
  else if (name === 'srs') { startSRS(); }
}

// ─── SAVE ITEM ────────────────────────────────────
function saveItem(h, p, m, type) {
  if (!h) return;
  const exists = db.saved.find(s => s.h === h);
  if (exists) { toast('Already saved!', 'info'); return; }
  db.saved.push({ h, p, m: m || '', type: type || 'word' });
  saveDB();
  toast('Saved: ' + h, 'success');
}

function removeSaved(i) {
  db.saved.splice(i, 1);
  saveDB();
  renderSaved();
}

function clearSaved() {
  if (!confirm('Remove all saved words?')) return;
  db.saved = [];
  saveDB();
  renderSaved();
}

// ─── HOME PAGE ────────────────────────────────────
function renderHome() {
  updXP();
  const cont = document.getElementById('home-continue');
  if (!cont) return;
  // Find first incomplete unit
  const unit = UNITS.find(u => u.lessons.some(l => !db.done[l.id])) || UNITS[0];
  const lesson = unit ? unit.lessons.find(l => !db.done[l.id]) || unit.lessons[0] : null;
  if (lesson) {
    const w = ALL_WORDS.find(w => lesson.words.includes(w.h)) || ALL_WORDS[0];
    cont.innerHTML = `<div class="card card-hover" style="cursor:pointer;text-align:center;padding:24px" onclick="openLesson(${UNITS.indexOf(unit)},${unit.lessons.indexOf(lesson)})">
      <div style="font-family:var(--cn);font-size:64px;font-weight:900;color:var(--text);margin-bottom:8px">${w.h}</div>
      <div style="font-size:14px;color:var(--blue);font-weight:700">${w.p}</div>
      <div style="font-size:13px;color:var(--text2);margin-top:4px">${w.m}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:8px;font-weight:700">${lesson.title} · ${unit.title}</div>
    </div>`;
  }
}

// ─── LEARN / COURSES ──────────────────────────────
let curLessonUnit, curLessonLesson;

function renderLearn() {
  const el = document.getElementById('learn-content');
  if (!el) return;
  const unitColors = [
    {bg:'var(--green)',border:'var(--green-d)',icon:'🌱'},
    {bg:'var(--blue)',border:'var(--blue-d)',icon:'🌊'},
    {bg:'var(--orange)',border:'var(--orange-d)',icon:'🌅'},
    {bg:'var(--purple)',border:'var(--purple-d)',icon:'⭐'},
    {bg:'var(--pink)',border:'#d63096',icon:'🌸'},
    {bg:'var(--teal)',border:'#229d8b',icon:'🏯'},
    {bg:'#e67e22',border:'#ca6f1e',icon:'🍜'},
    {bg:'#8e44ad',border:'#6c3483',icon:'🎎'},
    {bg:'var(--red)',border:'var(--red-d)',icon:'🐉'},
  ];
  let h = '<div class="course-path">';
  UNITS.forEach((u, ui) => {
    const col = unitColors[ui % unitColors.length];
    const done = u.lessons.filter(l => db.done[l.id]).length;
    const pct = Math.round(done / u.lessons.length * 100);
    h += `<div class="path-unit">
      <div class="path-unit-header">
        <div class="path-unit-color" style="background:${col.bg};color:#fff">${u.emoji || col.icon}</div>
        <div style="flex:1">
          <div style="font-weight:900;font-size:15px;color:var(--text)">${u.title}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px;font-weight:700">${done}/${u.lessons.length} completed · ${pct}%</div>
          <div class="xp-bar xp-bar-sm mt-8"><div class="xp-fill" style="width:${pct}%;background:${col.bg}"></div></div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="startUnitTest(${u.id})">Quick Test</button>
      </div>
      <div class="path-lessons-row">`;
    u.lessons.forEach((l, li) => {
      const isDone = !!db.done[l.id];
      const isNext = !isDone && (li === 0 || db.done[u.lessons[li-1]?.id]);
      const stateClass = isDone ? 'done' : isNext ? 'current' : 'locked';
      const icon = isDone ? '✓' : isNext ? (u.emoji || col.icon) : '🔒';
      const nodeClick = `openLesson(${ui},${li})`;
      h += `<div class="path-node" onclick="${nodeClick}">
        <div class="path-bubble ${stateClass}" style="${stateClass==='done'?'background:'+col.bg+';border-color:'+col.border:stateClass==='current'?'border-color:'+col.bg+';color:'+col.bg:''}">
          <span style="font-size:${isDone?'18':'22'}px">${icon}</span>
          ${isNext?'<div class="path-star">✨</div>':''}
        </div>
        <span class="path-node-label">${l.title}</span>
        <span style="font-size:10px;color:var(--muted);font-weight:700">${l.words.length}w</span>
      </div>`;
    });
    h += '</div></div>';
  });
  h += '</div>';
  el.innerHTML = h;
}

function openLesson(unitIdx, lessonIdx) {
  curLessonUnit = UNITS[unitIdx];
  curLessonLesson = curLessonUnit ? curLessonUnit.lessons[lessonIdx] : null;
  if (!curLessonUnit || !curLessonLesson) { console.warn('[HanyuStar] openLesson: invalid indices', unitIdx, lessonIdx); return; }
  window.curLessonUnit = curLessonUnit;
  window.curLessonLesson = curLessonLesson;
  const titleEl = document.getElementById('lesson-title');
  if (titleEl) titleEl.textContent = curLessonLesson.title;
  // Show the lesson page first
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const lessonPage = document.getElementById('pg-lesson');
  if (lessonPage) { lessonPage.classList.add('active'); lessonPage.scrollTop = 0; }
  window.scrollTo(0, 0);
  // Update nav active state
  document.querySelectorAll('.sb-item, .mob-tab').forEach(item => {
    item.classList.toggle('active', item.dataset.page === 'learn');
  });
  curPage = 'lesson';
  // Now render content into the visible page
  window._renderLessonNow();
}

// Master lesson renderer — attached to window to prevent override conflicts
window._renderLessonNow = function() {
  const el = document.getElementById('lesson-body');
  // Support both local and window-scoped lesson vars
  if (!window.curLessonLesson) window.curLessonLesson = curLessonLesson;
  if (!window.curLessonUnit) window.curLessonUnit = curLessonUnit;
  const lesson = window.curLessonLesson || curLessonLesson;
  if (!el || !lesson) { 
    if (el) el.innerHTML = '<div style="padding:40px;text-align:center;color:#888"><div style="font-size:48px;margin-bottom:16px">📚</div><p>Select a lesson from Courses to begin!</p></div>'; 
    return; 
  }
  // Ensure local var is synced
  if (!curLessonLesson) { curLessonLesson = lesson; }
  const words = lesson.words.map(wh => ALL_WORDS.find(w => w.h === wh)).filter(Boolean);

  // Tone color map
  const toneColors = {'1':'#e74c3c','2':'#2980b9','3':'#27ae60','4':'#8e44ad','5':'#888888'};
  function getToneNum(pinyin) {
    if (!pinyin) return '5';
    const toneMarks = {'ā':'1','á':'2','ǎ':'3','à':'4','ē':'1','é':'2','ě':'3','è':'4','ī':'1','í':'2','ǐ':'3','ì':'4','ō':'1','ó':'2','ǒ':'3','ò':'4','ū':'1','ú':'2','ǔ':'3','ù':'4','ǖ':'1','ǘ':'2','ǚ':'3','ǜ':'4'};
    for (const [mark, tone] of Object.entries(toneMarks)) {
      if (pinyin.includes(mark)) return tone;
    }
    return '5';
  }

  // Memory hooks for words
  const memoryHooks = {
    '你': 'Think: NI-hao sounds like "knee" — bow down on your knee to greet!',
    '好': 'A woman (女) with a child (子) = GOOD family = 好 (hǎo)',
    '我': 'Picture a sword (戈) over a hand — "I protect myself"!',
    '是': 'It means "to be/is" — think of "sure it is!"',
    '不': 'A bird flying away — NOT staying, flying off = 不 (bù)',
    '人': 'Two legs walking — that\'s a person! 人 looks like stick figure legs',
    '大': 'A person (人) stretching arms wide = BIG! 大 (dà)',
    '小': 'Three dots, tiny — SMALL things come in threes! 小 (xiǎo)',
    '中': 'A line through the middle = CENTER/MIDDLE! 中 (zhōng)',
    '国': 'A box with a king inside — a COUNTRY! 国 (guó)',
    '爱': 'Heart (心) in the middle = LOVE! 爱 (ài)',
    '来': 'A tree with people under it, coming to rest = COME! 来 (lái)',
    '去': 'Picture someone walking away = GO! 去 (qù)',
    '吃': 'Mouth (口) + beg = to EAT! 吃 (chī)',
    '喝': 'Mouth (口) + harmonious = to DRINK! 喝 (hē)',
    '学': 'Child (子) under a roof with hands reaching up = STUDY! 学 (xué)',
    '说': 'Speech (讠) + change = to SPEAK! 说 (shuō)',
    '听': 'Ear with people = LISTEN! 听 (tīng)',
    '看': 'Hand over eye = LOOK/WATCH! 看 (kàn)',
    '买': 'Shell (贝) from below — ancient money going up = BUY! 买 (mǎi)',
  };

  // Visual tone diagram SVG
  function toneSVG(tone) {
    const paths = {
      '1': 'M10,20 L90,20',         // flat high
      '2': 'M10,30 Q50,10 90,5',     // rising
      '3': 'M10,15 Q40,35 60,30 Q80,25 90,10', // dip
      '4': 'M10,5 L90,35',           // falling
      '5': 'M35,20 L65,20',          // neutral short
    };
    const col = toneColors[tone] || '#888';
    return `<svg viewBox="0 0 100 40" width="60" height="24" style="display:block">
      <path d="${paths[tone]||paths['5']}" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${tone!='5'?`<circle cx="90" cy="${{'1':'20','2':'5','3':'10','4':'35','5':'20'}[tone]}" r="4" fill="${col}"/>`:''}
    </svg>`;
  }

  let h = `
    <!-- LESSON STAGES -->
    <div id="lesson-stages">

    <!-- STAGE 1: VISUAL WORD INTRO -->
    <div id="stage-intro" class="lesson-stage">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding:14px 16px;background:linear-gradient(135deg,rgba(28,176,246,.08),rgba(0,100,220,.05));border-radius:16px;border:2px solid rgba(28,176,246,.15)">
        <div style="width:32px;height:32px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:14px;flex-shrink:0">1</div>
        <div>
          <div style="font-weight:900;font-size:14px">Meet the Words</div>
          <div style="font-size:11px;color:var(--muted)">Tap each card to hear & learn a memory trick</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:24px">
  `;

  words.forEach((w, wi) => {
    const toneNum = getToneNum(w.p);
    const toneCol = toneColors[toneNum] || '#888';
    const hook = memoryHooks[w.h] || (typeof MEM_HOOKS !== 'undefined' && MEM_HOOKS[w.h]) || `The character looks like what it means — use your imagination!`;
    const safe = w.h.replace(/'/g,"\\'");
    const gradients = [
      'linear-gradient(135deg,#667eea,#764ba2)',
      'linear-gradient(135deg,#f093fb,#f5576c)',
      'linear-gradient(135deg,#4facfe,#00f2fe)',
      'linear-gradient(135deg,#43e97b,#38f9d7)',
      'linear-gradient(135deg,#fa709a,#fee140)',
      'linear-gradient(135deg,#a18cd1,#fbc2eb)',
    ];
    const grad = gradients[wi % gradients.length];
    h += `
    <div style="border-radius:18px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,.08);cursor:pointer;transition:transform .2s,box-shadow .2s" onclick="speak('${safe}')" onmouseenter="this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 32px rgba(0,0,0,.12)'" onmouseleave="this.style.transform='';this.style.boxShadow='0 6px 20px rgba(0,0,0,.08)'">
      <div style="background:${grad};padding:24px;text-align:center;position:relative">
        <div style="font-family:var(--cn);font-size:64px;font-weight:900;color:#fff;line-height:1;text-shadow:0 3px 16px rgba(0,0,0,.2)">${w.h}</div>
        <div style="position:absolute;top:10px;right:12px;background:rgba(255,255,255,.25);border-radius:99px;padding:2px 8px;font-size:10px;font-weight:900;color:#fff">Tone ${toneNum}</div>
      </div>
      <div style="background:var(--card);border:2px solid var(--card-border);border-top:none;padding:14px;border-radius:0 0 18px 18px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:16px;font-weight:800;color:${toneCol}">${w.p}</span>
          ${toneSVG(toneNum)}
        </div>
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:8px">${w.m}</div>
        <div style="font-size:11px;color:var(--text2);line-height:1.5;background:rgba(255,200,0,.08);border-radius:8px;padding:8px;border-left:3px solid var(--yellow)">💡 ${hook}</div>
        <div style="display:flex;gap-6px;margin-top:10px;gap:6px">
          <button onclick="event.stopPropagation();speak('${safe}')" style="flex:1;padding:7px;border-radius:9px;border:2px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font)">🔊 Hear</button>
          <button onclick="event.stopPropagation();lessonSpeak('${safe}','${w.p.replace(/'/g,"\\\\'")}',${wi})" style="flex:1;padding:7px;border-radius:9px;border:2px solid var(--purple);background:var(--purple-bg);color:var(--purple-d);font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font)">🎤 Say it!</button>
          <button onclick="event.stopPropagation();saveItem('${safe}','${w.p}','${w.m}','word')" style="padding:7px 12px;border-radius:9px;border:2px solid var(--card-border);background:var(--card);color:var(--text2);font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font)">♥</button>
        </div>
      </div>
    </div>`;
  });

  h += `
      </div>
      <!-- Example sentences with color-coded grammar -->
      <div style="margin-bottom:16px;font-weight:900;font-size:14px;color:var(--text)">📝 Example Sentences</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
  `;

  lesson.sentences.forEach((s, si) => {
    const safeH = s.cn.replace(/'/g,"\\'").replace(/"/g,'&quot;');
    const colors = ['#e74c3c','#2980b9','#27ae60','#8e44ad','#d35400','#1abc9c','#e67e22','#16a085'];
    // Color each character
    const coloredChars = [...s.cn].map((c, ci) => {
      if (/[\s，。！？、；：""''（）《》]/.test(c)) return `<span style="font-size:22px;color:var(--text2)">${c}</span>`;
      const col = colors[ci % colors.length];
      const safeC = c.replace(/'/g,"\\'");
      return `<span style="font-family:var(--cn);font-size:26px;font-weight:900;color:${col};cursor:pointer;padding:0 1px;border-bottom:3px solid ${col}30" onclick="event.stopPropagation();speak('${safeC}')" title="Click to hear this character">${c}</span>`;
    }).join('');
    h += `<div style="background:var(--card);border:2px solid var(--card-border);border-radius:16px;padding:16px;box-shadow:0 2px 0 var(--card-border)">
      <div style="line-height:2;margin-bottom:10px;flex-wrap:wrap;display:flex;align-items:center">${coloredChars}</div>
      <div style="font-size:13px;color:var(--blue);font-weight:700;margin-bottom:4px">${s.py}</div>
      <div style="font-size:12px;color:var(--text2);font-style:italic;margin-bottom:10px">"${s.en}"</div>
      <div style="display:flex;gap:6px">
        <button onclick="speak('${safeH}')" style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:9px;border:2px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font)">🔊 Listen</button>
        <button onclick="lessonSpeak('${safeH}','${(s.py||'').replace(/'/g,"\\'")}',${si})" style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:9px;border:2px solid var(--purple);background:var(--purple-bg);color:var(--purple-d);font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font)">🎤 Try it!</button>
        <button onclick="saveItem('${safeH}','${(s.py||'').replace(/'/g,"\\'")}','${(s.en||'').replace(/'/g,"\\'").replace(/"/g,'&quot;')}','sentence')" style="padding:6px 10px;border-radius:9px;border:2px solid var(--card-border);background:var(--card);color:var(--text2);font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font)">♥</button>
      </div>
      <div id="ls-result-${si}" style="display:none;margin-top:8px"></div>
    </div>`;
  });

  h += `
      </div>

      <!-- MINI QUIZ -->
      <div style="background:linear-gradient(135deg,var(--yellow-bg),rgba(255,200,0,.03));border:2px solid var(--yellow);border-radius:18px;padding:18px;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--yellow);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">⚡</div>
          <div style="font-weight:900;font-size:14px">Quick Check — Which meaning?</div>
        </div>
        <div id="lesson-mini-quiz"></div>
      </div>

      <button class="btn btn-green btn-full" style="font-size:16px;padding:16px" onclick="completeLesson()">✓ Complete Lesson — Earn 30 XP!</button>
    </div>
    </div>
  `;

  el.innerHTML = h;

  // Build the mini quiz
  if (words.length >= 2) {
    const qWord = words[Math.floor(Math.random() * words.length)];
    const wrongs = words.filter(w => w.h !== qWord.h).sort(() => Math.random()-.5).slice(0,3);
    const opts = [qWord, ...wrongs].sort(() => Math.random()-.5);
    const qEl = document.getElementById('lesson-mini-quiz');
    if (qEl) {
      const safe = qWord.h.replace(/'/g,"\\'");
      qEl.innerHTML = `
        <div style="text-align:center;margin-bottom:14px">
          <div style="font-family:var(--cn);font-size:56px;font-weight:900;cursor:pointer;margin-bottom:6px" onclick="speak('${safe}')">${qWord.h}</div>
          <div style="font-size:14px;color:var(--blue);font-weight:700">${qWord.p}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${opts.map(o => `<button onclick="lessonQuizAns(this,'${o.h.replace(/'/g,"\\'")}','${qWord.h.replace(/'/g,"\\'")}','${qWord.m.replace(/'/g,"\\'")}')" style="padding:12px;border-radius:12px;border:2px solid var(--card-border);background:var(--card);font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font);transition:all .15s">${o.m}</button>`).join('')}
        </div>
        <div id="lq-result" style="display:none;margin-top:10px;font-weight:800;font-size:13px;padding:10px;border-radius:10px;text-align:center"></div>
      `;
    }
  }
}

function completeLesson() {
  if (!curLessonLesson) return;
  const isNew = !db.done[lesson.id];
  db.done[lesson.id] = true;
  saveDB();
  if (isNew) addXP(30);
  toast('Lesson complete! +30 XP 🎉', 'success');
  go('learn');
}

function lessonQuizAns(btn, chosen, correct, meaning) {
  document.querySelectorAll('[onclick*="lessonQuizAns"]').forEach(b => b.disabled = true);
  const ok = chosen === correct;
  btn.style.background = ok ? 'var(--green-bg)' : 'var(--red-bg)';
  btn.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
  btn.style.color = ok ? 'var(--green-d)' : 'var(--red-d)';
  const r = document.getElementById('lq-result');
  if (r) {
    r.style.display = 'block';
    r.style.background = ok ? 'var(--green-bg)' : 'var(--yellow-bg)';
    r.style.color = ok ? 'var(--green-d)' : 'var(--yellow-d)';
    r.innerHTML = ok ? '🌟 Correct! Great memory!' : `Not quite — the answer is: <strong>${meaning}</strong>`;
    if (ok) addXP(5);
  }
}

async function lessonSpeak(cn, py, idx) {
  const resultEl = document.getElementById('ls-result-' + idx);
  if (resultEl) { resultEl.style.display='block'; resultEl.innerHTML='<span style="color:var(--muted);font-size:12px">🎤 Listening...</span>'; }
  speak(cn);
  await new Promise(r => setTimeout(r, 1100));
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    if (resultEl) resultEl.innerHTML = '<span style="color:var(--red);font-size:12px">❌ Use Chrome for voice practice</span>';
    return;
  }
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new Rec();
  rec.lang = 'zh-CN'; rec.interimResults = false; rec.maxAlternatives = 5;
  rec.onresult = async (e) => {
    const heard = Array.from(e.results).map(r => r[0].transcript).join('');
    if (resultEl) resultEl.innerHTML = `<span style="font-size:12px;color:var(--muted)">🔄 Analyzing: "${heard}"...</span>`;
    try {
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer your_groq_api_key_here' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', max_tokens: 100,
          messages: [{ role: 'user', content: `Chinese pronunciation coach. Student said "${cn}" (${py}), speech rec heard: "${heard}". Give ONE short encouraging sentence of feedback. No markdown.` }]
        })
      });
      const d = await resp.json();
      const fb = d.choices?.[0]?.message?.content || '✓ Good try! Keep practicing!';
      const heard0 = e.results[0][0].transcript;
      const match = heard0.includes(cn.slice(0,1)) || cn.includes(heard0.slice(0,1));
      if (resultEl) resultEl.innerHTML = `
        <div style="padding:10px;border-radius:10px;background:${match?'var(--green-bg)':'var(--yellow-bg)'};border:1.5px solid ${match?'var(--green)':'var(--yellow)'};font-size:12px;color:${match?'var(--green-d)':'var(--yellow-d)'}">
          <div style="font-weight:800;margin-bottom:3px">You said: "${heard0}"</div>
          <div>${fb}</div>
        </div>`;
      addXP(10);
    } catch(err) {
      if (resultEl) resultEl.innerHTML = '<span style="color:var(--green);font-size:12px">✓ Good effort! Keep practicing!</span>';
      addXP(5);
    }
  };
  rec.onerror = () => {
    if (resultEl) resultEl.innerHTML = '<span style="color:var(--red);font-size:12px">❌ Mic error — check permissions</span>';
  };
  try { rec.start(); } catch(e) {}
}

// ─── CHARACTERS ───────────────────────────────────
let curCharTab = 'radicals';

function charTab(tab, btn) {
  curCharTab = tab;
  if (btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }
  const el = document.getElementById('chars-body');
  if (!el) return;
  if (tab === 'radicals') {
    let h = '<div class="grid-4">';
    RADICALS.forEach(r => {
      h += `<div class="card card-hover text-center" style="cursor:pointer;padding:16px" onclick="showRadical('${r.r}')">
        <div style="font-family:var(--cn);font-size:40px;font-weight:900;color:var(--gold)">${r.r}</div>
        <div style="font-size:12px;font-weight:700;margin-top:4px">${r.name}</div>
        <div style="font-size:11px;color:var(--muted);font-style:italic">${r.py}</div>
        <button class="btn btn-blue btn-sm mt-8" onclick="event.stopPropagation();speak('${r.r}')">🔊</button>
      </div>`;
    });
    h += '</div>';
    el.innerHTML = h;
  } else {
    const words = tab === 'hsk1' ? HSK1 : tab === 'hsk2' ? HSK2 : HSK3;
    let h = '<div class="grid-4">';
    words.forEach(w => {
      h += `<div class="card card-hover text-center" style="cursor:pointer;padding:16px" onclick="speak('${w.h.replace(/'/g,"\\'")}')">
        <div style="font-family:var(--cn);font-size:36px;font-weight:900;color:var(--text)">${w.h}</div>
        <div style="font-size:12px;color:var(--blue);margin-top:4px">${w.p}</div>
        <div style="font-size:11px;color:var(--text2)">${w.m}</div>
        <button class="save-btn-inline mt-6" onclick="event.stopPropagation();saveItem('${w.h.replace(/'/g,"\\'")}','${w.p}','${w.m}','word')">♥</button>
      </div>`;
    });
    h += '</div>';
    el.innerHTML = h;
  }
}

function showRadical(r) {
  const rad = RADICALS.find(x => x.r === r);
  if (!rad) return;
  go('chardetail');
  let h = `<div class="text-center mb-24">
    <div style="font-family:var(--cn);font-size:80px;font-weight:900;color:var(--gold);cursor:pointer" onclick="speak('${r}')">${r}</div>
    <div style="font-size:20px;font-weight:900;margin-top:8px">${rad.name}</div>
    <div style="font-size:14px;color:var(--blue);margin-top:4px">${rad.py}</div>
    <div style="font-size:13px;color:var(--text2);margin-top:6px">${rad.meaning || ''}</div>
    <button class="btn btn-blue mt-12" onclick="speak('${r}')">🔊 Listen</button>
  </div>
  <div class="section-label">Characters using this radical</div>
  <div class="grid-4 mt-12">`;
  (rad.examples || []).forEach(c => {
    h += `<div class="card card-hover text-center" style="cursor:pointer;padding:16px" onclick="speak('${c}')">
      <div style="font-family:var(--cn);font-size:36px;font-weight:900">${c}</div>
      <div style="font-size:10px;color:var(--muted);margin-top:4px;font-weight:700">tap to hear</div>
    </div>`;
  });
  h += '</div>';
  document.getElementById('chardetail-body').innerHTML = h;
  speak(r);
}

// ─── GRAMMAR ──────────────────────────────────────
function renderGrammar() {
  const el = document.getElementById('grammar-body');
  if (!el) return;
  let h = '';
  GRAMMAR.forEach(g => {
    h += `<div class="card mb-16">
      <div style="font-weight:900;font-size:16px;margin-bottom:4px">${g.title}</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:12px">${g.level || ''}</div>
      <div style="font-size:14px;color:var(--text2);margin-bottom:12px;line-height:1.6">${g.explanation || g.desc || ''}</div>`;
    if (g.pattern) {
      h += `<div class="card" style="background:rgba(88,204,2,.05);border-color:var(--green);padding:12px;margin-bottom:12px">
        <div style="font-size:12px;font-weight:800;color:var(--green);margin-bottom:6px">PATTERN</div>
        <div style="font-family:monospace;font-size:14px">${g.pattern}</div>
      </div>`;
    }
    if (g.examples && g.examples.length) {
      h += '<div class="flex-col gap-6">';
      g.examples.forEach(ex => {
        const cn = ex.cn || ex;
        const py = ex.py || '';
        const en = ex.en || '';
        h += `<div class="card" style="padding:12px;cursor:pointer" onclick="speak('${cn.replace(/'/g,"\\'")}')">
          <div style="font-family:var(--cn);font-size:18px;font-weight:700">${cn}</div>
          ${py ? `<div style="font-size:12px;color:var(--blue);margin-top:4px">${py}</div>` : ''}
          ${en ? `<div style="font-size:12px;color:var(--text2);margin-top:2px">${en}</div>` : ''}
        </div>`;
      });
      h += '</div>';
    }
    h += '</div>';
  });
  el.innerHTML = h;
}

// ─── CONVERSATIONS ────────────────────────────────
function renderConvos() {
  const el = document.getElementById('convos-body');
  if (!el) return;
  let h = '';
  CONVOS.forEach((c, i) => {
    h += `<div class="card card-hover flex items-center gap-16" style="cursor:pointer;padding:16px" onclick="openConvo(${i})">
      <div style="font-size:28px">${c.emoji || '💬'}</div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:15px">${c.title}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px">${c.desc || (c.turns ? c.turns.length + ' lines' : '')}</div>
      </div>
    </div>`;
  });
  el.innerHTML = h;
}

function openConvo(i) {
  const c = CONVOS[i];
  if (!c) return;
  document.getElementById('convdetail-title').textContent = c.title;
  let h = '<div class="flex-col gap-10">';
  (c.turns || []).forEach(t => {
    const isA = t.role === 'A';
    h += `<div class="flex gap-10" style="flex-direction:${isA?'row':'row-reverse'}">
      <div style="font-size:24px;flex-shrink:0">${isA ? (c.avatarA||'👤') : (c.avatarB||'🙂')}</div>
      <div class="card" style="max-width:80%;padding:12px">
        <div style="font-family:var(--cn);font-size:18px;font-weight:700;cursor:pointer" onclick="speak('${t.cn.replace(/'/g,"\\'")}')">
          ${t.cn}</div>
        <div style="font-size:12px;color:var(--blue);margin-top:4px">${t.py||''}</div>
        <div style="font-size:12px;color:var(--text2);margin-top:2px">${t.en||''}</div>
        <div class="flex gap-6 mt-8">
          <button class="btn btn-blue btn-sm" data-listen="${t.cn.replace(/"/g,'&quot;')}">🔊</button>
          <button class="btn btn-red btn-sm" data-practice="${t.cn.replace(/"/g,'&quot;')}" data-py="${(t.py||'').replace(/"/g,'&quot;')}">🎤</button>
          <button class="save-btn-inline" data-saveconv="${t.cn.replace(/"/g,'&quot;')}" data-saveconvpy="${(t.py||'').replace(/"/g,'&quot;')}" data-saveconven="${(t.en||'').replace(/"/g,'&quot;')}">♥</button>
        </div>
      </div>
    </div>`;
  });
  h += '</div>';
  const el = document.getElementById('convdetail-body');
  el.innerHTML = h;
  el.querySelectorAll('[data-listen]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.listen)));
  el.querySelectorAll('[data-speak]').forEach(chip => chip.addEventListener('click', () => speak(chip.dataset.speak)));
  el.querySelectorAll('[data-saveconv]').forEach(btn => btn.addEventListener('click', () => saveItem(btn.dataset.saveconv, btn.dataset.saveconvpy, btn.dataset.saveconven, 'sentence')));
  go('convdetail');
}

// ─── WRITING PRACTICE ─────────────────────────────
let writingCanvas = null, writingCtx = null, writingStrokes = [], writingTarget = '写';
let _hwWriter = null; // global hanzi-writer instance

// ── Hanzi-Writer helpers ───────────────────────────
function _hwDestroy() {
  // hanzi-writer doesn't expose a destroy(); just clear the container
  const wrap = document.getElementById('hw-writer-wrap');
  if (wrap) wrap.innerHTML = '<svg id="hw-writer-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg"></svg>';
  _hwWriter = null;
}

function _hwInit(char, mode) {
  // mode: 'animate' | 'quiz' | 'outline'
  _hwDestroy();
  const svgEl = document.getElementById('hw-writer-svg');
  if (!svgEl || typeof HanziWriter === 'undefined') return;

  const isDark = document.body.classList.contains('dark');

  const commonOpts = {
    width: 200, height: 200,
    padding: 16,
    showOutline: true,
    strokeColor: isDark ? '#4fb8e8' : '#1c6fa0',
    outlineColor: isDark ? 'rgba(79,184,232,0.18)' : 'rgba(79,184,232,0.25)',
    radicalColor: isDark ? '#8b5cf6' : '#7040d0',
    highlightColor: isDark ? '#ffc800' : '#ff9600',
    drawingColor: isDark ? '#4fb8e8' : '#1c6fa0',
    drawingWidth: 5,
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 400,
  };

  try {
    _hwWriter = HanziWriter.create(svgEl, char, commonOpts);
  } catch(e) {
    console.warn('[HanyuStar] HanziWriter.create failed:', e);
    return;
  }

  if (mode === 'animate') {
    _hwWriter.loopCharacterAnimation();
    _hwUpdateCounter('Animating stroke order…');
  } else if (mode === 'outline') {
    _hwUpdateCounter('Stroke outline shown — tap Animate to see the order');
  } else if (mode === 'quiz') {
    _hwStartQuiz();
  }
}

function _hwStartQuiz() {
  if (!_hwWriter) return;
  let strokeIdx = 0;
  _hwUpdateCounter('Draw each stroke in order ✏️');
  _hwWriter.quiz({
    onMistake: (strokeData) => {
      _hwUpdateCounter(`Stroke ${strokeData.strokeNum + 1}: Try again — watch the hint!`);
    },
    onCorrectStroke: (strokeData) => {
      strokeIdx = strokeData.strokeNum + 1;
      const total = strokeData.totalStrokes;
      _hwUpdateCounter(`✓ Stroke ${strokeIdx} of ${total} correct!`);
      if (strokeIdx >= total) {
        _hwUpdateCounter('🎉 Perfect! All strokes correct!');
        if (typeof addXP === 'function') addXP(15);
        if (typeof toast === 'function') toast('Perfect stroke order! +15 XP ✨', 'success');
        const panel = document.getElementById('hw-panel');
        if (panel) panel.classList.add('hw-quiz-correct');
      }
    },
    showHintAfterMisses: 2,
    highlightOnComplete: true,
  });
}

function _hwUpdateCounter(msg) {
  const el = document.getElementById('hw-stroke-counter');
  if (el) el.textContent = msg;
}

function hwSetMode(mode, btn) {
  // Highlight active button
  document.querySelectorAll('.hw-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  _hwInit(writingTarget, mode);
}

function initWritingCanvas() {
  writingCanvas = document.getElementById('writing-canvas');
  if (!writingCanvas) return;
  writingCtx = writingCanvas.getContext('2d');
  const size = 280;
  writingCanvas.width = size;
  writingCanvas.height = size;
  writingCtx.lineCap = 'round';
  writingCtx.lineJoin = 'round';
  writingCtx.lineWidth = 4;
  writingCtx.fillStyle = '#f0f0f0';
  writingCtx.fillRect(0, 0, size, size);
  let isDrawing = false;
  writingCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    writingStrokes.push([]);
    const rect = writingCanvas.getBoundingClientRect();
    writingCtx.strokeStyle = '#000';
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    writingCtx.beginPath();
    writingCtx.moveTo(x, y);
    writingStrokes[writingStrokes.length-1].push({x,y});
  });
  writingCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const rect = writingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    writingCtx.lineTo(x, y);
    writingCtx.stroke();
    writingStrokes[writingStrokes.length-1].push({x,y});
  });
  writingCanvas.addEventListener('mouseup', () => isDrawing = false);
  writingCanvas.addEventListener('mouseleave', () => isDrawing = false);
  writingCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    writingStrokes.push([]);
    const touch = e.touches[0];
    const rect = writingCanvas.getBoundingClientRect();
    writingCtx.strokeStyle = '#000';
    const x = touch.clientX - rect.left, y = touch.clientY - rect.top;
    writingCtx.beginPath();
    writingCtx.moveTo(x, y);
    writingStrokes[writingStrokes.length-1].push({x,y});
  });
  writingCanvas.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = writingCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left, y = touch.clientY - rect.top;
    writingCtx.lineTo(x, y);
    writingCtx.stroke();
    writingStrokes[writingStrokes.length-1].push({x,y});
  });
  writingCanvas.addEventListener('touchend', () => isDrawing = false);
}
function renderWritingPage() {
  const el = document.getElementById('writing-content');
  if (!el) return;
  const chars = [
    // Pronouns & basic grammar
    '你','我','他','她','它','们','的','了','着','过','是','不','在','有','和','也','都','很','太','就','才','还','又','再','已','最','更','真','可','但',
    // People & family
    '人','大','小','多','少','父','母','子','女','男','兄','弟','妹','姐','哥','妻','夫','爷','奶','叔','姑','舅',
    // Common verbs
    '吃','喝','看','听','说','读','写','去','来','回','想','爱','走','跑','跳','站','坐','睡','起','开','关','进','出','上','下','买','卖','用','做','给','拿','放','打','叫','问','答','找','学','教','送','帮','玩','拍','笑','哭','生','死',
    // Nature & elements
    '山','水','火','木','土','金','日','月','星','云','雨','风','雪','花','草','树','鸟','鱼','马','牛','羊','猫','狗',
    // Numbers & time
    '一','二','三','四','五','六','七','八','九','十','百','千','万','年','月','天','时','分','秒','号','岁','前','后','今','明','昨',
    // Adjectives & descriptors
    '好','坏','高','低','长','短','快','慢','新','旧','美','丑','强','弱','重','轻','热','冷','暖','凉','亮','暗','早','晚','远','近','苦','甜','酸','辣',
    // Nouns & places
    '国','中','家','门','窗','路','车','书','笔','纸','钱','手','眼','口','耳','头','心','脚','腿','背',
    // Colors
    '红','蓝','绿','白','黑','黄','紫','灰','橙',
    // HSK chars
    '朋','友','请','谢','茶','菜','累','跑','帮','玩','这','那','哪'
  ].filter((c,i,a)=>a.indexOf(c)===i); // deduplicate
  if (!writingTarget || !chars.includes(writingTarget)) writingTarget = chars[Math.floor(Math.random()*chars.length)];

  // Pinyin + meaning lookup from HSK data
  const allVocabMap = {};
  (typeof HSK1 !== 'undefined' ? HSK1 : []).concat(typeof HSK2 !== 'undefined' ? HSK2 : []).concat(typeof HSK3 !== 'undefined' ? HSK3 : []).forEach(w => { if (w.h) allVocabMap[w.h] = w; });
  const fallbackData = {
    // Pronouns & grammar
    '你':{p:'nǐ',m:'you'},'我':{p:'wǒ',m:'I / me'},'他':{p:'tā',m:'he'},'她':{p:'tā',m:'she'},'它':{p:'tā',m:'it'},
    '们':{p:'men',m:'plural marker'},'的':{p:'de',m:'possessive / of'},'了':{p:'le',m:'completed action'},'着':{p:'zhe',m:'ongoing state'},'过':{p:'guò',m:'past experience'},
    '是':{p:'shì',m:'am / is / are'},'不':{p:'bù',m:'not / no'},'在':{p:'zài',m:'at / in'},'有':{p:'yǒu',m:'have / exist'},'和':{p:'hé',m:'and / with'},
    '也':{p:'yě',m:'also / too'},'都':{p:'dōu',m:'all / both'},'很':{p:'hěn',m:'very'},'太':{p:'tài',m:'too / excessively'},'就':{p:'jiù',m:'then / at once'},
    '才':{p:'cái',m:'only then / just'},'还':{p:'hái',m:'still / also'},'又':{p:'yòu',m:'again (past)'},'再':{p:'zài',m:'again (future)'},'已':{p:'yǐ',m:'already'},
    '最':{p:'zuì',m:'most / -est'},'更':{p:'gèng',m:'even more'},'真':{p:'zhēn',m:'really / true'},'可':{p:'kě',m:'can / but'},'但':{p:'dàn',m:'but / however'},
    // People & family
    '人':{p:'rén',m:'person'},'大':{p:'dà',m:'big / large'},'小':{p:'xiǎo',m:'small / little'},'多':{p:'duō',m:'many / much'},'少':{p:'shǎo',m:'few / less'},
    '父':{p:'fù',m:'father'},'母':{p:'mǔ',m:'mother'},'子':{p:'zǐ',m:'son / child'},'女':{p:'nǚ',m:'female / daughter'},'男':{p:'nán',m:'male / man'},
    '兄':{p:'xiōng',m:'older brother'},'弟':{p:'dì',m:'younger brother'},'妹':{p:'mèi',m:'younger sister'},'姐':{p:'jiě',m:'older sister'},'哥':{p:'gē',m:'older brother'},
    '妻':{p:'qī',m:'wife'},'夫':{p:'fū',m:'husband'},'爷':{p:'yé',m:'grandpa (paternal)'},'奶':{p:'nǎi',m:'grandma (paternal)'},'叔':{p:'shū',m:'uncle'},
    '姑':{p:'gū',m:'aunt (paternal)'},'舅':{p:'jiù',m:'uncle (maternal)'},
    // Common verbs
    '吃':{p:'chī',m:'to eat'},'喝':{p:'hē',m:'to drink'},'看':{p:'kàn',m:'to look / watch'},'听':{p:'tīng',m:'to listen'},'说':{p:'shuō',m:'to speak'},
    '读':{p:'dú',m:'to read'},'写':{p:'xiě',m:'to write'},'去':{p:'qù',m:'to go'},'来':{p:'lái',m:'to come'},'回':{p:'huí',m:'to return'},
    '想':{p:'xiǎng',m:'to think / want'},'爱':{p:'ài',m:'love'},'走':{p:'zǒu',m:'to walk / leave'},'跑':{p:'pǎo',m:'to run'},'跳':{p:'tiào',m:'to jump'},
    '站':{p:'zhàn',m:'to stand'},'坐':{p:'zuò',m:'to sit'},'睡':{p:'shuì',m:'to sleep'},'起':{p:'qǐ',m:'to rise / get up'},'开':{p:'kāi',m:'to open / start'},
    '关':{p:'guān',m:'to close / shut'},'进':{p:'jìn',m:'to enter'},'出':{p:'chū',m:'to exit'},'上':{p:'shàng',m:'up / on'},'下':{p:'xià',m:'down / under'},
    '买':{p:'mǎi',m:'to buy'},'卖':{p:'mài',m:'to sell'},'用':{p:'yòng',m:'to use'},'做':{p:'zuò',m:'to do / make'},'给':{p:'gěi',m:'to give'},
    '拿':{p:'ná',m:'to hold / take'},'放':{p:'fàng',m:'to put / release'},'打':{p:'dǎ',m:'to hit / play'},'叫':{p:'jiào',m:'to call / shout'},'问':{p:'wèn',m:'to ask'},
    '答':{p:'dá',m:'to answer'},'找':{p:'zhǎo',m:'to look for'},'学':{p:'xué',m:'to study / learn'},'教':{p:'jiāo',m:'to teach'},'送':{p:'sòng',m:'to give / send'},
    '帮':{p:'bāng',m:'to help'},'玩':{p:'wán',m:'to play'},'拍':{p:'pāi',m:'to clap / photograph'},'笑':{p:'xiào',m:'to laugh / smile'},'哭':{p:'kū',m:'to cry'},
    '生':{p:'shēng',m:'to be born / life'},'死':{p:'sǐ',m:'to die / dead'},
    // Nature & elements
    '山':{p:'shān',m:'mountain'},'水':{p:'shuǐ',m:'water'},'火':{p:'huǒ',m:'fire'},'木':{p:'mù',m:'wood / tree'},'土':{p:'tǔ',m:'earth / soil'},
    '金':{p:'jīn',m:'gold / metal'},'日':{p:'rì',m:'sun / day'},'月':{p:'yuè',m:'moon / month'},'星':{p:'xīng',m:'star'},'云':{p:'yún',m:'cloud'},
    '雨':{p:'yǔ',m:'rain'},'风':{p:'fēng',m:'wind'},'雪':{p:'xuě',m:'snow'},'花':{p:'huā',m:'flower'},'草':{p:'cǎo',m:'grass'},
    '树':{p:'shù',m:'tree'},'鸟':{p:'niǎo',m:'bird'},'鱼':{p:'yú',m:'fish'},'马':{p:'mǎ',m:'horse'},'牛':{p:'niú',m:'cow / ox'},
    '羊':{p:'yáng',m:'sheep / goat'},'猫':{p:'māo',m:'cat'},'狗':{p:'gǒu',m:'dog'},
    // Numbers & time
    '一':{p:'yī',m:'one'},'二':{p:'èr',m:'two'},'三':{p:'sān',m:'three'},'四':{p:'sì',m:'four'},'五':{p:'wǔ',m:'five'},
    '六':{p:'liù',m:'six'},'七':{p:'qī',m:'seven'},'八':{p:'bā',m:'eight'},'九':{p:'jiǔ',m:'nine'},'十':{p:'shí',m:'ten'},
    '百':{p:'bǎi',m:'hundred'},'千':{p:'qiān',m:'thousand'},'万':{p:'wàn',m:'ten thousand'},'年':{p:'nián',m:'year'},'天':{p:'tiān',m:'day / sky'},
    '时':{p:'shí',m:'time / hour'},'分':{p:'fēn',m:'minute / divide'},'秒':{p:'miǎo',m:'second'},'号':{p:'hào',m:'number / date'},'岁':{p:'suì',m:'years old'},
    '前':{p:'qián',m:'front / before'},'后':{p:'hòu',m:'back / after'},'今':{p:'jīn',m:'today / now'},'明':{p:'míng',m:'bright / tomorrow'},'昨':{p:'zuó',m:'yesterday'},
    // Adjectives
    '好':{p:'hǎo',m:'good'},'坏':{p:'huài',m:'bad'},'高':{p:'gāo',m:'tall / high'},'低':{p:'dī',m:'low'},'长':{p:'cháng',m:'long'},
    '短':{p:'duǎn',m:'short'},'快':{p:'kuài',m:'fast / quick'},'慢':{p:'màn',m:'slow'},'新':{p:'xīn',m:'new'},'旧':{p:'jiù',m:'old (thing)'},
    '美':{p:'měi',m:'beautiful / USA'},'丑':{p:'chǒu',m:'ugly'},'强':{p:'qiáng',m:'strong'},'弱':{p:'ruò',m:'weak'},'重':{p:'zhòng',m:'heavy'},
    '轻':{p:'qīng',m:'light (weight)'},'热':{p:'rè',m:'hot'},'冷':{p:'lěng',m:'cold'},'暖':{p:'nuǎn',m:'warm'},'凉':{p:'liáng',m:'cool'},
    '亮':{p:'liàng',m:'bright / shiny'},'暗':{p:'àn',m:'dark'},'早':{p:'zǎo',m:'early / morning'},'晚':{p:'wǎn',m:'late / evening'},'远':{p:'yuǎn',m:'far'},
    '近':{p:'jìn',m:'near / close'},'苦':{p:'kǔ',m:'bitter / suffering'},'甜':{p:'tián',m:'sweet'},'酸':{p:'suān',m:'sour'},'辣':{p:'là',m:'spicy / hot'},
    // Nouns & body / places
    '国':{p:'guó',m:'country / nation'},'中':{p:'zhōng',m:'middle / China'},'家':{p:'jiā',m:'home / family'},'门':{p:'mén',m:'door / gate'},'窗':{p:'chuāng',m:'window'},
    '路':{p:'lù',m:'road / path'},'车':{p:'chē',m:'vehicle / car'},'书':{p:'shū',m:'book'},'笔':{p:'bǐ',m:'pen / pencil'},'纸':{p:'zhǐ',m:'paper'},
    '钱':{p:'qián',m:'money'},'手':{p:'shǒu',m:'hand'},'眼':{p:'yǎn',m:'eye'},'口':{p:'kǒu',m:'mouth / opening'},'耳':{p:'ěr',m:'ear'},
    '头':{p:'tóu',m:'head'},'心':{p:'xīn',m:'heart / mind'},'脚':{p:'jiǎo',m:'foot'},'腿':{p:'tuǐ',m:'leg'},'背':{p:'bèi',m:'back'},
    // Colors
    '红':{p:'hóng',m:'red'},'蓝':{p:'lán',m:'blue'},'绿':{p:'lǜ',m:'green'},'白':{p:'bái',m:'white'},'黑':{p:'hēi',m:'black'},
    '黄':{p:'huáng',m:'yellow'},'紫':{p:'zǐ',m:'purple'},'灰':{p:'huī',m:'grey'},'橙':{p:'chéng',m:'orange (color)'},
    // Extras
    '朋':{p:'péng',m:'friend (朋友)'},'友':{p:'yǒu',m:'friend'},'请':{p:'qǐng',m:'please / invite'},'谢':{p:'xiè',m:'thank'},'茶':{p:'chá',m:'tea'},
    '菜':{p:'cài',m:'dish / vegetable'},'累':{p:'lèi',m:'tired'},'帮':{p:'bāng',m:'to help'},'玩':{p:'wán',m:'to play'},
    '这':{p:'zhè',m:'this'},'那':{p:'nà',m:'that'},'哪':{p:'nǎ',m:'which / where'}
  };
  const charInfo = allVocabMap[writingTarget] || fallbackData[writingTarget] || {p:'—',m:'—'};
  const pinyin = charInfo.p || '—';
  const meaning = charInfo.m || '—';

  const hwAvailable = typeof HanziWriter !== 'undefined';
  const hwPanelHTML = hwAvailable ? `
    <div class="hw-panel" id="hw-panel">
      <div class="hw-panel-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>
        Stroke Order Animation
      </div>
      <div class="hw-writer-wrap" id="hw-writer-wrap">
        <svg id="hw-writer-svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
      <div class="hw-stroke-counter" id="hw-stroke-counter">Tap a mode below to start</div>
      <div class="hw-controls">
        <button class="hw-btn" id="hw-btn-animate" onclick="hwSetMode('animate', this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Animate
        </button>
        <button class="hw-btn" id="hw-btn-outline" onclick="hwSetMode('outline', this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Outline
        </button>
        <button class="hw-btn hw-quiz-btn" id="hw-btn-quiz" onclick="hwSetMode('quiz', this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>
          Trace It
        </button>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:8px;line-height:1.5">
        <strong>Animate</strong> — watch stroke order loop &nbsp;|&nbsp; <strong>Outline</strong> — see the full shape &nbsp;|&nbsp; <strong>Trace It</strong> — draw strokes yourself
      </div>
    </div>` : '';

  el.innerHTML = `
    <div class="card mb-16" style="padding:20px;text-align:center">
      <div style="font-size:12px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Write this character:</div>
      <div style="font-family:var(--cn);font-size:80px;font-weight:900;color:var(--blue);margin-bottom:2px;line-height:1;cursor:pointer" onclick="speak(writingTarget)" title="Tap to hear">${writingTarget}</div>
      <div style="font-size:20px;font-weight:800;color:var(--blue-d);letter-spacing:2px;margin-top:6px">${pinyin}</div>
      <div style="font-size:14px;font-weight:600;color:var(--text2);font-style:italic;margin-top:3px;margin-bottom:4px">"${meaning}"</div>
      <div style="display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--muted);margin-bottom:4px">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
        Tap the character to hear it
      </div>
      <div id="writing-feedback" style="min-height:24px;font-size:13px;color:var(--text2);margin-top:8px"></div>
    </div>
    ${hwPanelHTML}
    <div class="card mb-16" style="padding:16px;text-align:center">
      <div style="font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Now practice on your own ✍️</div>
      <canvas id="writing-canvas" style="border:2px solid var(--card-border);border-radius:12px;cursor:crosshair;background:#fff;display:block;margin:0 auto;touch-action:none"></canvas>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-ghost btn-sm" onclick="writingUndo()">↩ Undo</button>
      <button class="btn btn-ghost btn-sm" onclick="writingClear()">✕ Clear</button>
      <button class="btn btn-ghost btn-sm" onclick="writingNext()">Skip →</button>
      <button class="btn btn-green" onclick="writingCheck()">✓ Check</button>
    </div>`;

  setTimeout(() => {
    initWritingCanvas();
    // Auto-start outline mode so the panel isn't blank on load
    if (hwAvailable) {
      const outlineBtn = document.getElementById('hw-btn-outline');
      hwSetMode('outline', outlineBtn);
    }
  }, 80);
}
function closePronModal() {
  const modal = document.getElementById('pron-modal');
  if (modal) modal.classList.add('hidden');
}
function speakPronTarget() {
  const hanzi = document.getElementById('pron-hanzi');
  if (hanzi) speak(hanzi.textContent);
}
function writingUndo() {
  if (!writingCanvas || !writingCtx || !writingStrokes.length) return;
  writingStrokes.pop();
  writingCtx.fillStyle = '#f0f0f0';
  writingCtx.fillRect(0, 0, 280, 280);
  writingStrokes.forEach(stroke => {
    if (stroke.length < 2) return;
    writingCtx.strokeStyle = '#000';
    writingCtx.beginPath();
    writingCtx.moveTo(stroke[0].x, stroke[0].y);
    stroke.forEach(pt => writingCtx.lineTo(pt.x, pt.y));
    writingCtx.stroke();
  });
  toast('Stroke undone', 'info');
}
function writingClear() {
  if (!writingCanvas || !writingCtx) return;
  writingStrokes = [];
  writingCtx.fillStyle = '#f0f0f0';
  writingCtx.fillRect(0, 0, 280, 280);
  toast('Canvas cleared', 'info');
}
async function writingCheck() {
  if (!writingStrokes.length) {
    toast('Draw something first!', 'warning');
    return;
  }
  const fbEl = document.getElementById('writing-feedback');
  const strokeCount = writingStrokes.length;
  const targetChar = writingTarget || '好';
  const strokeGuide = {'你':7,'好':6,'我':7,'是':9,'他':5,'她':6,'们':5,'的':8,'不':4,'在':6,'有':6,'这':7,'那':11,'什':4,'么':3,'人':2,'大':3,'小':3,'中':4,'国':8,'学':8,'生':5,'老':6,'师':10,'朋':8,'友':4,'家':10,'谢':17,'再':6,'吃':6,'喝':12,'水':4,'茶':9,'看':9,'听':7,'说':9,'写':5,'去':5,'来':7,'回':6,'想':13,'爱':10,'一':1,'二':2,'三':3,'四':5,'五':4,'六':4,'七':2,'八':2,'九':2,'十':2};
  const expectedStrokes = strokeGuide[targetChar] || 6;
  const strokeRatio = strokeCount / expectedStrokes;
  const baseScore = (strokeRatio >= 0.6 && strokeRatio <= 1.6) ? Math.max(45, Math.min(92, Math.round(70 + (1 - Math.abs(1 - strokeRatio)) * 22))) : 40;
  if (fbEl) fbEl.innerHTML = '<div style="padding:12px;border-radius:12px;background:var(--blue-bg);border:2px solid var(--blue)"><div style="font-weight:800;font-size:13px;margin-bottom:6px">⏳ Analyzing your writing with AI...</div><div style="font-size:12px;color:var(--blue-d)">You drew ' + strokeCount + ' strokes for ' + targetChar + ' (expected ~' + expectedStrokes + ')</div></div>';
  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+GROQ_K},
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', max_tokens: 200,
        messages: [{role:'user', content: 'A student is practicing writing the Chinese character "' + targetChar + '". They drew ' + strokeCount + ' strokes. Expected ~' + expectedStrokes + ' strokes.\n\nGive feedback as a fun encouraging Chinese teacher. Respond in JSON only (no markdown):\n{"score":<50-95>,"grade":"<Excellent/Good/Almost There/Keep Practicing>","comment":"<1-2 sentence feedback>","tip":"<1 actionable tip for this character>","strokeNote":"<note about stroke count>"}'}]
      })
    });
    const data = await resp.json();
    const raw = (data.choices?.[0]?.message?.content || '').replace(/```json|```/g,'').trim();
    const analysis = JSON.parse(raw);
    const score = analysis.score || baseScore;
    const scoreColor = score>=80?'var(--green)':score>=60?'var(--yellow-d)':'var(--orange)';
    const emoji = score>=80?'🌟':score>=60?'👍':'✏️';
    if (fbEl) fbEl.innerHTML = '<div style="background:var(--card);border:2px solid ' + scoreColor + ';border-radius:16px;padding:16px;margin-top:8px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:10px"><div style="font-size:36px;font-weight:900;color:' + scoreColor + '">' + score + '</div><div><div style="font-weight:900;font-size:15px">' + emoji + ' ' + analysis.grade + '</div><div style="font-size:11px;color:var(--muted)">out of 100</div></div><div style="flex:1;height:8px;background:var(--card-border);border-radius:99px;overflow:hidden"><div style="height:100%;width:' + score + '%;background:' + scoreColor + ';border-radius:99px"></div></div></div><div style="font-size:13px;color:var(--text2);margin-bottom:8px;line-height:1.6">' + analysis.comment + '</div><div style="background:rgba(255,200,0,.08);border-left:3px solid var(--yellow);padding:8px 12px;border-radius:0 10px 10px 0;font-size:12px;color:var(--text2);margin-bottom:8px">💡 <strong>Tip:</strong> ' + analysis.tip + '</div><div style="font-size:11px;color:var(--muted)">' + analysis.strokeNote + '</div></div>';
    if (score >= 65) addXP(10);
    if (score >= 80) setTimeout(() => { toast('Great writing! +10 XP 🎉', 'success'); setTimeout(() => writingNext(), 1200); }, 1800);
  } catch(e) {
    const scoreColor = baseScore>=80?'var(--green)':baseScore>=60?'var(--yellow-d)':'var(--orange)';
    if (fbEl) fbEl.innerHTML = '<div style="border:2px solid ' + scoreColor + ';border-radius:12px;padding:12px;background:var(--card)"><div style="font-size:18px;font-weight:900;color:' + scoreColor + '">' + baseScore + '%</div><div style="font-size:13px;color:var(--text2);margin-top:6px">' + (baseScore>=80?'Great writing!':baseScore>=60?'Good attempt!':'Keep going!') + '</div><div style="font-size:11px;color:var(--muted);margin-top:4px">You drew ' + strokeCount + ' strokes (expected ~' + expectedStrokes + ' for ' + targetChar + ')</div></div>';
    if (baseScore >= 70) addXP(8);
  }
}
function writingNext() {
  const chars = ['你','好','我','是','他','她','们','的','不','在','有','这','那','人','大','小','多','少','学','生','家','请','吃','喝','水','茶','菜','钱','买','看','听','说','读','写','去','来','回','想','爱','很','太','都','也','年','月','日','号','岁','热','冷','教','累','红','蓝','绿','白','黑','送','跑','朋','友','中','国','老','师','父','母','谢','再','山','火','木','土','金'];
  writingTarget = chars[Math.floor(Math.random()*chars.length)];
  _hwDestroy();
  writingClear();
  renderWritingPage();
}

// ─── SAVED WORDS ──────────────────────────────────
function renderSaved() {
  const el = document.getElementById('saved-body');
  if (!el) return;
  if (!db.saved.length) {
    el.innerHTML = '<div class="card text-center" style="padding:48px"><div style="font-size:64px;margin-bottom:16px">📖</div><div style="font-size:18px;font-weight:700;color:var(--text2)">No saved words yet!</div><p style="color:var(--muted);font-size:14px;margin-top:8px">Tap the ♥ on any word or sentence to save it here.</p></div>';
    return;
  }
  const total = db.saved.length;
  let rows = '';
  db.saved.slice().reverse().forEach((item, ri) => {
    const realIdx = total - 1 - ri;
    const typeLabel = item.type === 'sentence' ? '💬 Sentence' : '🔤 Word';
    const safeH = (item.h || '').replace(/'/g, '&apos;');
    rows += `<div class="card flex items-center gap-14" style="padding:16px">
      <div style="font-family:var(--cn);font-size:${item.type==='sentence'?'20':'40'}px;font-weight:900;color:var(--text);flex-shrink:0;cursor:pointer;max-width:120px;word-break:break-all" onclick="speak('${safeH}')">${item.h}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;color:var(--blue);font-weight:700">${item.p||''}</div>
        <div style="font-size:12px;color:var(--text2);font-weight:600;margin-top:2px">${item.m||''}</div>
        <div style="font-size:10px;color:var(--muted);margin-top:4px;font-weight:700;text-transform:uppercase">${typeLabel}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">
        <button class="btn-speak" onclick="speak('${safeH}')">🔊</button>
        <button class="btn btn-ghost btn-sm" onclick="removeSaved(${realIdx})" style="color:var(--red)">✕</button>
      </div>
    </div>`;
  });
  el.innerHTML = `<div style="margin-bottom:16px;font-size:13px;color:var(--muted);font-weight:700">${total} saved items</div><div class="flex-col gap-10">${rows}</div>`;
}

// ─── STORIES ──────────────────────────────────────
function renderStories() {
  const el = document.getElementById('stories-grid');
  if (!el) return;
  let h = '';
  KIDS_STORIES.forEach(s => {
    h += `<div class="card card-hover flex items-center gap-16" style="cursor:pointer;padding:16px" onclick="openStory(${s.id})">
      <div style="font-size:36px">${s.emoji || '📖'}</div>
      <div style="flex:1">
        <div style="font-weight:900;font-size:16px">${s.title}</div>
        <div style="font-size:12px;color:var(--blue);margin-top:2px">${s.titleCn || ''}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px">${s.level || ''} · ${s.slides ? s.slides.length : 0} slides</div>
      </div>
    </div>`;
  });
  el.innerHTML = h || '<p class="text-muted">No stories yet!</p>';
}

let curStory = null, curSlide = 0, curTokenChar = null;

// Word-color palette for stories
const STORY_WORD_COLORS = ['#c0392b','#1a6b94','#1e8449','#7d3c98','#b9770e','#117a65','#943126','#1a5276','#784212','#0e6655'];

// Lookup character info from HSK vocabularies
function lookupChar(char) {
  const allVocab = [...HSK1, ...(typeof HSK2 !== 'undefined' ? HSK2 : []), ...(typeof HSK3 !== 'undefined' ? HSK3 : [])];
  const found = allVocab.find(v => v.h.includes(char));
  if (found) {
    return {hanzi: found.h, pinyin: found.p, meaning: found.m, hskLevel: found.h.length === 1 ? 1 : 2};
  }
  return {hanzi: char, pinyin: '?', meaning: 'unknown', hskLevel: 0};
}

function showTokenModal(char, event) {
  event.stopPropagation();
  curTokenChar = char;
  const info = lookupChar(char);
  const hskClass = info.hskLevel === 1 ? 'hsk1' : info.hskLevel === 2 ? 'hsk2' : 'hsk3';
  const hskText = info.hskLevel > 0 ? `HSK${info.hskLevel}` : 'advanced';
  const modalHtml = `<div class="token-modal" onclick="closeTokenModal()"><div class="token-card" onclick="event.stopPropagation();">
    <div class="token-hanzi">${info.hanzi}</div>
    <div class="token-pinyin">${info.pinyin}</div>
    <div class="token-meaning">${info.meaning}</div>
    <div class="token-hsk ${hskClass}">${hskText}</div>
    <div class="token-btn-group">
      <button class="token-btn token-btn-listen" onclick="speak('${info.hanzi}'); closeTokenModal();">🔊 Listen</button>
      <button class="token-btn token-btn-close" onclick="closeTokenModal();">Close</button>
    </div>
  </div></div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeTokenModal() {
  const modal = document.querySelector('.token-modal');
  if (modal) modal.remove();
  curTokenChar = null;
}

function colorizeStoryText(cn) {
  const chars = [...cn];
  return chars.map((c, i) => {
    if (/[\s，。！？、；：""''（）《》]/.test(c)) {
      return `<span style="font-family:var(--cn);font-size:28px;font-weight:900;color:var(--text);padding:2px">${c}</span>`;
    }
    const col = STORY_WORD_COLORS[i % STORY_WORD_COLORS.length];
    const safe = c.replace(/'/g,"\\'");
    return `<div class="story-word" onclick="showTokenModal('${safe}', event)" title="Tap to see details" style="border-bottom:3px solid ${col}">
      <span class="sw-cn" style="color:${col};font-size:28px">${c}</span>
    </div>`;
  }).join('');
}

function openStory(id) {
  curStory = KIDS_STORIES.find(s => s.id === id);
  if (!curStory) return;
  curSlide = 0;
  document.getElementById('story-viewer-title').textContent = curStory.title;
  renderStorySlide();
  go('storyviewer');
}

function renderStorySlide() {
  const el = document.getElementById('story-viewer-content');
  if (!el || !curStory) return;
  const slide = curStory.slides[curSlide];
  if (!slide) return;
  const total = curStory.slides.length;
  const cn = slide.cn || '';
  const safeCn = cn.replace(/'/g,"\\'").replace(/"/g,'&quot;');
  // Progress bar for slides
  const progPct = Math.round(((curSlide+1)/total)*100);
  const colored = colorizeStoryText(cn);
  el.innerHTML = `
    <div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;color:var(--muted);margin-bottom:6px">
        <span>Slide ${curSlide+1} of ${total}</span><span>${progPct}% complete</span>
      </div>
      <div class="xp-bar xp-bar-sm"><div class="xp-fill" style="width:${progPct}%"></div></div>
    </div>
    <div class="story-ill" style="margin-bottom:16px">${curStory.ill || ''}</div>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:2px;min-height:70px;margin:16px 0;padding:12px;background:rgba(255,255,255,.7);border-radius:16px;border:2px solid var(--card-border)">
      ${colored}
    </div>
    <div style="background:var(--blue-bg);border:2px solid var(--blue);border-radius:12px;padding:10px 16px;text-align:center;margin-bottom:8px">
      <div style="font-size:14px;color:var(--blue-d);font-weight:800">${slide.py || ''}</div>
    </div>
    <div style="font-size:14px;color:var(--text2);text-align:center;font-style:italic;margin-bottom:20px">"${slide.en || ''}"</div>
    <div class="flex gap-8 justify-center mb-20">
      <button id="sBtn-listen" class="btn btn-blue">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
        Listen
      </button>
      <button id="sBtn-save" class="save-btn">Save</button>
    </div>
    <div class="flex items-center justify-between">
      <button class="btn btn-ghost" ${curSlide === 0 ? 'disabled style="opacity:.4"' : ''} onclick="storyPrev()">← Prev</button>
      <button class="btn btn-green" onclick="storyNext()" style="box-shadow:0 4px 0 var(--green-d)">${curSlide === total-1 ? 'Finish Story ✓' : 'Next →'}</button>
    </div>`;
  document.getElementById('sBtn-listen')?.addEventListener('click', () => speak(cn));
  document.getElementById('sBtn-save')?.addEventListener('click', () => saveItem(cn, slide.py||'', slide.en||'', 'sentence'));
  speak(cn);
}

function storyPrev() { if (curSlide > 0) { curSlide--; renderStorySlide(); } }
function storyNext() {
  if (!curStory) return;
  if (curSlide < curStory.slides.length - 1) { curSlide++; renderStorySlide(); }
  else { addXP(20); toast('Story complete! +20 XP', 'success'); go('stories'); }
}

function saveUsername() {
  const v = document.getElementById('username-input')?.value.trim();
  if (!v) return;
  db.name = v;
  saveDB();
  updXP();
  toast('Name saved!', 'success');
}

function resetProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  db = { name: db.name, xp: 0, streak: 0, lastDate: '', saved: [], done: {}, pin: db.pin, avatar: db.avatar || 0,
    unlockedCourses: ['hsk1','hsk2','hsk3','hsk4','business','travel','kids','all'], completedLessons: {} };
  saveDB(); // saves locally + cloud
  updXP();
  toast('Progress reset', 'info');
}

// ─── HSK EXAM ────────────────────────────────────
let examLevel = '', examQs = [], examIdx = 0, examScore = 0;

// ── REALISTIC HSK EXAM ───────────────────────────────────────
let examTimer = null, examSeconds = 0, examTimeLimit = 0;

function startExamTimer(seconds) {
  examSeconds = seconds;
  examTimeLimit = seconds;
  clearInterval(examTimer);
  examTimer = setInterval(() => {
    examSeconds--;
    const m = String(Math.floor(examSeconds/60)).padStart(2,'0');
    const s = String(examSeconds%60).padStart(2,'0');
    const timerEl = document.getElementById('hsk-exam-timer-display');
    if (timerEl) {
      timerEl.textContent = m + ':' + s;
      const pct = examSeconds / examTimeLimit;
      timerEl.style.color = pct < 0.2 ? 'var(--red)' : pct < 0.4 ? 'var(--yellow-d)' : '#fff';
    }
    if (examSeconds <= 0) {
      clearInterval(examTimer);
      toast('Time is up! Submitting exam...', 'error');
      setTimeout(() => submitHSKExam(), 1000);
    }
  }, 1000);
}

function submitHSKExam() {
  clearInterval(examTimer);
  // Calculate score from filled answers
  const cells = document.querySelectorAll('.hsk-q-opt.selected');
  let correct = 0, total = 0;
  document.querySelectorAll('[data-correct]').forEach(q => {
    total++;
    const sel = q.querySelector('.hsk-q-opt.selected');
    if (sel && sel.dataset.val === q.dataset.correct) correct++;
  });
  const pct = total > 0 ? Math.round(correct/total*100) : 0;
  const xp = correct * 20;
  addXP(xp);
  const examBody = document.getElementById('hsk-exam-body');
  if (!examBody) return;
  const passed = pct >= 60;
  examBody.innerHTML = `
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:80px;margin-bottom:16px">${passed?'🏆':'📚'}</div>
      <div style="font-size:64px;font-weight:900;color:${passed?'var(--green)':'var(--orange)'}">${pct}%</div>
      <div style="font-size:20px;font-weight:900;margin:8px 0;color:var(--text)">${passed?'PASSED!':'Keep Studying'}</div>
      <div style="font-size:14px;color:var(--text2);margin-bottom:24px">${correct}/${total} correct · +${xp} XP</div>
      <div class="card" style="padding:16px;margin-bottom:24px;text-align:left">
        <div style="font-weight:800;margin-bottom:8px">Performance Breakdown</div>
        <div class="xp-bar mb-8"><div class="xp-fill" style="width:${pct}%;background:${passed?'var(--green)':'var(--orange)'}"></div></div>
        <div style="font-size:13px;color:var(--text2)">${pct>=90?'Excellent! HSK certified standard achieved.':pct>=75?'Very Good! Close to HSK standard.':pct>=60?'Passed! Meet the minimum HSK requirement.':'Below standard. Review vocabulary and grammar.'}</div>
      </div>
      <div class="flex gap-10 justify-center">
        <button class="btn btn-green" onclick="renderExam('${window._hskLevel||'hsk1'}')">Retry Exam</button>
        <button class="btn btn-ghost" onclick="go('home')">Home</button>
      </div>
    </div>`;
}

function renderExam(level) {
  examLevel = level;
  const el = document.getElementById('pg-' + level + 'exam');
  if (!el) return;
  const qs = window.EXAMS && window.EXAMS[level];
  if (!qs) { el.innerHTML = '<div class="card text-center" style="padding:48px"><div style="font-size:48px">📝</div><div style="font-size:18px;font-weight:700;margin-top:16px">Exam coming soon!</div></div>'; return; }
  const levelNames = { hsk1: 'HSK 1', hsk2: 'HSK 2', hsk3: 'HSK 3', hsk4: 'HSK 4' };
  el.innerHTML = `<div class="text-center" style="padding:40px 0">
    <div style="font-size:64px;margin-bottom:16px">🎓</div>
    <h1>${levelNames[level] || level.toUpperCase()} Exam</h1>
    <p class="text-muted" style="margin:12px 0 16px">${qs.length} authentic HSK-style questions with vocabulary, grammar and sentence practice.</p>
    <p class="text-muted" style="margin:0 0 24px">Pass score: 70%. Treat this as a real HSK mock test.</p>
    <button class="btn btn-green" style="font-size:16px;padding:14px 32px" onclick="startExam('${level}')">Start Exam</button>
  </div>`;
}

function startExam(level) {
  const qs = window.EXAMS && window.EXAMS[level];
  if (!qs) return;
  examLevel = level;
  examQs = [...qs].sort(() => Math.random() - 0.5);
  examIdx = 0;
  examScore = 0;
  renderExamQuestion();
}

function renderExamQuestion() {
  const el = document.getElementById('pg-' + examLevel + 'exam');
  if (!el) return;
  if (examIdx >= examQs.length) { showExamResult(el); return; }
  const q = examQs[examIdx];
  const pct = Math.round(examIdx / examQs.length * 100);
  el.innerHTML = `
    <div class="xp-bar mb-16"><div class="xp-fill" style="width:${pct}%"></div></div>
    <div class="text-center mb-8" style="font-size:12px;color:var(--muted);font-weight:700">${examIdx+1} / ${examQs.length}</div>
    <div class="card mb-24" style="padding:24px;text-align:center">
      <div style="font-size:18px;font-weight:700;line-height:1.5">${q.q}</div>
    </div>
    <div class="flex-col gap-10">
      ${q.opts.map((o, i) => `<button class="card card-hover exam-opt" style="padding:16px;text-align:left;cursor:pointer;font-size:15px;border:2px solid var(--card-border)" onclick="answerExam(${i},${q.a})">
        <span style="font-weight:800;color:var(--muted);margin-right:10px">${String.fromCharCode(65+i)}.</span>${o}
      </button>`).join('')}
    </div>`;
}

function answerExam(chosen, correct) {
  const el = document.getElementById('pg-' + examLevel + 'exam');
  if (!el) return;
  el.querySelectorAll('.exam-opt').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.borderColor = 'var(--green)', btn.style.background = 'rgba(88,204,2,.08)';
    else if (i === chosen && chosen !== correct) btn.style.borderColor = 'var(--red)', btn.style.background = 'rgba(255,75,75,.08)';
  });
  if (chosen === correct) examScore++;
  setTimeout(() => { examIdx++; renderExamQuestion(); }, 1000);
}

function showExamResult(el) {
  const pct = Math.round(examScore / examQs.length * 100);
  const pass = pct >= 70;
  const xp = examScore * 15;
  if (pass) addXP(xp);
  const levelNames = { hsk1: 'HSK 1', hsk2: 'HSK 2', hsk3: 'HSK 3', hsk4: 'HSK 4' };
  el.innerHTML = `<div class="text-center" style="padding:40px 0">
    <div style="font-size:72px;font-weight:900;color:${pass?'var(--green)':'var(--orange)'}">${pct}%</div>
    <div style="font-size:28px;margin:12px 0">${pass ? '🎉 Passed!' : '😊 Keep Studying!'}</div>
    <div style="font-size:16px;color:var(--text2);margin-bottom:8px">${examScore}/${examQs.length} correct</div>
    ${pass ? `<div style="font-size:14px;color:var(--muted);margin-bottom:24px">+${xp} XP earned</div>` : '<div style="font-size:14px;color:var(--muted);margin-bottom:24px">Need 70% to pass</div>'}
    <div class="flex gap-10 justify-center">
      <button class="btn btn-green" onclick="startExam('${examLevel}')">Retry</button>
      <button class="btn btn-ghost" onclick="go('home')">Home</button>
    </div>
  </div>`;
}

// ─── REAL GRAMMAR TEST ─────────────────────────────────────
let gtQ=[], gtI=0, gtScore=0;

function buildGrammarTestQuestions() {
  const pool = GRAMMAR.filter(g => g.examples && g.examples.length > 0);
  const shuffled = shuffle([...pool]).slice(0, 10);
  return shuffled.map(g => {
    const ex = g.examples[Math.floor(Math.random() * g.examples.length)];
    const cn = ex.cn || '';
    // Build: "What grammar pattern does this use?"
    const otherPatterns = shuffle(pool.filter(p=>p.id!==g.id)).slice(0,3).map(p=>p.title);
    const opts = shuffle([g.title, ...otherPatterns]);
    return { g, ex, cn, opts, correct: g.title };
  });
}

function renderGrammarTest() {
  const el = document.getElementById('pg-grammartest');
  if (!el) return;
  gtQ = buildGrammarTestQuestions();
  gtI = 0; gtScore = 0;
  renderGTQuestion();
}

function renderGTQuestion() {
  const el = document.getElementById('pg-grammartest');
  if (!el) return;
  if (gtI >= gtQ.length) { showGTResult(el); return; }
  const item = gtQ[gtI];
  const pct = Math.round(gtI / gtQ.length * 100);
  const safeCn = item.cn.replace(/'/g,"\\'");
  el.innerHTML = `
    <div class="back-row" onclick="go('grammar')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg><span>Back to Grammar</span></div>
    <div class="flex items-center justify-between mb-16">
      <h2>Grammar Test</h2>
      <span style="font-size:13px;font-weight:800;color:var(--muted)">${gtI+1} / ${gtQ.length}</span>
    </div>
    <div class="xp-bar mb-20"><div class="xp-fill" style="width:${pct}%"></div></div>
    <div class="card mb-16" style="padding:24px;text-align:center">
      <div style="font-size:12px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">What grammar pattern is this?</div>
      <div style="font-family:var(--cn);font-size:32px;font-weight:900;cursor:pointer;margin-bottom:10px;color:var(--text)" onclick="speak('${safeCn}')">${item.cn}</div>
      <div style="font-size:14px;color:var(--blue);font-weight:700;margin-bottom:4px">${item.ex.py || ''}</div>
      <div style="font-size:13px;color:var(--text2)">${item.ex.en || ''}</div>
      <button class="btn btn-blue btn-sm mt-10" onclick="speak('${safeCn}')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg> Listen
      </button>
    </div>
    <div class="flex-col gap-8">
      ${item.opts.map((opt, oi) => `
        <button class="gt-opt card card-tap" style="padding:14px 16px;text-align:left;border-width:2px;font-weight:700;font-size:14px;width:100%;cursor:pointer"
          onclick="ansGT(this,'${opt.replace(/'/g,"\\'")}','${item.correct.replace(/'/g,"\\'")}')">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:var(--bg);border:2px solid var(--card-border);font-size:12px;font-weight:900;margin-right:10px;flex-shrink:0">${'ABCD'[oi]}</span>
          ${opt}
        </button>`).join('')}
    </div>
    <div id="gt-feedback" class="mt-16"></div>`;
  speak(item.cn);
}

function ansGT(btn, chosen, correct) {
  document.querySelectorAll('.gt-opt').forEach(b => b.style.pointerEvents = 'none');
  const isCorrect = chosen === correct;
  btn.style.borderColor = isCorrect ? 'var(--green)' : 'var(--red)';
  btn.style.background = isCorrect ? 'rgba(88,204,2,.08)' : 'rgba(255,75,75,.08)';
  if (isCorrect) { gtScore++; toast('Correct!', 'success'); }
  else {
    toast('Wrong!', 'error');
    // Mark correct answer
    document.querySelectorAll('.gt-opt').forEach(b => {
      if (b.textContent.trim().slice(1).trim() === correct) {
        b.style.borderColor = 'var(--green)';
        b.style.background = 'rgba(88,204,2,.08)';
      }
    });
  }
  // Show grammar explanation
  const item = gtQ[gtI];
  const fb = document.getElementById('gt-feedback');
  if (fb) {
    fb.innerHTML = `<div class="card" style="border-color:${isCorrect?'var(--green)':'var(--blue)'};background:${isCorrect?'rgba(88,204,2,.04)':'rgba(28,176,246,.04)'}">
      <div style="font-size:12px;font-weight:900;color:${isCorrect?'var(--green-d)':'var(--blue-d)'};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">${isCorrect?'✓ Correct!':'Pattern: '+correct}</div>
      <div style="font-size:14px;font-weight:900;margin-bottom:6px">${item.g.rule}</div>
      <div style="font-size:13px;color:var(--text2)">${item.g.tip || ''}</div>
    </div>`;
  }
  setTimeout(() => { gtI++; renderGTQuestion(); }, 2200);
}

function showGTResult(el) {
  const pct = Math.round(gtScore / gtQ.length * 100);
  const xp = gtScore * 15;
  addXP(xp);
  el.innerHTML = `
    <div class="back-row" onclick="go('grammar')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg><span>Back to Grammar</span></div>
    <div class="quiz-card" style="padding:40px;text-align:center">
      <div style="font-size:64px;font-weight:900;color:${pct>=80?'var(--green)':pct>=60?'var(--yellow-d)':'var(--orange)'}">${pct}%</div>
      <div style="font-size:22px;font-weight:900;margin:12px 0">${pct>=80?'Grammar Master! 🏆':pct>=60?'Good Work! 📚':'Keep Practicing! 💪'}</div>
      <div style="font-size:15px;color:var(--text2);margin-bottom:8px">${gtScore}/${gtQ.length} correct · +${xp} XP</div>
      <div style="font-size:13px;color:var(--muted);margin-bottom:28px">${pct>=80?'You have a strong grasp of Chinese grammar patterns!':pct>=60?'Review the patterns you missed and try again.':'Spend more time in the Grammar section before testing.'}</div>
      <div class="flex gap-10 justify-center">
        <button class="btn btn-green" onclick="renderGrammarTest()">Retry Test</button>
        <button class="btn btn-ghost" onclick="go('grammar')">Study Grammar</button>
      </div>
    </div>`;
}

// ─── LOGIN ────────────────────────────────────────
function checkLogin() {
  const ls = document.getElementById('login-screen');
  const isNarrow = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (isNarrow) {
    // Force phone layout visually, but never overwrite a desktop preference in localStorage
    window._deviceMode = 'phone';
    applyDeviceMode('phone');
    if (ls) ls.style.display = 'none';
    return;
  }
  // Desktop: respect whatever the user previously chose
  const hasChosen = localStorage.getItem('hx_device_mode');
  if (!hasChosen) {
    showDeviceChoice();
  } else {
    window._deviceMode = hasChosen;
    applyDeviceMode(hasChosen);
    if (ls) ls.style.display = 'none';
  }
}

function showDeviceChoice() {
  const el = document.getElementById('device-choice-screen');
  if (el) el.style.display = 'flex';
}

function chooseDevice(mode) {
  localStorage.setItem('hx_device_mode', mode);
  window._deviceMode = mode;
  applyDeviceMode(mode);
  const el = document.getElementById('device-choice-screen');
  if (el) el.style.display = 'none';
}

function applyDeviceMode(mode) {
  if (mode === 'phone') {
    document.documentElement.style.setProperty('--sidebar-w', '0px');
    document.querySelectorAll('.sidebar').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.mobile-nav').forEach(n => n.style.display = 'block');
    document.querySelectorAll('.main').forEach(m => m.style.marginLeft = '0');
    document.body.classList.add('phone-mode');
  } else {
    document.documentElement.style.setProperty('--sidebar-w', '228px');
    document.querySelectorAll('.sidebar').forEach(s => s.style.display = '');
    document.querySelectorAll('.main').forEach(m => m.style.marginLeft = '228px');
    document.body.classList.remove('phone-mode');
  }
}

// Re-apply phone layout on resize/rotation — never writes to localStorage
window.addEventListener('resize', function() {
  const isNarrow = window.innerWidth <= 768;
  if (isNarrow && window._deviceMode !== 'phone') {
    window._deviceMode = 'phone';
    applyDeviceMode('phone');
  }
});

function switchLoginTab(tab) {
  document.getElementById('login-signin-form').style.display = tab === 'signin' ? '' : 'none';
  document.getElementById('login-register-form').style.display = tab === 'register' ? '' : 'none';
  document.getElementById('lt-signin').classList.toggle('active', tab === 'signin');
  document.getElementById('lt-register').classList.toggle('active', tab === 'register');
}

async function doLogin() {
  const nameEl = document.getElementById('signin-name');
  const pinEl = document.getElementById('signin-pin');
  const errEl = document.getElementById('login-error-signin');
  const btnEl = document.querySelector('#login-signin-form .login-btn');
  const name = nameEl?.value.trim();
  const pin = pinEl?.value.trim();

  if (!name || !pin) {
    if (errEl) { errEl.textContent = 'Please enter your name and PIN.'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';
  if (btnEl) { btnEl.textContent = 'Signing in…'; btnEl.disabled = true; }

  // Check cloud storage for this user
  const cloudData = await cloudLoadUser(name);

  if (btnEl) { btnEl.textContent = 'Enter Platform'; btnEl.disabled = false; }

  if (cloudData) {
    // User exists — verify PIN
    if (cloudData.pin !== pin) {
      if (errEl) { errEl.textContent = 'Incorrect PIN. Try again.'; errEl.style.display = 'block'; }
      return;
    }
    // PIN correct — load their data
    Object.assign(db, cloudData);
    try { localStorage.setItem('hx_db', JSON.stringify(db)); } catch(e) {}
    document.getElementById('login-screen').style.display = 'none';
    updXP();
    toast('Welcome back, ' + db.name + '! 🎉', 'success');
  } else {
    // No cloud data — treat as first login on this device (or new user)
    // Check local storage as fallback
    const localData = localStorage.getItem('hx_db');
    if (localData) {
      try {
        const ld = JSON.parse(localData);
        if (ld.name && ld.name.toLowerCase().trim() === name.toLowerCase().trim()) {
          if (ld.pin && ld.pin !== pin) {
            if (errEl) { errEl.textContent = 'Incorrect PIN. Try again.'; errEl.style.display = 'block'; }
            return;
          }
          Object.assign(db, ld);
          // Migrate to cloud
          if (!db.pin) db.pin = pin;
          await cloudSaveUser();
          document.getElementById('login-screen').style.display = 'none';
          updXP();
          toast('Welcome back, ' + db.name + '! (Progress synced to cloud)', 'success');
          return;
        }
      } catch(e) {}
    }
    // New user — auto-create profile
    db.name = name;
    db.pin = pin;
    db.xp = 0;
    db.streak = 0;
    db.lastDate = '';
    db.saved = [];
    db.done = {};
    await cloudSaveUser();
    document.getElementById('login-screen').style.display = 'none';
    updXP();
    toast('New profile created! Welcome, ' + name + '! 🌟', 'success');
  }
}

async function doRegister() {
  const name = document.getElementById('register-name')?.value.trim();
  const pin = document.getElementById('register-pin')?.value.trim();
  const pin2 = document.getElementById('register-pin2')?.value.trim();
  const errEl = document.getElementById('login-error-register');
  const btnEl = document.querySelector('#login-register-form .login-btn');

  if (!name || !pin || pin !== pin2 || pin.length < 4) {
    if (errEl) { errEl.textContent = 'Please fill all fields. PINs must match (4+ digits).'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';
  if (btnEl) { btnEl.textContent = 'Creating…'; btnEl.disabled = true; }

  // Check if username is already taken in cloud
  const existing = await cloudLoadUser(name);
  if (existing) {
    if (errEl) { errEl.textContent = 'That name is already taken. Choose a different name.'; errEl.style.display = 'block'; }
    if (btnEl) { btnEl.textContent = 'Create My Profile'; btnEl.disabled = false; }
    return;
  }

  // Create new profile
  db.name = name;
  db.pin = pin;
  db.xp = 0;
  db.streak = 0;
  db.lastDate = '';
  db.saved = [];
  db.done = {};
  db.avatar = 0;

  await cloudSaveUser();
  if (btnEl) { btnEl.textContent = 'Create My Profile'; btnEl.disabled = false; }
  document.getElementById('login-screen').style.display = 'none';
  updXP();
  toast('Profile created! Welcome, ' + name + '! 🌟', 'success');
}

async function cloudSync() {
  if (!db.name) { toast('Log in first', 'error'); return; }
  await cloudSaveUser();
  toast('Progress synced to cloud! ☁️', 'success');
}

async function cloudRestore() {
  const pin = document.getElementById('cloud-pin')?.value.trim() || db.pin;
  if (!db.name) { toast('Log in first', 'error'); return; }
  const cloudData = await cloudLoadUser(db.name);
  if (!cloudData) { toast('No cloud data found for ' + db.name, 'error'); return; }
  if (cloudData.pin !== pin) { toast('PIN mismatch — cannot restore', 'error'); return; }
  Object.assign(db, cloudData);
  saveDB();
  updXP();
  toast('Progress restored from cloud! ☁️', 'success');
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('hx_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  const moon = document.getElementById('theme-icon-moon');
  const sun = document.getElementById('theme-icon-sun');
  if (moon) moon.style.display = document.body.classList.contains('dark') ? 'none' : '';
  if (sun) sun.style.display = document.body.classList.contains('dark') ? '' : 'none';
}

// sendChat wired to games.js initChat / chat functions
function sendChat() {
  const field = document.getElementById('chat-field');
  if (!field) return;
  const msg = field.value.trim();
  if (!msg) return;
  field.value = '';
  chatChip(msg);
}

// ─── OPEN SPEAK MODAL (for games.js compatibility) ────
function openSpeakModal(text, py, en) {
  // Minimal: just speak the text and show a toast
  speak(text);
  toast('Listen: ' + text, 'info');
}

// ─── INIT ─────────────────────────────────────────
loadDB();

// Apply saved theme
if (localStorage.getItem('hx_theme') === 'dark') {
  document.body.classList.add('dark');
  const moon = document.getElementById('theme-icon-moon');
  const sun = document.getElementById('theme-icon-sun');
  if (moon) moon.style.display = 'none';
  if (sun) sun.style.display = '';
}

// ─── AUTO-LOGIN or SHOW LOGIN SCREEN ──────────────
document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('login-screen');
  if (db.name && db.pin) {
    // User was logged in — restore session, show app directly
    if (loginScreen) loginScreen.style.display = 'none';
    updXP();
    // Silently re-sync from cloud in background to get latest data
    cloudLoadUser(db.name).then(cloudData => {
      if (cloudData && cloudData.pin === db.pin) {
        Object.assign(db, cloudData);
        try { localStorage.setItem('hx_db', JSON.stringify(db)); } catch(e) {}
        updXP();
      }
    }).catch(() => {});
  } else {
    // No saved session — show login
    if (loginScreen) loginScreen.style.display = '';
  }

  // Learn page lazy init
  setTimeout(() => {
    if (document.getElementById('learn-content') && !document.getElementById('learn-content').innerHTML.trim()) {
      renderLearn();
    }
  }, 300);
});


// GAMES + CHAT + PROFILE EXTRAS
// === SHUFFLE ===
function shuffle(a){let i=a.length,j;while(i){j=Math.floor(Math.random()*i--);[a[i],a[j]]=[a[j],a[i]]}return a}
// === QUIZ ===
let qW=[],qI=0,qS=0,qA=false;
function startQuickQuiz(){showSub('quiz')}
function startQuiz(){qW=shuffle([...ALL_WORDS]).slice(0,10);qI=0;qS=0;qA=false;renderQ()}
function startUnitQuiz(ui) {
  const u = UNITS[ui];
  let unitWords = [];
  u.lessons.forEach(l => unitWords.push(...l.words));
  const pool = ALL_WORDS.filter(w => unitWords.includes(w.h));
  if(pool.length === 0) { toast('No words in this unit to test!', 'error'); return; }
  qW = shuffle(pool).slice(0, 10);
  qI = 0; qS = 0; qA = false;
  showSub('quiz');
  renderQ();
}
function renderQ(){
if(qI>=qW.length){showQResult();return}
const w=qW[qI];
document.getElementById('q-prog').style.width=(qI/qW.length*100)+'%';
const others=shuffle(ALL_WORDS.filter(x=>x.h!==w.h)).slice(0,3).map(x=>x.m);
const opts=shuffle([w.m,...others]);
document.getElementById('quiz-body').innerHTML=`
<div class="quiz-card"><div style="font-size:12px;color:var(--muted);margin-bottom:8px">Question ${qI+1} of ${qW.length}</div>
<div class="quiz-hanzi">${w.h}</div><div class="quiz-py">${w.p}</div>
<div class="quiz-opts">${opts.map(o=>`<button class="q-opt" onclick="ansQ(this,'${o.replace(/'/g,"\\'")}','${w.m.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div></div>`;
speak(w.h);qA=false;
}
function ansQ(btn,c,cor){
if(qA)return;qA=true;
document.querySelectorAll('.q-opt').forEach(b=>{
b.disabled=true;
if(b.textContent===cor)b.classList.add('correct');
else if(b.textContent===c&&c!==cor)b.classList.add('wrong');
});
if(c===cor){qS++;toast('Correct!','success')}else toast('Wrong!','error');
setTimeout(()=>{qI++;renderQ()},1200);
}
function showQResult(){
const pct=Math.round(qS/qW.length*100);
const xp=qS*10;addXP(xp);
document.getElementById('q-prog').style.width='100%';
const qGrade = pct>=90?{e:'🏆',l:'Outstanding!',c:'var(--green)'}:pct>=70?{e:'⭐',l:'Great job!',c:'var(--blue)'}:pct>=50?{e:'👍',l:'Good effort!',c:'var(--yellow-d)'}:{e:'💪',l:'Keep practicing!',c:'var(--orange)'};
document.getElementById('quiz-body').innerHTML=`<div class="quiz-card" style="padding:32px;text-align:center">
<div style="font-size:52px;margin-bottom:6px">${qGrade.e}</div>
<div style="font-size:52px;font-weight:900;color:${qGrade.c};line-height:1">${pct}%</div>
<div style="font-size:18px;font-weight:900;margin:8px 0">${qGrade.l}</div>
<div class="score-bar" style="max-width:220px;margin:10px auto"><div class="score-fill" style="width:${pct}%;background:${qGrade.c}"></div></div>
<div style="font-size:14px;color:var(--text2);margin:10px 0">${qS}/${qW.length} correct · <strong>+${xp} XP</strong></div>
<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:10px 0">
  <span class="feedback-chip ${pct>=80?'chip-perfect':pct>=50?'chip-good':'chip-needs-work'}">Score: ${pct}%</span>
  <span class="feedback-chip chip-perfect">+${xp} XP</span>
</div>
<div class="flex gap-10" style="justify-content:center;margin-top:20px"><button class="btn btn-green" onclick="startQuiz()">Play Again</button><button class="btn btn-ghost" onclick="go('home')">Home</button></div></div>`;
}
// === MATCHING ===
let mSel=null,mS=0,mT=0,mTimer,mSec=0;
function startMatch(){
clearInterval(mTimer);mSec=0;mSel=null;mS=0;
const pool=shuffle([...ALL_WORDS]).slice(0,6);mT=pool.length;
const left=pool.map(w=>({id:w.h,text:w.h,type:'h'}));
const right=shuffle(pool.map(w=>({id:w.h,text:w.m,type:'m'})));
const all=shuffle([...left,...right]);
document.getElementById('match-body').innerHTML=`<div class="flex items-center justify-between mb-16"><div class="text-muted">Matched: <span id="m-s">0</span>/${mT}</div></div><div class="match-grid">${all.map(t=>`<div class="m-tile" data-id="${t.id}" data-type="${t.type}" onclick="mClick(this)">${t.type==='h'?`<span style="font-family:var(--cn);font-size:24px">${t.text}</span>`:t.text}</div>`).join('')}</div>`;
mTimer=setInterval(()=>{mSec++;const m=String(Math.floor(mSec/60)).padStart(2,'0'),s=String(mSec%60).padStart(2,'0');document.getElementById('m-timer').textContent=m+':'+s},1000);
}
function mClick(el){
if(el.classList.contains('hit'))return;
if(mSel===el){el.classList.remove('sel');mSel=null;return}
if(!mSel){mSel=el;el.classList.add('sel')}else{
const a=mSel,b=el;
if(a.dataset.id===b.dataset.id&&a.dataset.type!==b.dataset.type){
a.classList.remove('sel');a.classList.add('hit');b.classList.add('hit');
mS++;const ms=document.getElementById('m-s');if(ms)ms.textContent=mS;
speak(a.dataset.id);
if(mS===mT){clearInterval(mTimer);const xp=Math.max(20,60-mSec);addXP(xp);toast('All matched! +'+xp+' XP','success')}
}else{
a.classList.remove('sel');a.classList.add('miss');b.classList.add('miss');
setTimeout(()=>{a.classList.remove('miss');b.classList.remove('miss')},500);
}
mSel=null;
}
}
// === TONE GAME ===
let tQ=[],tI=0,tS=0;
function startTones(){tQ=shuffle([...ALL_WORDS]).slice(0,10);tI=0;tS=0;renderTone()}
function renderTone(){
if(tI>=tQ.length){showToneResult();return}
const w=tQ[tI];
document.getElementById('t-score').textContent=tS+' / '+tQ.length;
document.getElementById('t-prog').style.width=(tI/tQ.length*100)+'%';
const opts=[{n:1,l:'1st Tone — Flat (ā)'},{n:2,l:'2nd Tone — Rising (á)'},{n:3,l:'3rd Tone — Dip (ǎ)'},{n:4,l:'4th Tone — Falling (à)'},{n:0,l:'Neutral Tone (a)'}];
document.getElementById('tone-body').innerHTML=`<div class="quiz-card">
<div style="font-size:12px;color:var(--muted);margin-bottom:8px">${tI+1} of ${tQ.length}</div>
<div class="quiz-hanzi">${w.h}</div>
<div style="font-size:16px;color:var(--muted);margin-bottom:8px">${w.m}</div>
<div class="quiz-opts">${opts.map(o=>`<button class="q-opt" data-n="${o.n}" onclick="ansTone(${o.n},this)">${o.l}</button>`).join('')}</div></div>`;
speak(w.h);
}
function ansTone(c,btn){
const cor=tQ[tI].t;
document.querySelectorAll('.q-opt').forEach(b=>{b.disabled=true;if(+b.dataset.n===cor)b.classList.add('correct')});
if(c===cor){tS++;btn.classList.add('correct');toast('Correct!','success')}
else{btn.classList.add('wrong');toast('It was tone '+(cor||'neutral'),'error')}
setTimeout(()=>{tI++;renderTone()},1200);
}
function showToneResult(){
const pct=Math.round(tS/tQ.length*100),xp=tS*10;addXP(xp);
document.getElementById('t-prog').style.width='100%';
document.getElementById('t-score').textContent=tS+'/'+tQ.length;
document.getElementById('tone-body').innerHTML=`<div class="quiz-card"><div style="font-size:64px;font-weight:900;color:var(--gold)">${pct}%</div><div style="font-size:18px;color:var(--text2);margin:12px 0">${tS}/10 · +${xp} XP</div><div class="flex gap-10" style="justify-content:center"><button class="btn btn-green" onclick="startTones()">Again</button><button class="btn btn-ghost" onclick="go('home')">Home</button></div></div>`;
}
// === SENTENCE BUILDER ===
let bQ=[],bI=0,bS=0,bUser=[],bPool=[];
function startBuilder(){
let all=[];UNITS.forEach(u=>u.lessons.forEach(l=>{if(l.sentences)l.sentences.forEach(s=>all.push(s))}));
bQ=shuffle(all).slice(0,8);bI=0;bS=0;renderBuilder();
}
function renderBuilder(){
if(bI>=bQ.length){showBuilderResult();return}
const s=bQ[bI];
const correct=s.words.map(w=>w.h);
const decoys=[];while(decoys.length<2){const r=ALL_WORDS[Math.floor(Math.random()*ALL_WORDS.length)].h;if(!correct.includes(r)&&!decoys.includes(r))decoys.push(r)}
bPool=shuffle([...correct,...decoys]);bUser=[];
document.getElementById('builder-body').innerHTML=`<div class="card mb-16"><div style="font-size:12px;color:var(--muted);margin-bottom:8px">${bI+1} of ${bQ.length}</div><div style="font-size:16px;font-weight:700">${s.en}</div></div>
<div class="section-label">Your Sentence</div>
<div id="b-zone" class="card mb-16" style="min-height:60px;display:flex;flex-wrap:wrap;gap:8px;align-items:center"><span class="text-muted" style="font-size:13px">Tap words below</span></div>
<div class="section-label">Word Bank</div>
<div id="b-pool" class="flex flex-wrap gap-8 mb-16">${bPool.map((w,i)=>`<button class="btn btn-ghost" id="bt${i}" onclick="bTap(this,'${w.replace(/'/g,"\\'")}','bt${i}')" style="font-family:var(--cn);font-size:18px">${w}</button>`).join('')}</div>
<div class="flex gap-10"><button class="btn btn-green flex-1" onclick="bCheck()">Check</button><button class="btn btn-ghost" onclick="bClear()">Clear</button></div>
<div id="b-fb" class="mt-16"></div>`;
}
function bTap(btn,w,id){if(btn.disabled)return;btn.disabled=true;btn.style.opacity='.3';bUser.push({w,id});
const z=document.getElementById('b-zone');z.innerHTML=bUser.map((u,i)=>`<button class="btn btn-blue btn-sm" onclick="bRemove(${i})" style="font-family:var(--cn)">${u.w}</button>`).join('');
}
function bRemove(i){const u=bUser[i];const b=document.getElementById(u.id);if(b){b.disabled=false;b.style.opacity='1'}bUser.splice(i,1);
const z=document.getElementById('b-zone');if(!bUser.length)z.innerHTML='<span class="text-muted" style="font-size:13px">Tap words below</span>';
else z.innerHTML=bUser.map((u,i)=>`<button class="btn btn-blue btn-sm" onclick="bRemove(${i})" style="font-family:var(--cn)">${u.w}</button>`).join('');
}
function bClear(){bUser.forEach(u=>{const b=document.getElementById(u.id);if(b){b.disabled=false;b.style.opacity='1'}});bUser=[];document.getElementById('b-zone').innerHTML='<span class="text-muted" style="font-size:13px">Tap words below</span>'}
function bCheck(){
if(!bUser.length)return;const s=bQ[bI];
const ans=bUser.map(u=>u.w).join(''),cor=s.words.map(w=>w.h).join('');
const fb=document.getElementById('b-fb');
if(ans===cor){bS++;fb.innerHTML=`<div class="card" style="border-color:var(--green);background:rgba(88,204,2,.05)"><div style="color:var(--green);font-weight:700">Correct!</div><div style="font-family:var(--cn);font-size:18px;margin-top:4px">${s.cn}</div><div style="font-size:12px;color:var(--cyan);font-style:italic">${s.py}</div></div>`;speak(s.cn);toast('Correct!','success')}
else{fb.innerHTML=`<div class="card" style="border-color:var(--red);background:rgba(255,75,75,.05)"><div style="color:var(--red);font-weight:700">Not quite</div><div style="font-family:var(--cn);font-size:18px;margin-top:4px">${s.cn}</div><div style="font-size:12px;color:var(--cyan);font-style:italic">${s.py}</div></div>`;toast('Try again next time','error')}
setTimeout(()=>{bI++;renderBuilder()},2000);
}
function showBuilderResult(){
const pct=Math.round(bS/bQ.length*100),xp=bS*12;addXP(xp);
document.getElementById('builder-body').innerHTML=`<div class="quiz-card"><div style="font-size:64px;font-weight:900;color:var(--gold)">${pct}%</div><div style="font-size:18px;color:var(--text2);margin:12px 0">${bS}/${bQ.length} · +${xp} XP</div><div class="flex gap-10" style="justify-content:center"><button class="btn btn-green" onclick="startBuilder()">Again</button><button class="btn btn-ghost" onclick="go('home')">Home</button></div></div>`;
}
// === AI CHAT ===
let chatH=JSON.parse(localStorage.hx_chat||'[]');
function initChat(){
const el=document.getElementById('chat-msgs');
if(!chatH.length){
chatH=[{role:'assistant',content:'哈喽哈喽！🌟 Yasmen！我是你的中文老师小星！\n(Hā luō hā luō! Yasmen! Wǒ shì nǐ de zhōngwén lǎoshī Xiǎo Xīng!)\n\nHello hello! I am your Chinese teacher XiaoXing! 🎉\n\nOkay real talk — I\'m NOT your boring textbook teacher. I\'m more like that cool older friend who happens to be fluent in Mandarin AND knows all the fun stuff about China! 😎\n\nHere\'s what we can do together:\n🗣️ Chat in Chinese (I\'ll translate everything!)\n✨ Learn vocabulary & grammar with real examples\n🎭 Do fun roleplays — café, market, travel...\n🤔 Ask me ANYTHING about tones, characters, culture\n🔥 I\'ll roast you gently when you make mistakes 😄\n\n来吧！(Lái ba!) — Let\'s GO! What do you want to learn today?'}];
}
el.innerHTML='';chatH.forEach(m=>appendMsg(m.role,m.content));
// Add quick action chips
const chipBar=document.getElementById('chat-chips');
if(chipBar){
chipBar.innerHTML=`
<button class="chat-chip" onclick="chatChip('Teach me a fun Chinese slang word!')">🔥 Fun slang</button>
<button class="chat-chip" onclick="chatChip('Give me a Chinese tongue twister!')">👅 Tongue twister</button>
<button class="chat-chip" onclick="chatChip('Let\'s do a roleplay at a restaurant in China!')">🍜 Roleplay</button>
<button class="chat-chip" onclick="chatChip('Tell me a fun Chinese cultural fact!')">🐉 Fun facts</button>
<button class="chat-chip" onclick="chatChip('Quiz me on HSK1 vocabulary!')">📝 Vocab quiz</button>
`;
}
}
function chatChip(msg){
const inp=document.getElementById('chat-field');
if(inp){inp.value=msg;sendChat();}
}
function appendMsg(role,text){
  const el=document.getElementById('chat-msgs');
  const div=document.createElement('div');
  div.className=role==='assistant'?'msg msg-bot':'msg msg-user';
  if(role==='assistant'){
    const lines=text.split('\n');
    let html='';
    lines.forEach(l=>{
      if(l.trim()===''){html+='<br>';return;}
      if(/[\u4e00-\u9fff]/.test(l)){
        // Chinese text: clickable to speak + speaker icon button
        const safe=l.replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        html+=`<span class="m-cn chat-cn-speak" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:3px 8px;border-radius:10px;transition:background 0.15s" title="Click to hear pronunciation" data-speak="${safe}">${l}<button onclick="event.stopPropagation();speak(this.parentElement.dataset.speak)" style="background:rgba(28,176,246,0.15);border:none;cursor:pointer;padding:3px 6px;border-radius:8px;display:inline-flex;align-items:center;flex-shrink:0;vertical-align:middle" title="Listen"><svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='#1cb0f6' stroke-width='2.5'><polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'/><path d='M15.54 8.46a5 5 0 010 7.07'/></svg></button></span>`;
      } else if(/[āáǎàēéěèīíǐìōóǒòūúǔùǜ]/.test(l)){
        html+=`<span class="m-py">${l}</span>`;
      } else {
        html+=`<span class="m-en">${l}</span>`;
      }
    });
    div.innerHTML=html;
    // Make whole Chinese span clickable
    div.querySelectorAll('.chat-cn-speak').forEach(sp=>{
      sp.addEventListener('click',function(){speak(this.dataset.speak);});
    });
  } else {
    div.textContent=text;
  }
  el.appendChild(div);
  el.scrollTop=el.scrollHeight;
}
async function sendChat(){
const inp=document.getElementById('chat-field');const text=inp.value.trim();if(!text)return;inp.value='';
appendMsg('user',text);chatH.push({role:'user',content:text});
const typing=document.createElement('div');typing.className='msg msg-bot';typing.id='typing';
typing.innerHTML='<span style="animation:pulse 1s infinite;display:inline-flex;align-items:center;gap:6px">✨ <span>小星 is thinking...</span></span>';
document.getElementById('chat-msgs').appendChild(typing);
document.getElementById('chat-msgs').scrollTop=document.getElementById('chat-msgs').scrollHeight;
const sys=`You are 小星 (Xiǎo Xīng), a wildly fun, witty, and energetic Chinese teacher and language buddy for a Moroccan student named Yasmen who is learning Mandarin Chinese.

YOUR PERSONALITY:
- You are the OPPOSITE of a boring textbook. You are enthusiastic, funny, and use lots of emojis 🎉🔥✨
- You love to drop fun cultural facts about China (food, pop culture, internet slang, history)
- You tease gently and cheer loudly — like a best friend who happens to speak perfect Mandarin
- You celebrate every win, no matter how small: "OMG YASSS! You got it!" energy
- You use humor to make grammar memorable (mnemonics, comparisons to Arabic/Moroccan things)
- You occasionally make playful jokes about language learning struggles
- You are direct and real — not corporate or stiff

FORMAT RULES:
1. When teaching Chinese, ALWAYS give: Chinese characters → pinyin → English meaning
2. Keep it conversational — never write walls of dry text
3. Use bullet points with emojis for lists
4. Highlight tricky tones with drama: "Wait, WRONG TONE! 😱 mā (妈) means mom but mǎ (马) means HORSE!"
5. Keep HSK1-2 vocabulary unless they ask for more advanced stuff
6. Correct mistakes with humor: "Haha close! But you just said 'I want to buy a horse' instead of 'I want to buy rice' 😂"
7. Add fun facts when relevant: "Fun fact: Chinese internet slang for LOL is 哈哈哈 (hāhāhā)!"
8. Always end with an encouraging question to keep the conversation going

Remember: Yasmen is from Morocco. Connect things to Arabic/French cognates when helpful. Make her feel like learning Chinese is the COOLEST thing she can do!`;
try{
const r=await fetch(GROQ_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+GROQ_KEY},
body:JSON.stringify({model:'llama-3.3-70b-versatile',messages:[{role:'system',content:sys},...chatH.slice(-20)],max_tokens:700,temperature:0.85})});
const d=await r.json();document.getElementById('typing')?.remove();
if(d.choices&&d.choices[0]){const reply=d.choices[0].message.content;chatH.push({role:'assistant',content:reply});appendMsg('assistant',reply);localStorage.hx_chat=JSON.stringify(chatH.slice(-50));addXP(2)}
else if(d.error)appendMsg('assistant','Oops! API said: '+d.error.message);
}catch(e){document.getElementById('typing')?.remove();appendMsg('assistant','😅 Network hiccup! Check your connection and try again~')}
}
function clearChat(){chatH=[];localStorage.removeItem('hx_chat');initChat();toast('Chat cleared','info')}
function aiScenario(type){
const prompts={
free:'',
roleplay:'Let\'s do a fun roleplay! You\'re a street food vendor in Beijing and I\'m a tourist. GO! 🍜',
grammar:'Explain 了 (le) to me like I\'m 5, with funny examples 😂',
slang:'Teach me the most popular Chinese internet slang right now!'
};
const inp=document.getElementById('chat-field');inp.value=prompts[type]||'';if(prompts[type])sendChat();
}
function signOut() {
  if (!confirm('Sign out? Your progress is safely saved in the cloud.')) return;
  // Clear local cache but keep cloud data
  try { localStorage.removeItem('hx_db'); } catch(e) {}
  // Reset in-memory db
  db = { name: '', xp: 0, streak: 0, lastDate: '', saved: [], done: {}, pin: '', avatar: 0,
    unlockedCourses: ['hsk1','hsk2','hsk3','hsk4','business','travel','kids','all'], completedLessons: {} };
  // Show login screen
  document.getElementById('login-screen').style.display = '';
  document.getElementById('signin-name').value = '';
  document.getElementById('signin-pin').value = '';
  toast('Signed out. See you soon! 👋', 'info');
}

function resetProgress(){
  if(confirm('Reset ALL progress permanently? This also deletes your cloud data and cannot be undone.')) {
    // Delete from cloud too
    if (db.name) {
      const key = _userKey(db.name);
      window.storage.delete(key, true).catch(() => {});
    }
    try { localStorage.clear(); } catch(e) {}
    location.reload();
  }
}

// ── PRONUNCIATION LAB WITH SPEECH RECOGNITION ──────────────────────
let pronlabWord = {h:'你',p:'nǐ',m:'you'}, pronlabRecognition = null, pronlabTranscript = '';
// V13 FIX: Robust speech recognition — always fresh instance, no stale state
let _srInstance = null;
let _srBusy = false;

function _makeFreshSR(lang) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const sr = new SpeechRecognition();
  sr.continuous = false;
  sr.interimResults = true;
  sr.maxAlternatives = 3;
  sr.lang = lang || 'zh-CN';
  return sr;
}

function getSpeechRecognition(lang) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { toast('Speech recognition needs Chrome!', 'error'); return null; }
  // Always create fresh — avoids "already started" errors
  if (_srInstance) {
    try { _srInstance.abort(); } catch(e) {}
    _srInstance = null;
  }
  _srBusy = false;
  _srInstance = _makeFreshSR(lang);
  return _srInstance;
}

function initSpeechRecognition() {
  pronlabRecognition = getSpeechRecognition('zh-CN');
}

function safeStartSR(sr, onResult, onError) {
  if (!sr) { if(onError) onError({error:'not-supported'}); return; }
  if (_srBusy) {
    try { if(_srInstance) _srInstance.abort(); } catch(e) {}
    _srBusy = false;
    _srInstance = null;
    sr = _makeFreshSR(sr.lang);
    if (!sr) { if(onError) onError({error:'not-supported'}); return; }
    _srInstance = sr;
  }
  
  let finalTranscript = '';
  
  sr.onresult = (event) => {
    finalTranscript = '';
    for (let i = 0; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    // Build a synthetic event-like object with final results for compatibility
    if (event.results[event.results.length - 1].isFinal) {
      onResult(event);
    }
  };
  
  sr.onerror = (err) => {
    _srBusy = false;
    _srInstance = null;
    if (err.error === 'no-speech') {
      toast('No speech detected — try again', 'info');
    } else if (err.error === 'audio-capture') {
      toast('Microphone not accessible — check permissions', 'error');
    } else if (err.error !== 'aborted') {
      console.warn('SR error:', err.error);
    }
    if (onError) onError(err);
  };
  
  sr.onend = () => {
    _srBusy = false;
    // If we got results, onResult already fired
  };
  
  sr.onspeechend = () => { try { sr.stop(); } catch(e) {} };
  
  // ── ONE-TIME MIC STREAM FIX ──
  // Chrome only stops asking for permission if a MediaStream is kept alive.
  // We call _acquireMicStream() before every sr.start() — it's instant if already granted.
  var _doSrStart = function() {
    setTimeout(function() {
      try {
        sr.start();
        _srBusy = true;
      } catch(e) {
        _srBusy = false;
        _srInstance = null;
        const fresh = _makeFreshSR(sr.lang);
        if (fresh) {
          _srInstance = fresh;
          fresh.onresult = sr.onresult;
          fresh.onerror = sr.onerror;
          fresh.onend = sr.onend;
          fresh.onspeechend = sr.onspeechend;
          try { fresh.start(); _srBusy = true; } catch(e2) {
            if (onError) onError(e2);
          }
        } else {
          if (onError) onError(e);
        }
      }
    }, 150);
  };

  if (window._acquireMicStream) {
    window._acquireMicStream().then(_doSrStart).catch(function(err) {
      if (onError) onError({error:'not-allowed'});
    });
  } else {
    _doSrStart();
  }
}
function renderPronLab() {
  const el = document.getElementById('pronlab-content');
  if (!el) return;
  const words = [
    {h:'你',p:'nǐ',m:'you'},{h:'好',p:'hǎo',m:'good'},{h:'我',p:'wǒ',m:'I'},{h:'是',p:'shì',m:'am'},{h:'他',p:'tā',m:'he'},
    {h:'在',p:'zài',m:'at'},{h:'有',p:'yǒu',m:'have'},{h:'这',p:'zhè',m:'this'},{h:'学',p:'xué',m:'study'},{h:'吃',p:'chī',m:'eat'}
  ];
  pronlabWord = words[Math.floor(Math.random()*words.length)];
  el.innerHTML = `
    <div style="text-align:center;margin-bottom:20px">
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:99px;background:rgba(139,92,246,0.08);border:1.5px solid rgba(139,92,246,0.2)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        <span style="font-size:11px;font-weight:800;color:var(--purple-d)">AI Pronunciation Lab · Real Analysis</span>
      </div>
    </div>
    <div class="card mb-16" style="padding:22px;text-align:center">
      <div style="font-size:11px;color:var(--muted);font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px">Say this word</div>
      <div style="font-family:var(--cn);font-size:72px;font-weight:900;color:var(--text);cursor:pointer;margin:8px 0;line-height:1" onclick="speak('${pronlabWord.h}')">${pronlabWord.h}</div>
      <div style="font-size:18px;color:var(--blue);font-weight:900;margin-bottom:4px">${pronlabWord.p}</div>
      <div style="font-size:14px;color:var(--text2);margin-bottom:20px">"${pronlabWord.m}"</div>
      <div style="display:flex;gap:10px;justify-content:center;margin-bottom:6px">
        <button class="btn btn-blue" onclick="speak('${pronlabWord.h}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
          Hear Model
        </button>
        <button class="btn btn-ghost btn-sm" onclick="renderPronLab()" style="font-size:12px">Next Word</button>
      </div>
    </div>
    <div class="card mb-16">
      <div style="padding:20px;text-align:center">
        <button class="btn btn-green btn-lg" id="pronlab-record-btn" onclick="startPronRecording()" style="min-width:200px">
          🎤 Speak Now
        </button>
        <div style="font-size:11px;color:var(--muted);margin-top:8px">Press and speak the word above · AI will analyze your tones</div>
      </div>
    </div>
    <div id="pronlab-result" class="analysis-card" style="display:none">
      <div style="font-size:12px;color:var(--muted);font-weight:800;margin-bottom:10px;display:flex;align-items:center;gap:6px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        AI Pronunciation Analysis
      </div>
      <div id="pronlab-feedback" style="font-size:14px;color:var(--text2);line-height:1.6"></div>
    </div>
  `;
  if (!pronlabRecognition) initSpeechRecognition();
}
async function startPronRecording() {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const msg = isMobile
      ? '📱 Voice exercises only work in Chrome on desktop — not on phones/tablets. All other features still work!'
      : '❌ Speech recognition not available — please use Google Chrome browser.';
    toast(isMobile ? '📱 Voice: desktop Chrome only' : 'Voice needs Chrome 🎤', 'error');
    const resultDiv = document.getElementById('pronlab-result');
    if (resultDiv) { resultDiv.style.display='block'; resultDiv.innerHTML = '<div style="padding:14px;border-radius:12px;background:var(--yellow-bg);border:2px solid var(--yellow-d);font-size:13px;color:var(--text)"><strong>' + msg + '</strong></div>'; }
    return;
  }
  const btn = document.getElementById('pronlab-record-btn');
  if (btn) { btn.disabled = true; btn.textContent = '🔴 Listening...'; btn.style.background='var(--red)'; }
  const resultDiv = document.getElementById('pronlab-result');
  if (resultDiv) { resultDiv.style.display='block'; resultDiv.innerHTML='<div style="text-align:center;padding:16px"><div style="font-size:24px;margin-bottom:8px">🎤</div><div style="font-size:13px;color:var(--muted)">Speak now — say the word!</div></div>'; }
  try {
    toast('🎤 Listening... say the word!', 'info');
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Rec();
    rec.lang = 'zh-CN';
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    rec.onresult = async (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
      pronlabTranscript = transcript;
      toast(`Heard: "${transcript}" 🔊`, 'info');
      if (resultDiv) resultDiv.innerHTML = '<div style="text-align:center;padding:20px"><div style="font-size:28px;animation:spin 1s linear infinite;display:inline-block">⚙️</div><div style="font-size:13px;color:var(--muted);margin-top:8px">Analyzing with AI...</div></div>';
      const analysis = await groqAnalyzePronunciation(transcript, pronlabWord.h, pronlabWord.p);
      if (resultDiv) {
        resultDiv.innerHTML = `<div style="font-size:12px;color:var(--muted);font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>AI Pronunciation Analysis</div><div id="pronlab-feedback" style="font-size:14px;color:var(--text2);line-height:1.6">${analysis || '<span style="color:var(--green)">✓ Great effort! Keep going!</span>'}</div><div style="margin-top:16px;display:flex;gap:10px;justify-content:center"><button class="btn btn-ghost btn-sm" onclick="renderPronLab()">Try Again</button><button class="btn btn-green btn-sm" onclick="addXP(15);toast('+15 XP!','success');renderPronLab()">Next Word ✓</button></div>`;
      }
      addXP(15);
      if (btn) { btn.disabled = false; btn.textContent = '🎤 Speak Now'; btn.style.background = ''; }
    };
    rec.onerror = (event) => {
      toast(`Mic error: ${event.error} — check permissions`, 'error');
      if (resultDiv) resultDiv.innerHTML = `<div style="padding:12px;border-radius:12px;background:var(--red-bg);border:2px solid var(--red);font-size:13px;color:var(--red-d)"><strong>Microphone error: ${event.error}</strong><br>Make sure you've allowed microphone access in your browser.</div>`;
      if (btn) { btn.disabled = false; btn.textContent = '🎤 Speak Now'; btn.style.background = ''; }
    };
    rec.onspeechend = () => { try { rec.stop(); } catch(e) {} };
    rec.start();
  } catch(e) {
    toast('Could not start recording: ' + e.message, 'error');
    if (btn) { btn.disabled = false; btn.textContent = '🎤 Speak Now'; btn.style.background = ''; }
  }
}

// ── ADVANCED SPEAKING PRACTICE WITH GROQ ANALYSIS ──────────────────────
let speakingCurrentSentence = {cn:'你好，我叫亚斯敏',py:'Nǐ hǎo, wǒ jiào Yàsīmǐn',words:[
  {c:'你',p:'nǐ',m:'you'},{c:'好',p:'hǎo',m:'good'},{c:'我',p:'wǒ',m:'I'},{c:'叫',p:'jiào',m:'call'},{c:'亚',p:'yà',m:'Asia'},{c:'斯',p:'sī',m:'(name syllable)'},{c:'敏',p:'mǐn',m:'clever'}
]};
let speakingAnalysis = {};
function renderAdvancedSpeaking() {
  const el = document.getElementById('advanced-speaking-content');
  if (!el) return;
  const {cn,py,words} = speakingCurrentSentence;
  const wordDisplay = words.map((w,i) => `
    <div style="display:inline-block;margin:6px 4px;padding:10px 14px;background:var(--card-border);border-radius:12px;cursor:pointer" onclick="showWordDetail('${w.c}','${w.p}','${w.m}',${i})">
      <div style="font-family:var(--cn);font-size:22px;font-weight:900">${w.c}</div>
      <div style="font-size:11px;color:var(--blue);font-weight:700">${w.p}</div>
      <div style="font-size:9px;color:var(--text2)">${w.m}</div>
    </div>
  `).join('');
  el.innerHTML = `
    <div class="card mb-20" style="padding:20px;text-align:center">
      <div style="font-size:13px;color:var(--muted);margin-bottom:12px">Speak this sentence:</div>
      <div style="font-family:var(--cn);font-size:18px;color:var(--text);margin-bottom:8px;line-height:1.8">${cn}</div>
      <div style="font-size:13px;color:var(--blue);font-weight:800;margin-bottom:16px">${py}</div>
      <div style="font-size:12px;color:var(--text2);margin-bottom:20px">"I'm Yasmen. Hello."</div>
      <button class="btn btn-green btn-lg" id="adv-speak-btn" onclick="startAdvancedSpeaking()">🎤 Record Sentence</button>
    </div>
    <div id="word-breakdown" class="card mb-20" style="padding:16px">
      <div style="font-size:12px;color:var(--muted);font-weight:800;margin-bottom:12px">Word Breakdown (tap to learn):</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">${wordDisplay}</div>
    </div>
    <div id="speaking-analysis-result" style="display:none;min-height:100px"></div>
  `;
}
function showWordDetail(char, pinyin, meaning, idx) {
  showTokenModal(char, { stopPropagation: () => {} });
}
async function startAdvancedSpeaking() {
  if (!pronlabRecognition) initSpeechRecognition();
  const btn = document.getElementById('adv-speak-btn');
  if (btn) btn.disabled = true;
  try {
    toast('🎤 Listening to your sentence...', 'info');
    safeStartSR(pronlabRecognition, async (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
      const {cn,words} = speakingCurrentSentence;
      const resultDiv = document.getElementById('speaking-analysis-result');
      if (resultDiv) resultDiv.style.display = 'block';
      resultDiv.innerHTML = `
        <div class="card" style="padding:16px">
          <div style="font-size:12px;color:var(--muted);font-weight:800;margin-bottom:12px">You said: "${transcript}"</div>
          <div id="word-analysis-results" style="display:flex;flex-direction:column;gap:10px">
            <div style="text-align:center">Analyzing each word...</div>
          </div>
        </div>
      `;
      const wordsYouSaid = transcript.split(/[\s,，。！？]/);
      const analyses = [];
      for (let i = 0; i < Math.min(words.length, wordsYouSaid.length); i++) {
        const word = words[i];
        const spoken = wordsYouSaid[i] || '';
        const analysis = await groqAnalyzeSpeakingWord(spoken, word.c, word.p);
        analyses.push({word: word.c, spoken, analysis, correct: spoken.toLowerCase().includes(word.c.toLowerCase()) || spoken.includes(word.p)});
        addXP(5);
      }
      const resultsHtml = analyses.map(a => `
        <div style="padding:12px;border-radius:12px;background:${a.correct ? 'var(--green-bg)' : 'var(--red-bg)'};border-left:4px solid ${a.correct ? 'var(--green)' : 'var(--red)'}">
          <div style="font-weight:800;color:${a.correct ? 'var(--green)' : 'var(--red)'};margin-bottom:4px">${a.word}: ${a.spoken || '(no audio)'}</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.5">${a.analysis || 'Great effort!'}</div>
        </div>
      `).join('');
      document.getElementById('word-analysis-results').innerHTML = resultsHtml;
      if (btn) btn.disabled = false;
    }, (event) => {
      toast('Mic error: ' + event.error, 'error');
      if (btn) btn.disabled = false;
    });
  } catch(e) {
    toast('Could not start recording', 'error');
    if (btn) btn.disabled = false;
  }
}
async function groqAnalyzeSpeakingWord(spoken, word, pinyin) {
  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', max_tokens: 80,
        messages: [{ role: 'user', content: `One sentence: did the student say "${word}" (${pinyin}) correctly? They said: "${spoken}". Be encouraging.` }]
      })
    });
    const data = await resp.json();
    return data.choices?.[0]?.message?.content || '✓ Good effort!';
  } catch(e) { return '✓ Good effort!'; }
}

// ── VOICE CONVERSATION TEACHER (Smart AI Teacher) ──────────────────────
let voiceTeacherConversation = [];
function renderVoiceTeacher() {
  const el = document.getElementById('voiceteacher-content');
  if (!el) return;
  voiceTeacherConversation = [];
  el.innerHTML = `
    <div class="card mb-20" style="padding:20px">
      <div style="font-size:13px;color:var(--muted);font-weight:800;margin-bottom:12px">Teacher Mode</div>
      <div style="background:var(--blue-bg);padding:14px;border-radius:14px;margin-bottom:14px">
        <div style="font-size:12px;color:var(--blue-d);font-weight:700;margin-bottom:4px">Teacher (Sarah):</div>
        <div style="font-size:14px;color:var(--text);line-height:1.6" id="teacher-message">Hi there! 👋 I'm Sarah, your Chinese teacher! Today let's practice greetings. I'll say something in Chinese, you repeat it! Ready? Say: 你好 (nǐ hǎo) — that means "Hello"! 😊</div>
      </div>
      <div class="flex gap-8 justify-center mb-16">
        <button class="btn btn-blue btn-sm" onclick="speakTeacherMessage()">Hear</button>
        <button class="btn btn-green btn-sm" onclick="studentRespondsToTeacher(event)">Speak</button>
      </div>
    </div>
    <div class="card" style="padding:16px">
      <div style="font-size:12px;color:var(--muted);font-weight:800;margin-bottom:12px">Conversation History:</div>
      <div id="conversation-log" style="display:flex;flex-direction:column;gap:10px;max-height:300px;overflow-y:auto">
        <div style="text-align:center;color:var(--muted);font-size:12px">Start speaking...</div>
      </div>
    </div>
  `;
}
function speakTeacherMessage() {
  const msg = document.getElementById('teacher-message')?.textContent || '';
  speakBilingual(msg);
}
function speakTeacherChinese(text) {
  speakBilingual(text);
}
async function studentRespondsToTeacher() {
  if (!pronlabRecognition) initSpeechRecognition();
  const btn = event.target;
  btn.disabled = true;
  try {
    toast('🎤 Listening... respond to the teacher!', 'info');
    safeStartSR(pronlabRecognition, async (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
      voiceTeacherConversation.push({role:'student',content:transcript});
      const logEl = document.getElementById('conversation-log');
      if (logEl) {
        logEl.innerHTML += `<div style="padding:10px;background:var(--card-border);border-radius:10px;border-left:4px solid var(--blue)"><div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:2px">You:</div><div style="font-size:13px">${transcript}</div></div>`;
        logEl.scrollTop = logEl.scrollHeight;
      }
      const nextMessage = await groqGetTeacherResponse(transcript);
      voiceTeacherConversation.push({role:'teacher',content:nextMessage});
      const teacherEl = document.getElementById('teacher-message');
      if (teacherEl) teacherEl.textContent = nextMessage;
      if (logEl) {
        logEl.innerHTML += `<div style="padding:10px;background:var(--green-bg);border-radius:10px;border-left:4px solid var(--green)"><div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:2px">Teacher:</div><div style="font-size:13px">${nextMessage}</div></div>`;
        logEl.scrollTop = logEl.scrollHeight;
      }
      speakBilingual(nextMessage);
      addXP(20);
      btn.disabled = false;
    }, () => { btn.disabled = false; });
  } catch(e) { btn.disabled = false; }
}
async function groqGetTeacherResponse(studentMessage) {
  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 150,
        messages: [
          { role: 'system', content: 'You are Sarah, a warm and encouraging Chinese language teacher. ALWAYS respond primarily in ENGLISH with some Chinese phrases mixed in. Format: give English feedback first, then one Chinese phrase to practice with its pinyin and translation. Be casual, fun, enthusiastic. Example: "Great job! You said that really clearly! Now try this: 谢谢你 (xiè xiè nǐ) - thank you! Can you repeat it?"' },
          { role: 'user', content: `Student said: "${studentMessage}". Give encouraging feedback and one Chinese phrase to practice.` }
        ]
      })
    });
    const data = await resp.json();
    return data.choices?.[0]?.message?.content || 'That was great! Keep going!';
  } catch(e) { return 'That was great! Keep going!'; }
}

// ── V12: REAL AI PRONUNCIATION ANALYSIS (Anthropic API) ──────────────────────
async function groqAnalyzePronunciation(spoken, expected, pinyin) {
  // Try Anthropic API first for richer analysis
  try {
    const prompt = `You are a Chinese pronunciation coach. A student attempted to say "${expected}" (pinyin: ${pinyin}).
Speech recognition heard: "${spoken}"

Respond in JSON only (no markdown, no explanation outside JSON):
{
  "score": <0-100 number>,
  "grade": "<Perfect/Good/Fair/Needs Work>",
  "heard": "<what was heard>",
  "match": "<how close it matched>",
  "tip": "<one specific actionable pronunciation tip>",
  "encouragement": "<one short encouraging line>"
}`;
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 250,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || '';
    try {
      const clean = raw.replace(/```json|```/g, '').trim();
      const analysis = JSON.parse(clean);
      const scoreColor = analysis.score >= 80 ? 'var(--green)' : analysis.score >= 50 ? 'var(--yellow-d)' : 'var(--red)';
      const gradeEmoji = analysis.score >= 80 ? '🌟' : analysis.score >= 50 ? '👍' : '💪';
      return `<div style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          <div style="font-size:32px;font-weight:900;color:${scoreColor}">${analysis.score}</div>
          <div>
            <div style="font-weight:800;font-size:15px">${gradeEmoji} ${analysis.grade}</div>
            <div style="font-size:11px;color:var(--muted)">out of 100</div>
          </div>
          <div class="score-bar" style="flex:1"><div class="score-fill" style="width:${analysis.score}%;background:${scoreColor}"></div></div>
        </div>
        <div style="font-size:13px;color:var(--text2);margin-bottom:6px">🎯 <strong>Heard:</strong> ${analysis.match}</div>
        <div style="background:rgba(28,176,246,0.07);border:1.5px solid rgba(28,176,246,0.2);border-radius:12px;padding:10px 14px;font-size:13px;margin-bottom:6px">
          💡 <strong>Tip:</strong> ${analysis.tip}
        </div>
        <div style="font-size:13px;color:var(--green-d);font-weight:700">${analysis.encouragement}</div>
      </div>`;
    } catch(parseErr) {
      return raw; // fallback to raw text
    }
  } catch(e) {
    // Fallback to local analysis
    const isMatch = spoken && (spoken.includes(expected) || expected.includes(spoken.slice(0,2)));
    return isMatch
      ? '🌟 <strong>Great match!</strong> Your pronunciation was recognized correctly. Keep practicing to perfect your tones!'
      : `💪 <strong>Keep going!</strong> You said "${spoken || '(nothing heard)'}" — try listening to the example again and focus on the tones.`;
  }
}

// ── V12: ANTHROPIC AI GRAMMAR EXPLANATION ──────────────────────────────
async function groqExplainGrammar(pattern, example) {
  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 180,
        messages: [{
          role: 'user',
          content: `Explain this Chinese grammar pattern in 2 fun sentences for a beginner. Use a simple analogy. Pattern: "${pattern}", Example: "${example}". Be encouraging and memorable!`
        }]
      })
    });
    const data = await resp.json();
    return data.choices?.[0]?.message?.content || null;
  } catch(e) { return null; }
}

// === PRONUNCIATION TESTING ===
function testPronounce(hanzi,pinyin){
const rec = getSpeechRecognition('zh-CN');
if(!rec){return;}
toast('Listening... speak now!','info');
safeStartSR(rec, (e)=>{
const alts=[];for(let i=0;i<e.results[0].length;i++)alts.push(e.results[0][i].transcript);
const norm=s=>s.toLowerCase().replace(/[\u0101\u00e1\u01ce\u00e0\u0113\u00e9\u011b\u00e8\u012b\u00ed\u01d0\u00ec\u014d\u00f3\u01d2\u00f2\u016b\u00fa\u01d4\u00f9\u01d6\u01d8\u01da\u01dc]/g,c=>{const m={'\u0101':'a','\u00e1':'a','\u01ce':'a','\u00e0':'a','\u0113':'e','\u00e9':'e','\u011b':'e','\u00e8':'e','\u012b':'i','\u00ed':'i','\u01d0':'i','\u00ec':'i','\u014d':'o','\u00f3':'o','\u01d2':'o','\u00f2':'o','\u016b':'u','\u00fa':'u','\u01d4':'u','\u00f9':'u'};return m[c]||c}).replace(/[^\w\s]/g,'').trim();
let best=0;
for(const a of alts){if(a===hanzi||a.includes(hanzi)){best=1;break}}
if(best===0){const np=norm(pinyin);for(const a of alts){if(norm(a)===np){best=0.9;break}}}
const el=document.getElementById('pr-'+hanzi);
if(el){el.style.display='block';
if(best>=0.9){el.style.color='var(--green)';el.textContent='Excellent! Perfect pronunciation!';addXP(3)}
else if(best>=0.5){el.style.color='var(--yellow-d)';el.textContent='Good try! Keep practicing!';addXP(1)}
else{el.style.color='var(--red)';el.textContent='Try again! Listen and repeat.'}
setTimeout(()=>{if(el)el.style.display='none'},3000);
}else{
if(best>=0.9)toast('Perfect pronunciation!','success');
else toast('Try again!','error');
}
}, ()=>toast('Could not hear you. Try again.','error'));
}
// === VOICE INPUT FOR CHAT ===
function voiceChat(){
const rec = getSpeechRecognition('zh-CN');
if(!rec){toast('Speech needs Chrome!','error');return}
const btn=document.getElementById('voice-chat-btn');
if(btn){btn.classList.add('rec')}
toast('🎤 Listening...','info');
safeStartSR(rec, (e)=>{
  const t=e.results[0][0].transcript;
  document.getElementById('chat-field').value=t;
  if(btn)btn.classList.remove('rec');
  sendChat();
}, ()=>{if(btn)btn.classList.remove('rec');toast('Could not hear you','error')});
}
// === UNIT TEST ===
let utQ=[],utI=0,utS=0,utUnit=null;
function startUnitTest(unitId){
utUnit=UNITS.find(u=>u.id===unitId);if(!utUnit)return;
const words=[];utUnit.lessons.forEach(l=>l.words.forEach(w=>{const f=ALL_WORDS.find(x=>x.h===w);if(f)words.push(f)}));
utQ=shuffle(words).slice(0,Math.min(words.length,10));utI=0;utS=0;
document.querySelectorAll('.page').forEach(e=>e.classList.remove('active'));
document.getElementById('pg-unittest').classList.add('active');
document.getElementById('ut-title').textContent='Unit Test: '+utUnit.title;
renderUnitTest();
}
function renderUnitTest(){
if(utI>=utQ.length){showUnitTestResult();return}
const w=utQ[utI];
document.getElementById('ut-prog').style.width=(utI/utQ.length*100)+'%';
const others=shuffle(ALL_WORDS.filter(x=>x.h!==w.h)).slice(0,3).map(x=>x.m);
const opts=shuffle([w.m,...others]);
document.getElementById('unittest-body').innerHTML=`<div class="quiz-card"><div style="font-size:12px;color:var(--muted);margin-bottom:8px">Question ${utI+1} of ${utQ.length}</div>
<div class="quiz-hanzi">${w.h}</div><div class="quiz-py">${w.p}</div>
<div class="quiz-opts">${opts.map(o=>`<button class="q-opt" onclick="ansUT(this,'${o.replace(/'/g,"\\'")}','${w.m.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div></div>`;
speak(w.h);
}
function ansUT(btn,c,cor){
document.querySelectorAll('.q-opt').forEach(b=>{b.disabled=true;if(b.textContent===cor)b.classList.add('correct');else if(b.textContent===c&&c!==cor)b.classList.add('wrong')});
if(c===cor){utS++;toast('Correct!','success')}else toast('Wrong!','error');
setTimeout(()=>{utI++;renderUnitTest()},1200);
}
function showUnitTestResult(){
const pct=Math.round(utS/utQ.length*100),xp=utS*15;addXP(xp);
document.getElementById('ut-prog').style.width='100%';
document.getElementById('unittest-body').innerHTML=`<div class="quiz-card"><div style="font-size:64px;font-weight:900;color:${pct>=80?'var(--green)':'var(--orange)'}">${pct}%</div><div style="font-size:18px;color:var(--text2);margin:12px 0">${utS}/${utQ.length} · +${xp} XP</div><div style="font-size:14px;color:var(--muted);margin-bottom:20px">${pct>=90?'Outstanding! Unit mastered!':pct>=60?'Good job! Keep reviewing.':'Keep studying this unit.'}</div><div class="flex gap-10" style="justify-content:center"><button class="btn btn-green" onclick="startUnitTest(${utUnit.id})">Retry</button><button class="btn btn-ghost" onclick="go('learn')">Back</button></div></div>`;
}
// === LISTENING CHALLENGE ===
let lQ=[],lI=0,lS=0;
function startListening(){lQ=shuffle([...ALL_WORDS]).slice(0,10);lI=0;lS=0;renderListening()}
function renderListening(){
  if(lI>=lQ.length){showListeningResult();return;}
  const w=lQ[lI];
  document.getElementById('l-prog').style.width=(lI/lQ.length*100)+'%';
  document.getElementById('listen-body').innerHTML=`<div class="quiz-card"><div style="font-size:12px;color:var(--muted);margin-bottom:16px">Question ${lI+1} of ${lQ.length}</div>
  <button class="btn btn-blue" style="width:80px;height:80px;border-radius:50%;margin:0 auto 24px;display:flex" onclick="speak('${w.h.replace(/'/g,"\\'")}')"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:4px"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg></button>
  <div class="quiz-opts">${shuffle([w.m, ...shuffle(ALL_WORDS.filter(x=>x.h!==w.h)).slice(0,3).map(x=>x.m)]).map(o=>`<button class="q-opt" onclick="ansListening(this,'${o.replace(/'/g,"\\'")}','${w.m.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div></div>`;
  speak(w.h);
}
function ansListening(btn,c,cor){
  document.querySelectorAll('.q-opt').forEach(b=>{
    b.disabled=true;
    if(b.textContent===cor)b.classList.add('correct');
    else if(b.textContent===c&&c!==cor)b.classList.add('wrong');
  });
  if(c===cor){lS++;toast('Correct!','success')}else{toast('Wrong!','error')}
  setTimeout(()=>{lI++;renderListening()},1200);
}
function showListeningResult(){
  const pct=Math.round(lS/lQ.length*100),xp=lS*10;addXP(xp);
  document.getElementById('l-prog').style.width='100%';
  document.getElementById('listen-body').innerHTML=`<div class="quiz-card"><div style="font-size:64px;font-weight:900;color:var(--gold)">${pct}%</div><div style="font-size:18px;color:var(--text2);margin:12px 0">${lS}/10 · +${xp} XP</div><div class="flex gap-10" style="justify-content:center"><button class="btn btn-green" onclick="startListening()">Again</button><button class="btn btn-ghost" onclick="go('home')">Home</button></div></div>`;
}

// === FLASHCARDS ===
let fQ=[],fI=0,fFlipped=false;
function startFlashcards(){fQ=shuffle([...ALL_WORDS]);fI=0;fFlipped=false;renderFlashcard()}
function renderFlashcard(){
  if(fI>=fQ.length){fI=0;fQ=shuffle([...ALL_WORDS]);} // Loop infinitely
  if(fI<0){fI=fQ.length-1;}
  const w=fQ[fI];
  document.getElementById('fc-count').textContent = `${fI+1} / ${fQ.length}`;
  document.getElementById('flash-body').innerHTML=`<div class="card mb-24" style="height:320px;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;perspective:1000px;background:none;border:none;box-shadow:none;padding:0" onclick="flipFlashcard()">
    <div id="fc-inner" style="transition:transform 0.6s;transform-style:preserve-3d;width:100%;height:100%;position:relative;text-align:center">
      <div style="position:absolute;width:100%;height:100%;backface-visibility:hidden;display:flex;align-items:center;justify-content:center;flex-direction:column;background:var(--card);border:3px solid var(--card-border);border-radius:24px;box-shadow:0 8px 0 var(--card-border)"><div style="font-size:80px;font-family:var(--cn);font-weight:900">${w.h}</div><div class="text-muted mt-16" style="font-size:12px">Tap to flip</div></div>
      <div style="position:absolute;width:100%;height:100%;backface-visibility:hidden;transform:rotateX(180deg);display:flex;align-items:center;justify-content:center;flex-direction:column;background:var(--sidebar);border:3px solid var(--sidebar-d);border-radius:24px;box-shadow:0 8px 0 var(--sidebar-d)">
        <div style="font-size:42px;color:var(--blue);font-weight:900;margin-bottom:12px">${w.p}</div>
        <div style="font-size:24px;color:var(--text);font-weight:700">${w.m}</div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between mt-24">
    <button class="btn btn-ghost" onclick="fI--;fFlipped=false;renderFlashcard()">Prev</button>
    <button class="btn btn-green" onclick="fI++;fFlipped=false;renderFlashcard();addXP(1)" style="box-shadow:0 4px 0 var(--green-d)">Next</button>
  </div>`;
  if(fFlipped) flipFlashcard();
  else speak(w.h);
}
function flipFlashcard() {
  fFlipped = !fFlipped;
  const el = document.getElementById('fc-inner');
  if(el) el.style.transform = fFlipped ? 'rotateX(180deg)' : 'rotateX(0)';
}

// === SPEAKING CHALLENGE GAME ===
let spQ=[], spI=0, spS=0, spTotal=8;

function startSpeakingGame() {
  // Collect sentences from lessons
  let allSentences = [];
  if(window.UNITS) {
    UNITS.forEach(u => u.lessons.forEach(l => {
      if(l.sentences) l.sentences.forEach(s => {
        if(s.cn && s.py) allSentences.push({cn:s.cn, py:s.py, en:s.en||''});
      });
    }));
  }
  if(allSentences.length < 3) {
    toast('Not enough sentences loaded. Try again!','error');
    return;
  }
  spQ = shuffle(allSentences).slice(0, spTotal);
  spI = 0; spS = 0;
  renderSpeaking();
}

function renderSpeaking() {
  const bodyEl = document.getElementById('speaking-body');
  const progEl = document.getElementById('sp-prog');
  const scoreEl = document.getElementById('sp-score');
  if (!bodyEl) return;

  if (spI >= spQ.length) {
    showSpeakingResult();
    return;
  }

  const s = spQ[spI];
  if(progEl) progEl.style.width = (spI / spQ.length * 100) + '%';
  if(scoreEl) scoreEl.textContent = spS + ' / ' + spQ.length;

  bodyEl.innerHTML = `
    <div class="quiz-card" style="padding:28px">
      <div style="font-size:11px;color:var(--muted);margin-bottom:16px;font-weight:800;text-transform:uppercase;letter-spacing:1px">
        Sentence ${spI+1} of ${spQ.length}
      </div>
      <div style="font-family:var(--cn);font-size:40px;font-weight:900;color:var(--text);line-height:1.4;margin-bottom:12px;word-break:break-all">${s.cn}</div>
      <div style="font-size:16px;color:var(--blue);font-weight:700;margin-bottom:8px">${s.py}</div>
      <div style="font-size:14px;color:var(--text2);font-weight:600;margin-bottom:24px;font-style:italic">${s.en}</div>

      <div id="sp-char-row" style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:20px;min-height:70px;align-items:center">
        <div style="color:var(--muted);font-size:13px;font-weight:700">Press Speak to analyze your pronunciation</div>
      </div>

      <div id="sp-result" style="min-height:44px;border-radius:14px;background:var(--bg);border:1.5px solid var(--card-border);padding:10px 16px;font-weight:700;font-size:13px;color:var(--text2);margin-bottom:16px;display:flex;align-items:center;justify-content:center">
        Tap Listen first, then Speak
      </div>

      <div style="display:flex;gap:10px;margin-bottom:16px">
        <button class="btn btn-blue" style="flex:1;box-shadow:0 4px 0 var(--blue-d);display:inline-flex;align-items:center;gap:8px;justify-content:center" id="sp-listen-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg> Listen
        </button>
        <button class="btn btn-red" style="flex:2;box-shadow:0 4px 0 var(--red-d);display:inline-flex;align-items:center;gap:8px;justify-content:center" id="sp-mic-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Speak
        </button>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-ghost" style="flex:1" id="sp-skip-btn">Skip</button>
        <button class="btn btn-green" style="flex:1;box-shadow:0 4px 0 var(--green-d);display:none" id="sp-next-btn">Next</button>
      </div>
    </div>
  `;

  const cn = s.cn, py = s.py;
  document.getElementById('sp-listen-btn').addEventListener('click', () => speak(cn));
  document.getElementById('sp-skip-btn').addEventListener('click', () => { spI++; renderSpeaking(); });
  document.getElementById('sp-next-btn').addEventListener('click', () => { spI++; renderSpeaking(); });
  document.getElementById('sp-mic-btn').addEventListener('click', () => runSpeakingTest(cn, py));
  speak(cn);
}

function runSpeakingTest(expected, pinyin) {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    var isMob = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var msg = isMob ? '📱 Voice exercises need desktop Chrome — not supported on phones/tablets. All other features work!' : '🎤 Voice recognition not available — please use Google Chrome.';
    var spResult = document.getElementById('sp-result');
    if (spResult) spResult.innerHTML = '<div style="padding:12px;background:var(--yellow-bg);border:2px solid var(--yellow-d);border-radius:12px;font-size:13px;color:var(--text)"><strong>' + msg + '</strong></div>';
    return;
  }

  const micBtn = document.getElementById('sp-mic-btn');
  const resultEl = document.getElementById('sp-result');
  const charRow = document.getElementById('sp-char-row');
  const nextBtn = document.getElementById('sp-next-btn');
  const skipBtn = document.getElementById('sp-skip-btn');

  micBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:7px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Listening...</span>';
  micBtn.style.background = '#ff4b4b';
  micBtn.disabled = true;
  resultEl.innerHTML = '<span style="color:var(--blue);font-weight:800;animation:pulse 1s infinite;display:inline-block">Recording your voice...</span>';

  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const r = new Rec();
  r.lang = 'zh-CN';
  r.interimResults = false;
  r.maxAlternatives = 5;

  r.onresult = async (e) => {
    const alts = Array.from(e.results[0]).map(a => a.transcript.replace(/[\s，。！？]/g,''));
    const expClean = expected.replace(/[\s，。！？]/g,'');

    let bestScore = 0, bestMatch = alts[0];
    for(const alt of alts) {
      const sc = scorePronunciation(alt, expClean);
      if(sc > bestScore) { bestScore = sc; bestMatch = alt; }
    }

    // Word-by-word analysis
    const analysis = spAnalyzeChars(expClean, bestMatch);

    // Build rich colored character display
    charRow.innerHTML = `<div class="pron-sentence-wrap">` + analysis.map(ca => {
      const wClass = ca.status === 'correct' ? 'pron-word-correct' : ca.status === 'close' ? 'pron-word-close' : 'pron-word-wrong';
      const mark = ca.status === 'correct' ? 'Said correctly' : ca.status === 'close' ? 'Close' : 'Needs work';
      const dot = ca.status === 'correct' ? '✓' : ca.status === 'close' ? '~' : '✗';
      return `<div class="${wClass}">
        <span class="pron-char-text">${ca.char}</span>
        <span class="pron-status-dot">${dot}</span>
      </div>`;
    }).join('') + `</div>`;

    const color = bestScore >= 90 ? '#58cc02' : bestScore >= 65 ? '#ffc800' : '#ff4b4b';
    const ringClass = bestScore >= 90 ? 'pron-ring-great' : bestScore >= 65 ? 'pron-ring-ok' : 'pron-ring-poor';
    const grade = bestScore >= 90 ? 'Excellent!' : bestScore >= 70 ? 'Good job!' : bestScore >= 50 ? 'Keep going!' : 'Try again!';

    const correct = analysis.filter(a => a.status === 'correct').length;
    const close = analysis.filter(a => a.status === 'close').length;
    const wrong = analysis.filter(a => a.status === 'wrong').length;

    resultEl.innerHTML = `
      <div style="text-align:center;margin-bottom:12px">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;border:6px solid ${color};font-size:20px;font-weight:900;color:${color}">${bestScore}%</div>
        <div style="font-size:16px;font-weight:900;color:${color};margin-top:6px">${grade}</div>
        <div style="font-size:12px;color:var(--text2);margin-top:3px">You said: <strong style="font-family:var(--cn);color:var(--text)">${e.results[0][0].transcript}</strong></div>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:10px">
        ${correct > 0 ? `<span class="pron-feedback-chip chip-correct">${correct} correct</span>` : ''}
        ${close > 0 ? `<span class="pron-feedback-chip chip-close">${close} close</span>` : ''}
        ${wrong > 0 ? `<span class="pron-feedback-chip chip-wrong">${wrong} needs work</span>` : ''}
      </div>
      <div id="groq-pron-analysis-v18" style="font-size:12px;color:var(--text2);padding:10px;background:var(--bg);border-radius:10px;border:1.5px solid var(--card-border);min-height:36px">
        <span style="color:var(--muted)">Analyzing pronunciation details...</span>
      </div>
    `;

    // Groq AI detailed analysis
    groqAnalyzePronunciation(e.results[0][0].transcript, expected, pinyin).then(aiAnalysis => {
      const el2 = document.getElementById('groq-pron-analysis-v18');
      if (el2 && aiAnalysis) {
        el2.innerHTML = '<strong style="color:var(--blue)">AI Feedback:</strong> ' + aiAnalysis;
      } else if (el2) {
        el2.style.display = 'none';
      }
    });

    if(bestScore >= 65) { spS++; addXP(Math.ceil(bestScore/25)); }

    micBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:7px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Try Again</span>';
    micBtn.style.background = '#ff4b4b';
    micBtn.disabled = false;
    if(nextBtn) { nextBtn.style.display = ''; skipBtn.style.display = 'none'; }
    if(document.getElementById('sp-score')) document.getElementById('sp-score').textContent = spS + ' / ' + spQ.length;
  };

  r.onerror = () => {
    micBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:7px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Speak</span>';
    micBtn.style.background = '#ff4b4b';
    micBtn.disabled = false;
    resultEl.innerHTML = 'Could not hear you. Check microphone permissions.';
  };

  r.start();
}

// Character analysis for speaking game (returns array of {char, status})
function scorePronunciation(heard, expected) {
  if (!heard || !expected) return 0;
  const h = heard.replace(/[\s，。！？]/g,'');
  const e = expected.replace(/[\s，。！？]/g,'');
  if (h === e) return 100;
  let correct = 0;
  const eChars = [...e];
  const hChars = [...h];
  eChars.forEach((c, i) => { if (hChars[i] === c) correct++; });
  return Math.round(correct / eChars.length * 100);
}

function spAnalyzeChars(expected, heard) {
  const expChars = [...expected];
  const heardArr = [...heard];
  const usedH = new Array(heardArr.length).fill(false);
  const posMatch = new Array(expChars.length).fill(false);

  // Pass 1: exact position
  expChars.forEach((c, i) => {
    if (heardArr[i] === c) { posMatch[i] = true; usedH[i] = true; }
  });

  // Pass 2: anywhere in heard
  const anyMatch = new Array(expChars.length).fill(false);
  expChars.forEach((c, i) => {
    if(posMatch[i]) return;
    const idx = heardArr.findIndex((h, hi) => !usedH[hi] && h === c);
    if(idx !== -1) { anyMatch[i] = true; usedH[idx] = true; }
  });

  return expChars.map((c, i) => ({
    char: c,
    status: posMatch[i] ? 'correct' : anyMatch[i] ? 'close' : 'wrong'
  }));
}

function showSpeakingResult() {
  const pct = Math.round(spS / spQ.length * 100);
  const xp = spS * 15;
  if(window.addXP) addXP(xp);
  const progEl = document.getElementById('sp-prog');
  if(progEl) progEl.style.width = '100%';
  const scoreEl = document.getElementById('sp-score');
  if(scoreEl) scoreEl.textContent = spS + '/' + spQ.length;
  const body = document.getElementById('speaking-body');
  if(!body) return;
  const grade = pct>=90?{e:'🏆',l:'Outstanding!',c:'var(--green)'}:pct>=70?{e:'⭐',l:'Great job!',c:'var(--blue)'}:pct>=50?{e:'👍',l:'Good effort!',c:'var(--yellow-d)'}:{e:'💪',l:'Keep going!',c:'var(--orange)'};
  body.innerHTML = `
    <div class="quiz-card" style="padding:36px;text-align:center">
      <div style="font-size:52px;margin-bottom:8px">${grade.e}</div>
      <div style="font-size:56px;font-weight:900;color:${grade.c};line-height:1">${pct}%</div>
      <div style="font-size:18px;font-weight:900;margin:10px 0">${grade.l}</div>
      <div class="score-bar" style="max-width:240px;margin:10px auto"><div class="score-fill" style="width:${pct}%;background:${grade.c}"></div></div>
      <div style="font-size:14px;color:var(--text2);margin:10px 0">${spS} of ${spQ.length} sentences · <strong>+${xp} XP</strong></div>
      <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:12px 0">
        <span class="feedback-chip ${pct>=80?'chip-perfect':pct>=50?'chip-good':'chip-needs-work'}">Score: ${pct}%</span>
        <span class="feedback-chip chip-perfect">+${xp} XP</span>
        <span class="feedback-chip chip-good">${spQ.length} sentences</span>
      </div>
      <div class="flex gap-10" style="justify-content:center;margin-top:20px">
        <button class="btn btn-green" onclick="startSpeakingGame()">Try Again</button>
        <button class="btn btn-ghost" onclick="go('home')">Home</button>
      </div>
    </div>
  `;
}
function renderHome() {
  updXP();
  const cont = document.getElementById('home-continue');
  if (!cont) return;
  const unit = UNITS.find(u => u.lessons.some(l => !db.done[l.id])) || UNITS[0];
  const lesson = unit ? unit.lessons.find(l => !db.done[l.id]) || unit.lessons[0] : null;
  if (lesson) {
    const w = ALL_WORDS.find(w => lesson.words.includes(w.h)) || ALL_WORDS[0];
    const uIdx = UNITS.indexOf(unit);
    const lIdx = unit.lessons.indexOf(lesson);
    cont.innerHTML = `
      <div class="continue-card" onclick="openLesson(${uIdx},${lIdx})">
        <div class="continue-char">${w.h}</div>
        <div class="continue-info">
          <div class="continue-unit">${unit.title}</div>
          <div class="continue-lesson">${lesson.title}</div>
          <div class="continue-py">${w.p} · ${w.m}</div>
        </div>
        <button class="continue-btn" onclick="event.stopPropagation();openLesson(${uIdx},${lIdx})">Continue</button>
      </div>`;
  }
  // greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好';
  const greetEl = document.getElementById('home-greeting');
  if (greetEl) greetEl.textContent = `${greeting}, ${db.name || 'Learner'}!`;
  const streak = db.streak || 0;
  const streakEl = document.getElementById('h-streak-chip');
  if (streakEl) streakEl.textContent = streak > 0 ? `${streak} day streak` : 'Start your streak!';
}

// Override renderLearn for new unit/lesson cards
function renderLearn() {
  const el = document.getElementById('learn-content');
  if (!el) return;
  const totalLessons = UNITS.reduce((a, u) => a + u.lessons.length, 0);
  const doneLessons = Object.keys(db.done).length;
  const pct = Math.round(doneLessons / totalLessons * 100);
  const fillEl = document.getElementById('learn-xp-fill');
  if (fillEl) fillEl.style.width = pct + '%';
  const progEl = document.getElementById('learn-progress-text');
  if (progEl) progEl.textContent = `${doneLessons} / ${totalLessons} lessons`;

  const zones = [
    {label:'HSK 1',tag:'Foundations',emoji:'🌿',color:'var(--green)',units:UNITS.slice(0,4)},
    {label:'HSK 2',tag:'Fluency',emoji:'🌊',color:'var(--blue)',units:UNITS.slice(4,7)},
    {label:'HSK 3',tag:'Mastery',emoji:'🌅',color:'var(--orange)',units:UNITS.slice(7,12)}
  ];

  let h = zones.map((zone, zi) => {
    const zoneLessons = zone.units.flatMap(u => u.lessons).slice(0,6);
    const done = zoneLessons.filter(l => db.done[l.id]).length;
    const total = zoneLessons.length;
    const zonePct = total ? Math.round(done/total*100) : 0;
    return `<div class="learn-zone" data-depth="${0.08 + zi * 0.05}">
      <div class="learn-zone-label"><span class="learn-zone-icon" style="background:${zone.color}">${zone.emoji}</span><div><strong>${zone.label}</strong><div class="learn-zone-meta">${zone.tag} · ${done}/${total} lessons complete</div></div></div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px"><div class="xp-bar xp-bar-sm" style="flex:1"><div class="xp-fill" style="width:${zonePct}%;background:${zone.color}"></div></div><span style="font-size:11px;color:var(--muted);font-weight:800">Zone progress ${zonePct}%</span></div>
      <div class="learn-node-row">${zoneLessons.map((lesson, li) => {
        const isDone = !!db.done[lesson.id];
        const isNext = !isDone && (li===0 || db.done[zoneLessons[li-1]?.id]);
        const state = isDone ? 'done' : isNext ? 'current' : 'locked';
        const tag = isDone ? '✓' : isNext ? 'Next' : 'Locked';
        const click = `openLesson(${UNITS.indexOf(zone.units.find(u=>u.lessons.includes(lesson)))},${zone.units.find(u=>u.lessons.includes(lesson)).lessons.indexOf(lesson)})`;
        return `<div class="learn-node ${state}" onclick="${click}">
          <div class="learn-node-title">${lesson.title}</div>
          <div class="learn-node-meta">${lesson.words.length} words · ${lesson.sentences.length} sentences</div>
          <div class="learn-node-tag">${tag}</div>
        </div>`;
      }).join('')}</div>
    </div>`;
  }).join('');

  el.innerHTML = h + `<div class="learn-map-key">
    <span>🌟 Tap any active node to start the lesson</span>
    <span>🔒 Locked nodes open in course order</span>
    <span>✨ Premium path with AI guide and progress zones</span>
  </div>`;
  requestAnimationFrame(updateLearnParallax);
}

function updateLearnParallax() {
  const wrap = document.getElementById('learn-map-wrap');
  if (!wrap) return;
  const rect = wrap.getBoundingClientRect();
  const offset = Math.min(Math.max((window.innerHeight - rect.top) / (rect.height + window.innerHeight), 0), 1);
  document.querySelectorAll('.learn-layer').forEach((layer, idx) => {
    const depth = 1 + idx * 0.12;
    layer.style.transform = `translateY(${(offset - 0.5) * depth * 18}px)`;
  });
}

window.addEventListener('scroll', () => {
  if (document.querySelector('#pg-learn.active')) updateLearnParallax();
});

// Grammar with filter + improved layout
let grammarFilter = 'all';
function filterGrammar(level, btn) {
  grammarFilter = level;
  if (btn) {
    document.querySelectorAll('#grammar-level-tabs .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }
  const el = document.getElementById('grammar-body');
  if (!el) return;
  const items = grammarFilter === 'all' ? GRAMMAR :
    grammarFilter === 'HSK1' ? GRAMMAR.filter(g => !g.level || g.level === 'HSK1') :
    GRAMMAR.filter(g => g.level === grammarFilter || g.level === grammarFilter.replace('HSK','HSK '));
  const hskColors = {'HSK2':'var(--blue)','HSK3':'var(--purple)'};
  const partColors = {S:'grv-S',V:'grv-V',O:'grv-O',NEG:'grv-NEG',Q:'grv-Q',T:'grv-T',COMP:'grv-NEG',ASP:'grv-T',PROG:'grv-T',BA:'grv-NEG',BEI:'grv-NEG',EXP:'grv-Q',More:'grv-Q'};
  let h = '';
  items.forEach(g => {
    const lv = g.level || 'HSK1';
    const col = hskColors[lv] || 'var(--green)';
    const lvClass = lv === 'HSK2' ? 'hsk2' : lv === 'HSK3' ? 'hsk3' : 'hsk1';
    // Build visual pattern from rule parts
    const ruleParts = g.rule.split(/\s*\+\s*/).map(p => p.trim());
    const visualRule = ruleParts.map(p => {
      const label = p.replace(/[()]/g,'').replace(/\[.*?\]/g,'').trim();
      const cls = Object.entries(partColors).find(([k]) => p.includes(k))?.[1] || 'grv-O';
      return `<span class="grv-box ${cls}">${label}</span>`;
    }).join('<span class="grv-plus">+</span>');
    
    h += `<div class="grammar-item">
      <div class="grammar-item-header" onclick="toggleGrammar(this)">
        <div class="gi-color" style="background:${col}"></div>
        <div class="gi-info">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <div class="gi-title">${g.title}</div>
            <span class="hsk-chip ${lvClass}">${lv}</span>
          </div>
          <div class="gi-rule">${g.rule}</div>
        </div>
        <svg class="unit-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="gi-body" style="display:none">
        <div class="grammar-visual-rule">${visualRule}</div>
        <div class="gi-tip">${g.tip || ''}</div>
        ${(g.examples||[]).map(ex => {
          const safeCn = (ex.cn||'').replace(/'/g,"\\'").replace(/"/g,'&quot;');
          // Colorize parts if available
          let cnDisplay = ex.cn || '';
          if (ex.parts && ex.parts.length) {
            const partCls = {'S':'#2e8b57','V':'#1a6b94','O':'#b9770e','NEG':'#c0392b','Q':'#7d3c98','MW':'#117a65','ASP':'#117a65','COMP':'#c0392b','PROG':'#117a65','Because':'#c0392b','So':'#1a6b94','Although':'#7d3c98','But':'#b9770e','If':'#c0392b','Then':'#1a6b94','BA':'#c0392b','BEI':'#7d3c98','EXP':'#117a65','More':'#7d3c98','Owner':'#b9770e','DE':'#555','Num':'#117a65','Time':'#1a6b94','Place':'#2e8b57','While':'#7d3c98','A':'#2e8b57','B':'#1a6b94','Topic':'#b9770e','Even':'#c0392b','Also':'#7d3c98','Reason':'#c0392b','Result':'#1a6b94','Fact':'#7d3c98','Contrast':'#b9770e','Cond':'#c0392b'};
            cnDisplay = ex.parts.map(p => {
              const col2 = partCls[p.r] || '#333';
              return `<span title="${p.r}" style="color:${col2};font-weight:900;border-bottom:3px solid ${col2}30;padding:0 1px;cursor:pointer" onclick="event.stopPropagation();speak('${p.h.replace(/'/g,"\\'")}')">
                ${p.h}<sub style="font-size:9px;font-weight:700;opacity:0.7;margin-left:1px">${p.r}</sub>
              </span>`;
            }).join('');
          }
          return `<div class="gi-example">
            <div class="gi-cn" style="cursor:pointer" onclick="speak('${safeCn}')">${cnDisplay}</div>
            <div class="gi-py">${ex.py||''}</div>
            <div class="gi-en">${ex.en||''}</div>
            <div class="flex gap-6 mt-8">
              <button class="btn-speak" onclick="speak('${safeCn}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg> Listen
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });
  el.innerHTML = h;
}

function renderGrammar() {
  filterGrammar(grammarFilter, null);
}

function toggleGrammar(header) {
  const body = header.nextElementSibling;
  const chevron = header.querySelector('.unit-chevron');
  if (body.style.display === 'none') {
    body.style.display = 'block';
    if (chevron) chevron.classList.add('open');
  } else {
    body.style.display = 'none';
    if (chevron) chevron.classList.remove('open');
  }
}

// Conversations redesigned with SVG icons
function renderConvos() {
  const el = document.getElementById('convos-body');
  if (!el) return;
  // SVG icon sets for conversation cards
  const convoIcons = [
    { bg: '#dff6ff', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1cb0f6" stroke-width="2.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>` },
    { bg: '#e0f7cc', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#58cc02" stroke-width="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>` },
    { bg: '#fff8dd', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a000" stroke-width="2.5"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>` },
    { bg: '#f0e5ff', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>` },
    { bg: '#ffe5e5', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e02020" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` },
    { bg: '#e0fff6', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2bb8a4" stroke-width="2.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>` },
    { bg: '#dff6ff', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1cb0f6" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
    { bg: '#e0f7cc', svg: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#58cc02" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
  ];
  const chevron = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
  let h = '';
  CONVOS.forEach((c, i) => {
    const ico = convoIcons[i % convoIcons.length];
    h += `<div class="convo-card" onclick="openConvo(${i})">
      <div class="convo-icon" style="background:${ico.bg}">${ico.svg}</div>
      <div style="flex:1">
        <div class="convo-title">${c.title}</div>
        <div class="convo-sub">${c.turns ? c.turns.length + ' lines' : '8 lines'} · Tap to practice</div>
      </div>
      ${chevron}
    </div>`;
  });
  el.innerHTML = h;
}

function openConvo(i) {
  const c = CONVOS[i];
  if (!c) return;
  document.getElementById('convdetail-title').textContent = c.title;
  const avColors = ['var(--green)','var(--blue)'];
  let h = '<div class="flex-col gap-0">';
  (c.turns || []).forEach(t => {
    const isA = t.s === 'A';
    const safeCn = t.cn.replace(/'/g,"\\'").replace(/"/g,'&quot;');
    h += `<div class="bubble-row ${isA ? '' : 'right'}" style="margin-bottom:14px">
      <div class="bubble-av" style="background:${isA ? avColors[0] : avColors[1]}">${isA ? 'A' : 'B'}</div>
      <div class="bubble ${isA ? '' : 'right'}" onclick="speak('${safeCn}')">
        <div class="bubble-cn">${t.cn}</div>
        <div class="bubble-py">${t.py||''}</div>
        <div class="bubble-en">${t.en||''}</div>
        <div class="bubble-actions">
          <button class="btn-speak" data-listen="${safeCn}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg> Listen
          </button>
          <button class="save-btn" data-saveconv="${safeCn}" data-saveconvpy="${(t.py||'').replace(/"/g,'&quot;')}" data-saveconven="${(t.en||'').replace(/"/g,'&quot;')}">Save</button>
        </div>
      </div>
    </div>`;
  });
  h += '</div>';
  const el = document.getElementById('convdetail-body');
  el.innerHTML = h;
  el.querySelectorAll('[data-listen]').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); speak(btn.dataset.listen); }));
  el.querySelectorAll('[data-saveconv]').forEach(btn => btn.addEventListener('click', () => saveItem(btn.dataset.saveconv, btn.dataset.saveconvpy, btn.dataset.saveconven, 'sentence')));
  go('convdetail');
}

// Lesson detail improved
function renderLessonContent() {
  // Delegate to the master renderer to avoid override conflicts
  if (window._renderLessonNow) window._renderLessonNow();
}

// Characters redesigned
function charTab(tab, btn) {
  curCharTab = tab;
  if (btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }
  const el = document.getElementById('chars-body');
  if (!el) return;
  if (tab === 'radicals') {
    let h = '<div class="grid-4">';
    RADICALS.forEach(r => {
      h += `<div class="radical-card" onclick="showRadical('${r.r}')">
        <div style="font-family:var(--cn);font-size:38px;font-weight:900;color:var(--yellow-d)">${r.r}</div>
        <div style="font-size:12px;font-weight:800;margin-top:6px">${r.name}</div>
        <div style="font-size:11px;color:var(--muted);font-style:italic">${r.py}</div>
        <button class="btn btn-blue btn-sm mt-8" onclick="event.stopPropagation();speak('${r.r}')">Listen</button>
      </div>`;
    });
    h += '</div>';
    el.innerHTML = h;
  } else {
    const words = tab === 'hsk1' ? HSK1 : tab === 'hsk2' ? HSK2 : HSK3;
    let h = '<div class="char-grid">';
    words.forEach(w => {
      h += `<div class="char-cell" onclick="speak('${w.h.replace(/'/g,"\\'")}')">
        <div class="ch">${w.h}</div>
        <div class="cp">${w.p}</div>
        <div class="cm">${w.m}</div>
        <button class="save-btn mt-6" onclick="event.stopPropagation();saveItem('${w.h.replace(/'/g,"\\'")}','${w.p}','${w.m}','word')">Save</button>
      </div>`;
    });
    h += '</div>';
    el.innerHTML = h;
  }
}

// Saved words redesigned
function renderSaved() {
  const el = document.getElementById('saved-body');
  if (!el) return;
  if (!db.saved.length) {
    el.innerHTML = '<div class="card text-center" style="padding:48px"><div style="font-size:56px;margin-bottom:16px">📖</div><h3 style="color:var(--text2)">No saved words yet!</h3><p class="text-muted mt-8" style="font-size:14px">Tap Save on any word or sentence</p></div>';
    return;
  }
  const total = db.saved.length;
  let rows = '';
  db.saved.slice().reverse().forEach((item, ri) => {
    const realIdx = total - 1 - ri;
    const safeH = (item.h || '').replace(/'/g, '&apos;');
    rows += `<div class="saved-row mb-8">
      <div style="font-family:var(--cn);font-size:${item.type==='sentence'?'18':'38'}px;font-weight:900;cursor:pointer;flex-shrink:0;max-width:100px;word-break:break-all" onclick="speak('${safeH}')">${item.h}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;color:var(--blue);font-weight:700">${item.p||''}</div>
        <div style="font-size:12px;color:var(--text2);margin-top:2px">${item.m||''}</div>
        <div style="font-size:10px;color:var(--muted);margin-top:3px;font-weight:700;text-transform:uppercase">${item.type==='sentence'?'Sentence':'Word'}</div>
      </div>
      <div class="flex gap-6 flex-col">
        <button class="btn-speak" onclick="speak('${safeH}')">Listen</button>
        <button class="btn btn-ghost btn-sm" onclick="removeSaved(${realIdx})" style="color:var(--red);border-color:var(--red-bg)">Remove</button>
      </div>
    </div>`;
  });
  el.innerHTML = `<div style="font-size:13px;color:var(--muted);font-weight:700;margin-bottom:14px">${total} saved items</div>${rows}`;
}

// Stories redesigned
function renderStories() {
  const el = document.getElementById('stories-grid');
  if (!el) return;
  if (!window.KIDS_STORIES || !KIDS_STORIES.length) {
    el.innerHTML = '<div class="card text-center" style="padding:48px"><div style="font-size:52px;margin-bottom:16px">📚</div><p class="text-muted mt-12" style="font-size:14px">Stories coming soon!</p></div>';
    return;
  }
  const storyColors = [
    { bg: '#58cc02', shadow: '#3d9900', accent: '#dcf5cc', label: 'Beginner' },
    { bg: '#1cb0f6', shadow: '#0f8fc7', accent: '#dff6ff', label: 'Beginner' },
    { bg: '#ff9600', shadow: '#cc7700', accent: '#fff0d0', label: 'Intermediate' },
    { bg: '#e8192c', shadow: '#b50016', accent: '#ffe0e0', label: 'Intermediate' },
    { bg: '#ff4b91', shadow: '#cc2068', accent: '#ffe0f4', label: 'Advanced' },
    { bg: '#8b5cf6', shadow: '#6931b6', accent: '#f0e8ff', label: 'Advanced' },
    { bg: '#2bb8a4', shadow: '#1d8a79', accent: '#d8f5f0', label: 'Beginner' },
  ];
  const storyEmojis = ['🐺','🐢','🥕','🐴','🐷','🐒','🦊','🦋','🐉','🌸'];
  let h = '';
  KIDS_STORIES.forEach((s, i) => {
    const col = storyColors[i % storyColors.length];
    const done = db.done && db.done['story_' + s.id];
    const emoji = storyEmojis[i % storyEmojis.length];
    const slideCount = s.slides ? s.slides.length : '?';
    h += `<div class="story-card-v12" onclick="openStory(${i})">
      <div class="story-card-banner" style="background:linear-gradient(135deg,${col.bg},${col.shadow})">
        <div style="display:flex;align-items:center;gap:14px;position:relative;z-index:1">
          <div style="width:52px;height:52px;border-radius:16px;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:26px;border:2px solid rgba(255,255,255,0.35);box-shadow:0 3px 0 rgba(0,0,0,0.15)">${emoji}</div>
          <div>
            <div style="font-weight:900;font-size:16px;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,0.2)">${s.title}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.85);font-weight:700;margin-top:1px">${s.cnTitle || ''} · ${s.pyTitle || ''}</div>
          </div>
        </div>
        <div style="position:relative;z-index:1">
          ${done 
            ? '<div style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.5)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>'
            : '<div style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.35)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>'
          }
        </div>
      </div>
      <div class="story-card-body">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="story-chip" style="background:${col.accent};color:${col.bg}">${col.label}</span>
          <span class="story-chip">${slideCount} slides</span>
          ${done ? '<span class="story-chip" style="background:#dcf5cc;color:#2a7a00">✓ Complete</span>' : '<span class="story-chip" style="background:#fff8dd;color:#a07000">📖 Not read</span>'}
        </div>
      </div>
    </div>`;
  });
  el.innerHTML = h || '<div class="card text-center" style="padding:48px"><p>No stories found.</p></div>';
}

// Profile redesigned
function renderProfile() {
  updXP();
  const lv = Math.floor((db.xp||0) / 100) + 1;
  const el = document.getElementById('p-name'); if (el) el.textContent = db.name || 'Learner';
  const joined = document.getElementById('p-joined'); if (joined) joined.textContent = '2026';
  const ni = document.getElementById('username-input'); if (ni) ni.value = db.name || '';
  const avatarNum = (db.avatar || 0) + 1;
  const colors = ['#1cb0f6','#3dba00','#ff7a00','#8b5cf6','#ff86d0','#2bb8a4'];
  const colorIdx = (db.avatar || 0) % colors.length;
  const avatarDisplay = document.getElementById('profile-avatar-display'); 
  if (avatarDisplay) {
    avatarDisplay.textContent = avatarNum;
    avatarDisplay.style.background = `linear-gradient(135deg,${colors[colorIdx]},${colors[(colorIdx+1)%colors.length]})`;
  }
  const sbAvatar = document.getElementById('sb-avatar-display');
  if (sbAvatar) {
    sbAvatar.textContent = avatarNum;
    sbAvatar.style.background = `linear-gradient(135deg,${colors[colorIdx]},${colors[(colorIdx+1)%colors.length]})`;
  }
  const stats = document.getElementById('p-stats');
  if (stats) {
    stats.innerHTML = `
      <div class="stat-box"><div class="stat-val" style="color:var(--yellow-d)">${db.xp||0}</div><div class="stat-label">Total XP</div></div>
      <div class="stat-box"><div class="stat-val" style="color:var(--green)">${lv}</div><div class="stat-label">Level</div></div>
      <div class="stat-box"><div class="stat-val" style="color:var(--orange)">${db.streak||0}</div><div class="stat-label">Day Streak</div></div>
      <div class="stat-box"><div class="stat-val" style="color:var(--purple)">${Object.keys(db.done).length}</div><div class="stat-label">Lessons Done</div></div>
      <div class="stat-box"><div class="stat-val" style="color:var(--blue)">${db.saved.length}</div><div class="stat-label">Saved Words</div></div>`;
  }
  const grid = document.getElementById('avatar-grid');
  if (grid) {
    grid.innerHTML = colors.map((c, i) => {
      const gradientBg = `linear-gradient(135deg,${c},${colors[(i+1)%colors.length]})`;
      return `<button class="avatar-option ${i===db.avatar?' active':''}" onclick="selectAvatar(${i})" style="background:${gradientBg}">${i+1}</button>`;
    }).join('');
  }
  const ach = document.getElementById('p-achieve');
  if (ach) {
    const achievements = [
      { name: 'First Steps', icon: '✓', desc: 'Complete your first lesson', done: Object.keys(db.done).length > 0 },
      { name: 'Word Collector', icon: '📖', desc: 'Save 10 words', done: db.saved.length >= 10 },
      { name: 'XP Champion', icon: '⚡', desc: 'Earn 100 XP', done: (db.xp||0) >= 100 },
      { name: 'Streak Master', icon: '🔥', desc: '3-day streak', done: (db.streak||0) >= 3 },
      { name: 'Scholar', icon: '📚', desc: 'Complete 5 lessons', done: Object.keys(db.done).length >= 5 },
    ];
    ach.innerHTML = achievements.map(a => `
      <div class="card flex items-center gap-12" style="padding:14px;${a.done ? 'border-color:var(--green)' : 'opacity:.45'}">
        <div style="font-size:24px;background:var(--card-border);width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center">${a.icon}</div>
        <div><div style="font-weight:800;font-size:14px">${a.name}</div><div style="font-size:12px;color:var(--muted)">${a.desc}</div></div>
        ${a.done ? '<div class="badge badge-green" style="margin-left:auto">Done</div>' : ''}
      </div>`).join('');
  }
}

function selectAvatar(num) {
  db.avatar = num;
  saveDB();
  renderProfile();
}


// Theme toggle using new button style
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('hx_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.classList.toggle('on', document.body.classList.contains('dark'));
}

// Apply saved theme on load
(function() {
  const saved = localStorage.getItem('hx_theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.classList.add('on');
  }
})();

// --- Component Script --- 

/* ══════════════════════════════════════════════════
   HanyuStar v7 — Comprehensive Upgrade Script
   ══════════════════════════════════════════════════ */

const GROQ_K = 'your_groq_api_key_here';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

// ── GROQ ANALYSIS HELPER ────────────────────────────
async function groqAnalyze(heard, expected, pinyin) {
  try {
    const r = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_K },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `You are a Chinese pronunciation coach. The student tried to say "${expected}" (${pinyin}). Speech recognition heard: "${heard}".
Rate the attempt and give 1 sentence of specific feedback.
Reply with ONLY valid HTML like this example (replace values):
<div class="groq-fb-card perfect"><strong>9/10 — Great!</strong> Your tones were mostly correct, just watch the second tone.</div>
Use class "perfect" for 8-10, "good" for 5-7, "poor" for 1-4. No markdown, no backticks.`
        }],
        max_tokens: 150, temperature: 0.7
      })
    });
    const d = await r.json();
    return d.choices?.[0]?.message?.content || '<div class="groq-fb-card good"><strong>Good attempt!</strong> Keep practicing.</div>';
  } catch(e) {
    return '<div class="groq-fb-card good"><strong>Good attempt!</strong> Keep practicing.</div>';
  }
}

// ── SPEECH RECOGNITION HELPER ──────────────────────
function startSpeech(lang, onResult, onError) {
  const rec = getSpeechRecognition(lang || 'zh-CN');
  if (!rec) { toast('Use Chrome for speech!', 'error'); return null; }
  safeStartSR(rec,
    (e) => {
      // Get best final transcript
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) transcript += e.results[i][0].transcript;
      }
      if (!transcript) {
        // Fallback: grab any result
        transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      }
      if (transcript.trim()) onResult(transcript.trim());
    },
    () => { if (onError) onError(); }
  );
  return rec;
}

// ══ OVERRIDE: openConvo — ADD SPEAK BUTTONS PER LINE ══
const _v7_origOpenConvo = typeof openConvo === 'function' ? openConvo : null;
window.openConvo = function(i) {
  const c = CONVOS[i];
  if (!c) return;
  window._v7_curConvoIdx = i;
  document.getElementById('convdetail-title').textContent = c.title;

  const micSVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>`;
  const speakerSVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>`;

  let h = '<div style="display:flex;flex-direction:column;gap:14px">';
  (c.turns || []).forEach((t, ti) => {
    const isA = t.s === 'A';
    const bld = isA ? 'var(--blue-bg)' : 'var(--green-bg)';
    const brd = isA ? 'rgba(28,176,246,.2)' : 'rgba(88,204,2,.2)';
    const tc  = isA ? 'var(--blue-d)'  : 'var(--green-d)';
    const av  = isA ? 'var(--blue)'    : 'var(--green)';
    const safeCN = (t.cn||'').replace(/'/g,"\\'").replace(/"/g,'&quot;');
    const safePY = (t.py||'').replace(/'/g,"\\'").replace(/"/g,'&quot;');
    const safeEN = (t.en||'').replace(/"/g,'&quot;');

    h += `<div style="display:flex;gap:10px;flex-direction:${isA?'row':'row-reverse'}">
      <div style="width:36px;height:36px;border-radius:50%;background:${av};display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:14px;flex-shrink:0">${isA?'A':'B'}</div>
      <div style="max-width:82%;min-width:0">
        <div style="background:${bld};border:2px solid ${brd};border-radius:${isA?'4px 16px 16px 16px':'16px 4px 16px 16px'};padding:14px 16px">
          <div style="font-family:var(--cn);font-size:20px;font-weight:900;cursor:pointer;margin-bottom:6px;line-height:1.5" onclick="speak('${safeCN}')">${t.cn}</div>
          <div style="font-size:12px;color:${tc};font-weight:700;margin-bottom:3px">${t.py||''}</div>
          <div style="font-size:12px;color:var(--text2)">${t.en||''}</div>
        </div>
        <div style="display:flex;gap:6px;margin-top:7px;justify-content:${isA?'flex-start':'flex-end'}">
          <button style="display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:8px;border:1.5px solid rgba(28,176,246,.3);background:var(--blue-bg);color:var(--blue-d);font-size:11px;font-weight:800;cursor:pointer" onclick="speak('${safeCN}')">${speakerSVG} Listen</button>
          <button class="convo-speak-btn-v7" id="csb-${ti}" onclick="v7ConvoSpeak(this,'${safeCN}','${safePY}','${safeEN}',${ti})">${micSVG} Speak</button>
        </div>
        <div class="cl-feedback" id="clf-${ti}"></div>
      </div>
    </div>`;
  });
  h += '</div>';
  document.getElementById('convdetail-body').innerHTML = h;
  go('convdetail');
};

// ── CONVO LINE SPEAK PRACTICE ──────────────────────
async function v7ConvoSpeak(btn, cn, py, en, ti) {
  const fbEl = document.getElementById('clf-' + ti);
  if (!btn) return;
  speak(cn);
  await new Promise(r => setTimeout(r, 1200));
  btn.classList.add('recording');
  btn.disabled = true;
  const orig = btn.innerHTML;
  btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg> Listening...`;
  startSpeech('zh-CN', async (heard) => {
    btn.classList.remove('recording');
    btn.disabled = false;
    btn.innerHTML = orig;
    if (fbEl) {
      fbEl.style.display = 'block';
      fbEl.innerHTML = '<div style="font-size:11px;color:var(--muted);padding:4px">Analyzing with Groq AI...</div>';
      fbEl.innerHTML = await groqAnalyze(heard, cn, py);
      addXP(10);
    }
  }, () => {
    btn.classList.remove('recording');
    btn.disabled = false;
    btn.innerHTML = orig;
    toast('Could not hear you', 'error');
  });
}

// ══ OVERRIDE: renderPronLab — ADD SENTENCES MODE WITH REAL ANALYSIS ══
window.renderPronLab = function() {
  const el = document.getElementById('pronlab-content');
  if (!el) return;
  const sentences = [
    {t:'你好，我叫贾兹', p:'Nǐ hǎo, wǒ jiào Jiāzī', e:'Hello, my name is Jazz'},
    {t:'今天天气很好', p:'Jīntiān tiānqì hěn hǎo', e:'The weather is very nice today'},
    {t:'我想学中文', p:'Wǒ xiǎng xué zhōngwén', e:'I want to learn Chinese'},
    {t:'谢谢你的帮助', p:'Xièxie nǐ de bāngzhù', e:'Thank you for your help'},
    {t:'你会说英文吗', p:'Nǐ huì shuō yīngwén ma', e:"Can you speak English?"},
    {t:'我很高兴认识你', p:'Wǒ hěn gāoxìng rènshi nǐ', e:'Nice to meet you'},
    {t:'这个多少钱', p:'Zhège duōshao qián', e:'How much is this?'},
    {t:'请问洗手间在哪里', p:'Qǐngwèn xǐshǒujiān zài nǎlǐ', e:'Excuse me, where is the bathroom?'},
    {t:'我不太明白', p:'Wǒ bú tài míngbái', e:"I don't quite understand"},
    {t:'请再说一遍', p:'Qǐng zài shuō yíbiàn', e:'Please say that again'},
    {t:'你吃饭了吗', p:'Nǐ chīfàn le ma', e:'Have you eaten?'},
    {t:'我很喜欢中国文化', p:'Wǒ hěn xǐhuan zhōngguó wénhuà', e:'I really like Chinese culture'},
  ];
  window._v7PronSents = sentences;

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#1a2f4a,#0d1e32);border:1.5px solid rgba(28,176,246,.3);border-radius:20px;padding:18px 20px;margin-bottom:16px;color:#fff">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
        <div style="width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#1cb0f6,#0899d4);display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </div>
        <div>
          <div style="font-size:16px;font-weight:900">Pronunciation Lab</div>
          <div style="font-size:11px;color:rgba(28,176,246,.85);margin-top:2px">AI analysis · Tap Listen, then Speak</div>
        </div>
      </div>
      <div style="font-size:12px;color:rgba(255,255,255,.65);line-height:1.6">
        Each word is color-coded after you speak: <span style="color:#86efac;font-weight:800">green = correct</span>, <span style="color:#fde68a;font-weight:800">yellow = close</span>, <span style="color:#fca5a5;font-weight:800">red = needs work</span>
      </div>
    </div>
    <div class="pronlab-mode-tabs">
      <button class="tab active" onclick="v7PronMode('words',this)">Words</button>
      <button class="tab" onclick="v7PronMode('sentences',this)">Sentences</button>
    </div>
    <div id="pronlab-mode-content"></div>`;
  v7PronMode('words', el.querySelector('.tab'));
};


function v7PronMode(mode, btn) {
  const tabs = document.querySelectorAll('.pronlab-mode-tabs .tab');
  tabs.forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const el = document.getElementById('pronlab-mode-content');
  if (!el) return;
  const micSVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>`;
  const spkSVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>`;
  if (mode === 'words') {
    const words = (typeof HSK1 !== 'undefined' ? HSK1 : []).slice(0, 30);
    let h = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">';
    words.forEach((w, i) => {
      const safe = (w.h||'').replace(/'/g,"\\'");
      h += `<div style="background:var(--card);border:2px solid var(--card-border);border-radius:16px;padding:14px;text-align:center;cursor:pointer" onclick="speak('${safe}')">
        <div style="font-family:var(--cn);font-size:38px;font-weight:900;margin-bottom:6px">${w.h}</div>
        <div style="font-size:12px;color:var(--blue);font-weight:700;margin-bottom:2px">${w.p}</div>
        <div style="font-size:11px;color:var(--text2);margin-bottom:10px">${w.m}</div>
        <div style="display:flex;gap:4px;justify-content:center">
          <button onclick="speak('${safe}');event.stopPropagation()" style="display:inline-flex;align-items:center;gap:3px;padding:5px 9px;border-radius:7px;border:1.5px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:10px;font-weight:800;cursor:pointer">${spkSVG}</button>
          <button onclick="v7PronWordPractice('${safe}','${(w.p||'').replace(/'/g,"\\'")}','${(w.m||'').replace(/'/g,"\\'")}');event.stopPropagation()" style="display:inline-flex;align-items:center;gap:3px;padding:5px 9px;border-radius:7px;border:1.5px solid var(--purple);background:var(--purple-bg);color:var(--purple-d);font-size:10px;font-weight:800;cursor:pointer">${micSVG}</button>
        </div>
      </div>`;
    });
    h += '</div>';
    el.innerHTML = h;
  } else {
    const sents = window._v7PronSents || [];
    let h = '<div style="display:flex;flex-direction:column;gap:10px">';
    sents.forEach((s, i) => {
      const safe = s.t.replace(/'/g,"\\'");
      h += `<div class="speak-sent-card">
        <div style="font-family:var(--cn);font-size:22px;font-weight:900;margin-bottom:6px;cursor:pointer" onclick="speak('${safe}')">${s.t}</div>
        <div style="font-size:12px;color:var(--blue);font-weight:700;margin-bottom:2px">${s.p}</div>
        <div style="font-size:11px;color:var(--text2);margin-bottom:12px">${s.e}</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap">
          <button onclick="speak('${safe}')" style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:9px;border:1.5px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:11px;font-weight:800;cursor:pointer">${spkSVG} Listen</button>
          <button id="pls-btn-${i}" onclick="v7PronSentPractice(${i},'${safe}','${s.p.replace(/'/g,"\\'")}')" style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:9px;border:1.5px solid var(--purple);background:var(--purple-bg);color:var(--purple-d);font-size:11px;font-weight:800;cursor:pointer">${micSVG} Practice</button>
        </div>
        <div id="pls-result-${i}" style="display:none;margin-top:8px"></div>
      </div>`;
    });
    h += '</div>';
    el.innerHTML = h;
  }
}

async function v7PronWordPractice(word, pinyin, meaning) {
  speak(word);
  await new Promise(r => setTimeout(r, 900));
  toast('Listening...', 'info');
  startSpeech('zh-CN', async (heard) => {
    // Build character-by-character analysis
    const expClean = word.replace(/[\s，。！？]/g,'');
    const heardClean = heard.replace(/[\s，。！？]/g,'');
    const charAnalysis = spAnalyzeChars(expClean, heardClean);

    const correct = charAnalysis.filter(a => a.status === 'correct').length;
    const total = charAnalysis.length;
    const score = total ? Math.round(correct / total * 100) : 0;
    const ringClass = score >= 80 ? 'pron-ring-great' : score >= 50 ? 'pron-ring-ok' : 'pron-ring-poor';

    const charHtml = charAnalysis.map(ca => {
      const wClass = ca.status === 'correct' ? 'pron-word-correct' : ca.status === 'close' ? 'pron-word-close' : 'pron-word-wrong';
      const dot = ca.status === 'correct' ? 'Correct' : ca.status === 'close' ? 'Close' : 'Wrong';
      return `<div class="${wClass}"><span class="pron-char-text">${ca.char}</span><span class="pron-status-dot">${dot}</span></div>`;
    }).join('');

    // Groq analysis
    const aiAnalysis = await groqAnalyze(heard, word, pinyin);

    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px';
    d.innerHTML = `<div style="background:#fff;border:2px solid #e5e5e5;border-radius:22px;padding:24px;max-width:400px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25)">
      <div style="font-family:var(--cn);font-size:44px;font-weight:900;text-align:center;margin-bottom:4px;color:var(--text)">${word}</div>
      <div style="font-size:14px;color:var(--blue);font-weight:800;text-align:center;margin-bottom:4px">${pinyin}</div>
      <div style="font-size:12px;color:var(--muted);font-weight:700;text-align:center;margin-bottom:16px">${meaning}</div>
      
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div class="pron-ring ${ringClass}">${score}%</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:900;color:${score>=80?'#2a7a00':score>=50?'#8a6000':'#cc0000'}">${score>=80?'Excellent!':score>=50?'Good attempt!':'Keep practicing!'}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:3px">You said: <strong style="font-family:var(--cn)">${heard}</strong></div>
        </div>
      </div>

      <div style="margin-bottom:14px">
        <div style="font-size:10px;font-weight:900;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Character Analysis</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">${charHtml}</div>
      </div>

      ${aiAnalysis ? `<div style="padding:10px 12px;background:#f0f8ff;border:1.5px solid #1cb0f6;border-radius:12px;font-size:12px;color:#0a5878;margin-bottom:12px;line-height:1.6">${aiAnalysis}</div>` : ''}

      <button onclick="this.closest('div[style*=fixed]').remove()" style="width:100%;padding:12px;border-radius:12px;border:none;background:#58cc02;color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:var(--font);box-shadow:0 4px 0 #3d9900">Done</button>
    </div>`;
    document.body.appendChild(d);
    addXP(10);
  });
}

async function v7PronSentPractice(i, cn, py) {
  const btn = document.getElementById('pls-btn-' + i);
  const res = document.getElementById('pls-result-' + i);
  if (btn) {
    btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Listening...`;
    btn.style.background = '#ff4b4b'; btn.style.color = '#fff'; btn.style.borderColor = '#ff4b4b'; btn.disabled = true;
  }
  speak(cn);
  await new Promise(r => setTimeout(r, 1200));
  startSpeech('zh-CN', async (heard) => {
    if (btn) { btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Practice`; btn.style.background=''; btn.style.color=''; btn.style.borderColor=''; btn.disabled=false; }

    const expClean = cn.replace(/[\s，。！？]/g,'');
    const heardClean = heard.replace(/[\s，。！？]/g,'');
    const charAnalysis = spAnalyzeChars(expClean, heardClean);

    const correct = charAnalysis.filter(a => a.status === 'correct').length;
    const total = charAnalysis.length;
    const score = total ? Math.round(correct / total * 100) : 0;

    const charHtml = charAnalysis.map(ca => {
      const wClass = ca.status === 'correct' ? 'pron-word-correct' : ca.status === 'close' ? 'pron-word-close' : 'pron-word-wrong';
      const dot = ca.status === 'correct' ? 'Said correctly' : ca.status === 'close' ? 'Close' : 'Needs work';
      return `<div class="${wClass}"><span class="pron-char-text">${ca.char}</span><span class="pron-status-dot">${dot}</span></div>`;
    }).join('');

    const color = score >= 80 ? '#58cc02' : score >= 50 ? '#ffc800' : '#ff4b4b';

    if (res) {
      res.style.display = 'block';
      res.innerHTML = `
        <div style="background:#fff;border:1.5px solid #e5e5e5;border-radius:14px;padding:14px;margin-top:8px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="font-size:22px;font-weight:900;color:${color}">${score}%</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:800;color:${color}">${score>=80?'Excellent!':score>=50?'Good attempt!':'Try again!'}</div>
              <div style="font-size:11px;color:var(--muted)">You said: <span style="font-family:var(--cn)">${heard}</span></div>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:flex-start">${charHtml}</div>
          <div id="pls-ai-${i}" style="font-size:11px;color:var(--muted);margin-top:8px">Analyzing...</div>
        </div>`;
      addXP(score >= 65 ? 12 : 5);
    }

    // AI feedback
    groqAnalyze(heard, cn, py).then(aiResult => {
      const aiEl = document.getElementById('pls-ai-' + i);
      if (aiEl && aiResult) aiEl.innerHTML = aiResult;
      else if (aiEl) aiEl.style.display = 'none';
    });
  },
  () => {
    if (btn) { btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Practice`; btn.style.background=''; btn.style.color=''; btn.style.borderColor=''; btn.disabled=false; }
    toast('Could not hear you', 'error');
  });
}

// ══ OVERRIDE: renderVoiceTeacher ══
window.renderVoiceTeacher = function() {
  const el = document.getElementById('voiceteacher-content');
  if (!el) return;
  window._vtHistory = [];
  window._vtInitMsg = "Hey! I'm Emma — your Chinese teacher and your biggest hype person! 🎉 Real talk: Chinese sounds scary but once you start, it's SO fun. Let's kick it off — say 你好 (nǐ hăo), that means 'hello'! Don't be shy, just go for it!";
  const teacherSVG = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  const micSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>`;
  const spkSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>`;
  el.innerHTML = `
    <div class="vt-hero-card">
      <div style="display:flex;align-items:center;gap:14px">
        <div class="vt-avatar">${teacherSVG}</div>
        <div>
          <div style="font-size:17px;font-weight:900">Teacher Emma</div>
          <div style="font-size:11px;opacity:.7;display:flex;align-items:center;gap:5px;margin-top:2px">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#4eff91"><circle cx="12" cy="12" r="10"/></svg>
            Live AI Teacher · English + Chinese
          </div>
        </div>
        <button onclick="window.renderVoiceTeacher()" style="margin-left:auto;padding:6px 12px;border-radius:8px;border:1.5px solid rgba(255,255,255,.3);background:rgba(255,255,255,.15);color:#fff;font-size:11px;font-weight:800;cursor:pointer">New Session</button>
      </div>
      <div class="vt-msg-bubble" id="vt-current-msg">${window._vtInitMsg}</div>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;margin-bottom:16px">
      <button onclick="speakVT()" style="display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:99px;border:2px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:12px;font-weight:800;cursor:pointer">${spkSVG} Hear Emma</button>
      <button id="vt-speak-btn" onclick="vtSpeak()" style="display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:99px;border:none;background:linear-gradient(135deg,var(--purple),#9b59b6);color:white;font-size:12px;font-weight:800;cursor:pointer;box-shadow:0 4px 0 rgba(106,27,154,.3);transition:all .15s"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Respond</button>
    </div>
    <div style="background:var(--card);border:2px solid var(--card-border);border-radius:18px;padding:16px">
      <div style="font-size:10px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Conversation Log</div>
      <div id="vt-log" style="display:flex;flex-direction:column;gap:10px;max-height:280px;overflow-y:auto;margin-bottom:12px">
        <div style="text-align:center;color:var(--muted);font-size:12px;padding:16px">Start speaking or typing to begin your lesson!</div>
      </div>
      <div style="display:flex;gap:8px">
        <input id="vt-type-field" class="chat-field" placeholder="Or type your response here... (press Enter)" style="flex:1;padding:10px 14px;font-size:13px" onkeydown="if(event.key==='Enter'&&this.value.trim())vtTypeResponse(this.value.trim())">
        <button onclick="vtTypeResponse(document.getElementById('vt-type-field').value.trim())" style="padding:10px 16px;border-radius:12px;border:none;background:var(--green);color:#fff;font-weight:800;cursor:pointer;font-size:13px">Send</button>
      </div>
    </div>`;
  // Auto-speak the greeting so Emma immediately talks in both languages
  setTimeout(() => speakBilingual(window._vtInitMsg), 600);
};

function speakVT() {
  const msg = document.getElementById('vt-current-msg')?.textContent || '';
  if (!msg.trim()) { toast('Nothing to speak yet', 'info'); return; }
  speakBilingual(msg);
}

// Helper: speak a mixed English+Chinese message — called after teacher responds
function speakChineseFrom(text) {
  speakBilingual(text);
}

async function vtSpeak() {
  const btn = document.getElementById('vt-speak-btn');
  const log = document.getElementById('vt-log');
  if (!btn) return;
  
  // Visual: recording state
  btn.style.background = 'linear-gradient(135deg,#e74c3c,#c0392b)';
  btn.style.transform = 'scale(0.96)';
  btn.disabled = true;
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="8"/></svg> Listening...`;
  
  // Use zh-CN so Chrome recognises Chinese words the student tries to say
  startSpeech('zh-CN', async (heard) => {
    if (!heard || !heard.trim()) {
      if (btn) { btn.innerHTML = `${_vtMicSVG()} Respond`; btn.style.background = ''; btn.style.transform = ''; btn.disabled = false; }
      toast('Nothing heard — try again', 'info');
      return;
    }
    
    if (btn) { btn.innerHTML = `${_vtMicSVG()} Thinking...`; }
    
    // Show what student said
    if (log) {
      log.innerHTML = log.innerHTML.replace(/<div style="text-align:center.*?<\/div>/s, '');
      log.innerHTML += `<div style="display:flex;justify-content:flex-end;margin-bottom:8px"><div class="vt-log-bubble-student">${heard}</div></div>`;
      log.scrollTop = log.scrollHeight;
    }
    
    if (!window._vtHistory) window._vtHistory = [];
    window._vtHistory.push({ role: 'user', content: heard });
    
    try {
      const hist = window._vtHistory.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const r = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_K },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: _vtSystemPrompt() },
            ...hist
          ],
          max_tokens: 140, temperature: 0.85
        })
      });
      const d = await r.json();
      const reply = d.choices?.[0]?.message?.content?.trim() || '很好！(Hěn hǎo) You\'re doing great! Try saying it again — you\'re getting it! 💪';
      
      window._vtHistory.push({ role: 'assistant', content: reply });
      
      // Update bubble + log
      const msgEl = document.getElementById('vt-current-msg');
      if (msgEl) { msgEl.textContent = reply; window._vtInitMsg = reply; }
      
      if (log) {
        log.innerHTML += `<div style="display:flex;justify-content:flex-start;margin-bottom:8px"><div class="vt-log-bubble-teacher">${reply}</div></div>`;
        log.scrollTop = log.scrollHeight;
      }
      
      // Speak Emma's reply in both languages
      speakBilingual(reply);
      addXP(20);
    } catch(e) {
      console.error('VT error:', e);
      toast('Connection issue — try again', 'error');
    }
    
    if (btn) { btn.innerHTML = `${_vtMicSVG()} Respond`; btn.style.background = ''; btn.style.transform = ''; btn.disabled = false; }
  }, () => {
    if (btn) { btn.innerHTML = `${_vtMicSVG()} Respond`; btn.style.background = ''; btn.style.transform = ''; btn.disabled = false; }
    toast('Could not hear you — check microphone and try again', 'error');
  });
}

function _vtMicSVG() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>`;
}

function _vtSystemPrompt() {
  const lastMsg = window._vtInitMsg || '';
  return `You are Emma — a warm, funny, and encouraging Chinese teacher for a student named Yasmen who's learning Mandarin.

PERSONALITY:
- Speak like a real human friend, not a robot. Use contractions, natural phrasing.
- React genuinely to what Yasmen says — celebrate wins, laugh a little at mistakes, be real
- Never use stiff phrases like "Certainly!" or "Of course!" or "Great effort!"
- Use casual language: "Oh that was SO close!", "Wait wait wait, did you just say that?!", "Okay I'm impressed!"

TEACHING RULES:
- 75% English, 25% Chinese. Drop Chinese naturally mid-sentence
- ALWAYS put pinyin in parentheses right after Chinese: 你好 (nǐ hǎo)
- ALWAYS translate Chinese immediately after pinyin
- Correct mistakes gently with humor, not lectures
- Keep it SHORT: 2-3 sentences max
- End EVERY message with either a question OR a fun challenge
- React specifically to what they said — don't give generic praise

Your previous message was: "${lastMsg}"

Now respond to the student's latest message. Be real, be warm, be Emma.`;
}
async function vtTypeResponse(text) {
  if (!text) return;
  const field = document.getElementById('vt-type-field');
  if (field) field.value = '';
  const log = document.getElementById('vt-log');
  if (log) {
    log.innerHTML = log.innerHTML.replace(/<div style="text-align:center.*?<\/div>/s, '');
    log.innerHTML += '<div style="display:flex;justify-content:flex-end;margin-bottom:8px"><div class="vt-log-bubble-student">' + text + '</div></div>';
    log.scrollTop = log.scrollHeight;
  }
  if (!window._vtHistory) window._vtHistory = [];
  window._vtHistory.push({ role: 'user', content: text });
  try {
    const hist = window._vtHistory.slice(-10).map(m => ({ role: m.role, content: m.content }));
    const r = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_K },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: _vtSystemPrompt() },
          ...hist
        ],
        max_tokens: 150, temperature: 0.85
      })
    });
    const d = await r.json();
    const reply = d.choices?.[0]?.message?.content?.trim() || '好的！(Hǎo de) Got it! Now your turn — try saying it out loud! 🎤';
    window._vtHistory.push({ role: 'assistant', content: reply });
    if (log) {
      log.innerHTML += '<div style="display:flex;justify-content:flex-start;margin-bottom:8px"><div class="vt-log-bubble-teacher">' + reply + '</div></div>';
      log.scrollTop = log.scrollHeight;
    }
    const msgEl = document.getElementById('vt-current-msg');
    if (msgEl) { msgEl.textContent = reply; window._vtInitMsg = reply; }
    speakBilingual(reply);
    addXP(15);
  } catch(e) { console.error('VT type error:', e); toast('Connection issue — try again', 'error'); }
}


// ══ OVERRIDE: openStory — COLORED WORD CHIPS + SPEAK PRACTICE ══
window.openStory = function(id) {
  const stories = typeof KIDS_STORIES !== 'undefined' ? KIDS_STORIES : [];
  const s = stories[id];
  if (!s) return;
  window._v7StoryIdx = id;
  const titleEl = document.getElementById('story-viewer-title');
  if (titleEl) titleEl.textContent = '';
  const el = document.getElementById('story-viewer-content');
  if (!el) { go('storyviewer'); return; }

  // Extended character dictionary: single chars + common multi-char words
  const CHAR_DICT = {};
  if (typeof ALL_WORDS !== 'undefined') {
    ALL_WORDS.forEach(w => { CHAR_DICT[w.h] = { p: w.p, m: w.m }; });
  }
  // Additional common characters not in HSK lists
  const EXTRA = {'以':'yǐ·with','前':'qián·before','有':'yǒu·have','一':'yī·one','个':'gè·MW','放':'fàng·put','羊':'yáng·sheep','孩':'hái·child','子':'zi·child','每':'měi·every','山':'shān·hill','上':'shàng·on','觉':'jué·feel','无':'wú·none','聊':'liáo·chat','天':'tiān·day','大':'dà·big','喊':'hǎn·shout','狼':'láng·wolf','来':'lái·come','农':'nóng·farm','民':'mín·people','们':'men·plural','跑':'pǎo·run','帮':'bāng·help','忙':'máng·busy','但':'dàn·but','没':'méi·no','哈':'hā·ha','笑':'xiào·laugh','后':'hòu·after','真':'zhēn·real','相':'xiāng·mutual','信':'xìn·believe','兔':'tù·rabbit','跑':'pǎo·run','得':'de·particle','最':'zuì·most','快':'kuài·fast','乌':'wū·black','龟':'guī·tortoise','赛':'sài·race','比':'bǐ·compare','赛':'sài·race','开':'kāi·open','始':'shǐ·begin','极':'jí·extreme','慢':'màn·slow','睡':'shuì·sleep','着':'zhe·particle','步':'bù·step','停':'tíng·stop','赢':'yíng·win','输':'shū·lose','老':'lǎo·old','爷':'yé·grandpa','种':'zhòng·plant','萝':'luó·radish','卜':'bo·radish','长':'zhǎng·grow','拔':'bá·pull','动':'dòng·move','叫':'jiào·call','奶':'nǎi·grandma','起':'qǐ·rise','嗨':'hāi·hey','哟':'yo·particle','狗':'gǒu·dog','猫':'māo·cat','力':'lì·force','终':'zhōng·finally','于':'yú·at','出':'chū·out','马':'mǎ·horse','过':'guò·cross','河':'hé·river','知':'zhī·know','水':'shuǐ·water','深':'shēn·deep','浅':'qiǎn·shallow','牛':'niú·cow','刚':'gāng·just','到':'dào·arrive','小':'xiǎo·small','腿':'tuǐ·leg','松':'sōng·pine','鼠':'shǔ·mouse','淹':'yān·drown','死':'sǐ·die','该':'gāi·should','听':'tīng·listen','谁':'shuí·who','自':'zì·self','己':'jǐ·self','试':'shì·try','猴':'hóu·monkey','晚':'wǎn·night','树':'shù·tree','玩':'wán·play','只':'zhī·MW','看':'kàn·look','井':'jǐng·well','里':'lǐ·inside','掉':'diào·fall','月':'yuè·moon','亮':'liàng·bright','快':'kuài·fast','捞':'lāo·fish out','手':'shǒu·hand','碰':'pèng·touch','见':'jiàn·see','抬':'tái·lift','头':'tóu·head','还':'hái·still','呢':'ne·particle','建':'jiàn·build','房':'fáng·house','草':'cǎo·straw','木':'mù·wood','砖':'zhuān·brick','结':'jié·solid','实':'shí·real','灰':'huī·gray','吹':'chuī·blow','倒':'dǎo·fall','安':'ān·safe','全':'quán·complete','三':'sān·three','猪':'zhū·pig','要':'yào·want'};
  Object.entries(EXTRA).forEach(([k,v]) => {
    if (!CHAR_DICT[k]) { const parts = v.split('·'); CHAR_DICT[k] = { p: parts[0], m: parts[1] || '' }; }
  });

  const slideColors = ['#2980b9','#27ae60','#e67e22','#8e44ad','#c0392b','#16a085','#d4ac0d','#1a5276','#1cb0f6','#58cc02'];
  const spkSVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>`;
  const micSVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/></svg>`;

  // Build annotated characters - EVERY Chinese char gets pinyin + meaning
  const buildSlide = (slide, si) => {
    const text = slide.cn || '';
    const col = slideColors[si % slideColors.length];

    // Tokenize: try 2-char words first, then single chars
    let tokens = [];
    let i = 0;
    while (i < text.length) {
      const c2 = text.slice(i, i+2);
      const c1 = text[i];
      const isChinese = (c) => /[\u4e00-\u9fff]/.test(c);
      if (isChinese(c1)) {
        if (CHAR_DICT[c2]) {
          tokens.push({ text: c2, info: CHAR_DICT[c2], idx: i });
          i += 2;
        } else if (CHAR_DICT[c1]) {
          tokens.push({ text: c1, info: CHAR_DICT[c1], idx: i });
          i += 1;
        } else {
          tokens.push({ text: c1, info: null, idx: i });
          i += 1;
        }
      } else {
        tokens.push({ text: c1, info: null, idx: i });
        i += 1;
      }
    }

    const annotated = tokens.map((t, ti) => {
      if (!/[\u4e00-\u9fff]/.test(t.text)) {
        return `<span style="font-size:18px;color:var(--text2);font-weight:700;margin:0 2px">${t.text}</span>`;
      }
      const tokenCol = slideColors[(ti + si * 3) % slideColors.length];
      const safet = t.text.replace(/'/g,"\\'");
      if (t.info) {
        return `<span class="sw-chip" onclick="event.stopPropagation();speak('${safet}')" title="${t.info.p} — ${t.info.m}" style="border-color:${tokenCol}30;margin:2px 3px">
          <span class="wc" style="color:${tokenCol};font-size:22px">${t.text}</span>
          <span class="wp" style="color:${tokenCol}">${t.info.p}</span>
          <span class="we">${t.info.m}</span>
        </span>`;
      } else {
        return `<span class="sw-chip" onclick="event.stopPropagation();speak('${safet}')" style="border-color:#ddd;margin:2px 3px">
          <span class="wc" style="color:#888;font-size:22px">${t.text}</span>
        </span>`;
      }
    }).join('');

    const safeCN = text.replace(/'/g,"\\'").replace(/"/g,'&quot;');
    const safePY = (slide.py||'').replace(/'/g,"\\'").replace(/"/g,'&quot;');

    return `<div style="background:#fff;border:2px solid #e5e5e5;border-radius:18px;padding:18px;margin-bottom:12px;box-shadow:0 3px 0 #e0e0e0;transition:box-shadow .15s" onmouseenter="this.style.boxShadow='0 5px 0 ${col}40';this.style.borderColor='${col}40'" onmouseleave="this.style.boxShadow='0 3px 0 #e0e0e0';this.style.borderColor='#e5e5e5'">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <div style="width:26px;height:26px;border-radius:50%;background:${col};color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0">${si+1}</div>
        <div style="font-size:10px;font-weight:800;color:#aaa;text-transform:uppercase;letter-spacing:1px">Slide ${si+1} of ${(s.slides||[]).length} · Tap any character 👆</div>
      </div>
      <div style="line-height:3;margin-bottom:14px">${annotated}</div>
      <div style="background:#f0f6ff;border-radius:10px;padding:10px 12px;margin-bottom:12px">
        <div style="font-size:13px;color:#1cb0f6;font-weight:700;margin-bottom:3px">${slide.py||''}</div>
        <div style="font-size:13px;color:#555;font-weight:600">${slide.en||''}</div>
      </div>
      <div style="display:flex;gap:7px">
        <button onclick="speak('${safeCN}');event.stopPropagation()" style="display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:10px;border:2px solid #1cb0f6;background:#dff6ff;color:#0e88c0;font-size:11px;font-weight:800;cursor:pointer;box-shadow:0 2px 0 #0e88c0;font-family:var(--font)">${spkSVG} Listen</button>
        <button onclick="v7StorySpeakPractice('${safeCN}','${safePY}');event.stopPropagation()" style="display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:10px;border:2px solid var(--purple);background:var(--purple-bg);color:var(--purple-d);font-size:11px;font-weight:800;cursor:pointer;box-shadow:0 2px 0 var(--purple-d);font-family:var(--font)">${micSVG} Practice</button>
      </div>
    </div>`;
  };

  // Story color for header
  const headerCol = s.color && s.color.startsWith('var') ? '#58cc02' : (s.color || '#58cc02');
  const storyColMap = {'var(--green)':'#58cc02','var(--blue)':'#1cb0f6','var(--yellow)':'#ffc800','var(--orange)':'#ff9600','var(--pink)':'#ff4b91','var(--purple)':'#8b5cf6','var(--teal)':'#2bb8a4','var(--red)':'#e8192c'};
  const realCol = storyColMap[s.color] || '#58cc02';
  const darkCol = realCol.replace(/^#/, '');

  let h = `<div style="background:${realCol};border-radius:22px;padding:24px;margin-bottom:18px;color:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18)">
    <div style="display:flex;align-items:center;gap:16px">
      <div style="width:60px;height:60px;border-radius:16px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;border:2px solid rgba(255,255,255,.3)">
        ${s.ill ? '' : '📖'}
      </div>
      <div style="flex:1">
        <div style="font-size:22px;font-weight:900;font-family:var(--cn);margin-bottom:2px">${s.cnTitle||s.title}</div>
        <div style="font-size:13px;opacity:.85;font-weight:700;margin-bottom:8px">${s.pyTitle||''} · ${(s.slides||[]).length} slides</div>
        <div style="font-size:13px;opacity:.9">${s.title}</div>
      </div>
    </div>
    <button onclick="v7PlayStory(${id})" style="display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:99px;background:rgba(255,255,255,.25);border:2px solid rgba(255,255,255,.5);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:var(--font);margin-top:14px;box-shadow:0 3px 0 rgba(0,0,0,.15)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play All Slides
    </button>
  </div>
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;padding:10px 14px;background:#f0f0f0;border-radius:12px">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    <span style="font-size:11px;font-weight:800;color:#888">Tap any character to hear it · Every character is annotated with pinyin + meaning</span>
  </div>`;

  (s.slides||[]).forEach((slide, si) => { h += buildSlide(slide, si); });

  if (s.quiz) {
    h += `<div style="background:#fff8dd;border:2px solid #ffc800;border-radius:18px;padding:20px;margin-top:14px;box-shadow:0 3px 0 #e0a800">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <div style="width:36px;height:36px;border-radius:50%;background:#ffc800;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="white"/></svg>
        </div>
        <div style="font-weight:900;font-size:15px;color:#6a4800">Story Quiz</div>
      </div>
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;color:#555">${s.quiz.q}</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${(s.quiz.opts||[]).map(o => `<button onclick="v7StoryQuiz(this,'${o.replace(/'/g,"\\'").replace(/"/g,"'")}','${(s.quiz.a||'').replace(/'/g,"\\'").replace(/"/g,"'")}',${id})" style="padding:12px 16px;border-radius:12px;border:2px solid #e5e5e5;background:#fff;text-align:left;cursor:pointer;font-family:var(--font);font-size:13px;font-weight:700;box-shadow:0 2px 0 #e0e0e0;transition:all .15s">${o}</button>`).join('')}
      </div>
      <div id="sq-result-${id}" style="display:none;margin-top:12px;font-weight:800;font-size:14px;padding:12px;border-radius:10px"></div>
    </div>`;
  }
  el.innerHTML = h;
  go('storyviewer');
};

function v7StoryQuiz(btn, chosen, correct, id) {
  document.querySelectorAll('[onclick*="v7StoryQuiz"]').forEach(b => b.disabled = true);
  const ok = chosen === correct;
  btn.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
  btn.style.background = ok ? 'var(--green-bg)' : 'var(--red-bg)';
  const r = document.getElementById('sq-result-' + id);
  if (r) { r.style.display='block'; r.style.color = ok ? 'var(--green-d)' : 'var(--red-d)'; r.textContent = ok ? 'Correct! Great job!' : 'Not quite. Answer: ' + correct; if(ok) addXP(25); }
}

function v7PlayStory(id) {
  const s = (typeof KIDS_STORIES !== 'undefined' ? KIDS_STORIES : [])[id];
  if (!s) return;
  let i = 0;
  const next = () => { if (i >= (s.slides||[]).length) { toast('Story done! +20 XP', 'success'); addXP(20); return; } speak(s.slides[i].cn); i++; setTimeout(next, 2800); };
  next(); toast('Playing story...', 'info');
}

async function v7StorySpeakPractice(cn, py) {
  speak(cn);
  await new Promise(r => setTimeout(r, 1200));
  toast('Listening...', 'info');
  startSpeech('zh-CN', async (heard) => {
    const analysis = await groqAnalyze(heard, cn, py);
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px';
    d.innerHTML = `<div style="background:var(--card);border:2px solid var(--card-border);border-radius:20px;padding:22px;max-width:400px;width:100%">
      <div style="font-family:var(--cn);font-size:22px;font-weight:900;margin-bottom:8px">${cn}</div>
      <div style="font-size:12px;color:var(--blue);margin-bottom:14px">${py}</div>
      ${analysis}
      <button onclick="this.closest('div[style*=fixed]').remove()" style="width:100%;margin-top:14px;padding:10px;border-radius:11px;border:none;background:var(--green);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:var(--font)">Done</button>
    </div>`;
    document.body.appendChild(d);
    addXP(10);
  });
}

// ══ OVERRIDE: renderExam — REALISTIC HSK EXAM ══
window.renderExam = function(level) {
  const el = document.getElementById('pg-' + level + 'exam');
  if (!el) return;
  const questions = (typeof EXAMS !== 'undefined' && EXAMS[level]) ? EXAMS[level] : [];
  if (!questions.length) { el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--muted)">No questions available yet</div>'; return; }
  const levelMap = { hsk1: { name: 'HSK Level 1', color: '#27ae60' }, hsk2: { name: 'HSK Level 2', color: '#2980b9' }, hsk3: { name: 'HSK Level 3', color: '#8e44ad' }, hsk4: { name: 'HSK Level 4', color: '#c0392b' } };
  const lv = levelMap[level] || { name: 'HSK Exam', color: 'var(--green)' };
  window['_v7exam_' + level] = { q: questions, idx: 0, score: 0, answered: false, start: Date.now(), timer: null };
  const st = window['_v7exam_' + level];
  el.innerHTML = `<div style="padding:32px 36px 48px;max-width:860px">
    <div class="back-row" onclick="go('home')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg><span>Exit Exam</span></div>
    <div style="background:linear-gradient(135deg,${lv.color},${lv.color}cc);border-radius:22px;padding:26px;color:#fff;margin-bottom:22px;text-align:center;box-shadow:0 8px 24px ${lv.color}40">
      <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;opacity:.8;margin-bottom:6px">Official Format</div>
      <div style="font-size:26px;font-weight:900;margin-bottom:6px">${lv.name}</div>
      <div style="font-size:12px;opacity:.85;margin-bottom:14px">${questions.length} Questions · Multiple Choice · Timed</div>
      <div class="exam-timer-badge" style="background:rgba(0,0,0,.2);border:2px solid rgba(255,255,255,.2);color:#fff" id="${level}-etimer">00:00</div>
    </div>
    <div class="hsk-progress-dots" id="${level}-edots">${questions.map((_,i) => `<div class="hsk-dot" id="${level}-edot-${i}"></div>`).join('')}</div>
    <div id="${level}-eqarea"></div>
  </div>`;
  document.getElementById(level + '-edot-0')?.classList.add('current');
  st.timer = setInterval(() => {
    const e = Math.floor((Date.now() - st.start) / 1000);
    const t = document.getElementById(level + '-etimer');
    if (t) t.textContent = String(Math.floor(e/60)).padStart(2,'0') + ':' + String(e%60).padStart(2,'0');
  }, 1000);
  v7ExamQuestion(level);
};

function v7ExamQuestion(level) {
  const st = window['_v7exam_' + level];
  if (!st) return;
  if (st.idx >= st.q.length) { v7ExamResult(level); return; }
  const q = st.q[st.idx];
  const area = document.getElementById(level + '-eqarea');
  if (!area) return;
  st.answered = false;
  area.innerHTML = `<div style="background:var(--card);border:2px solid var(--card-border);border-radius:18px;padding:22px;margin-bottom:14px;box-shadow:var(--card-shadow)">
    <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:18px">
      <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--blue-d));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;flex-shrink:0">${st.idx+1}</div>
      <div style="font-size:15px;font-weight:800;flex:1">${q.q}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${(q.opts||[]).map((opt,oi) => `<button onclick="v7ExamAnswer('${level}',${oi},${q.a})" id="${level}-eopt-${oi}" style="display:flex;align-items:center;gap:10px;padding:13px 15px;border-radius:13px;border:2px solid var(--card-border);background:var(--card);text-align:left;cursor:pointer;font-family:var(--font);font-size:13px;font-weight:700;transition:all .15s">
        <span style="width:26px;height:26px;border-radius:50%;background:var(--card-border);display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0">${['A','B','C','D'][oi]}</span>
        <span>${opt}</span>
      </button>`).join('')}
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;color:var(--muted);font-size:11px;font-weight:700">
    <span>Question ${st.idx+1} of ${st.q.length}</span><span>Score: ${st.score}/${st.idx}</span>
  </div>`;
}

function v7ExamAnswer(level, chosen, correct) {
  const st = window['_v7exam_' + level];
  if (!st || st.answered) return;
  st.answered = true;
  const ok = chosen === correct;
  if (ok) st.score++;
  (st.q[st.idx].opts||[]).forEach((_,oi) => {
    const b = document.getElementById(level + '-eopt-' + oi);
    if (!b) return;
    b.disabled = true;
    if (oi === correct) { b.style.borderColor='var(--green)'; b.style.background='var(--green-bg)'; b.style.color='var(--green-d)'; }
    else if (oi === chosen && !ok) { b.style.borderColor='var(--red)'; b.style.background='var(--red-bg)'; b.style.color='var(--red-d)'; }
  });
  const dot = document.getElementById(level + '-edot-' + st.idx);
  if (dot) { dot.classList.remove('current'); dot.classList.add(ok ? 'done' : 'wrong'); }
  const nextDot = document.getElementById(level + '-edot-' + (st.idx+1));
  if (nextDot) nextDot.classList.add('current');
  if (ok) toast('Correct!', 'success'); else toast('Incorrect', 'error');
  st.idx++;
  setTimeout(() => v7ExamQuestion(level), 1500);
}

function v7ExamResult(level) {
  const st = window['_v7exam_' + level];
  if (!st) return;
  if (st.timer) clearInterval(st.timer);
  const pct = Math.round(st.score / st.q.length * 100);
  const e = Math.floor((Date.now() - st.start) / 1000);
  const passed = pct >= 60;
  const xp = st.score * 15;
  addXP(xp);
  const area = document.getElementById(level + '-eqarea');
  if (!area) return;
  area.innerHTML = `<div style="text-align:center;padding:30px;background:var(--card);border:2px solid ${passed?'var(--green)':'var(--red)'};border-radius:22px;box-shadow:var(--card-shadow)">
    <div style="font-size:64px;font-weight:900;color:${passed?'var(--green)':'var(--red)'}">${pct}%</div>
    <div style="font-size:22px;font-weight:900;margin:6px 0;color:${passed?'var(--green-d)':'var(--red-d)'}">${passed ? 'PASSED' : 'NOT PASSED'}</div>
    <div style="color:var(--text2);margin-bottom:18px">${st.score} / ${st.q.length} correct · ${Math.floor(e/60)}m ${e%60}s</div>
    <div style="background:${passed?'var(--green-bg)':'var(--red-bg)'};border-radius:13px;padding:14px;margin-bottom:18px;font-size:13px;color:var(--text2)">
      ${passed ? 'Congratulations! You demonstrated proficiency at this level. Keep going!' : 'Keep studying! Review vocabulary and grammar, then try again. You can do it!'}
    </div>
    <div style="background:var(--yellow-bg);border:2px solid var(--yellow);border-radius:13px;padding:12px;margin-bottom:20px;font-weight:800;color:var(--yellow-d)">+${xp} XP earned!</div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button onclick="renderExam('${level}')" style="padding:11px 22px;border-radius:13px;border:none;background:var(--green);color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:var(--font)">Try Again</button>
      <button onclick="go('home')" style="padding:11px 22px;border-radius:13px;border:2px solid var(--card-border);background:var(--card);color:var(--text);font-size:13px;font-weight:800;cursor:pointer;font-family:var(--font)">Home</button>
    </div>
  </div>`;
}

// ══ OVERRIDE: openLesson — ALL UNLOCKED ══
const _v7_origOpenLesson = typeof openLesson === 'function' ? openLesson : null;
window.openLesson = function(unitIdx, lessonIdx) {
  const units = typeof UNITS !== 'undefined' ? UNITS : [];
  const u = units[unitIdx];
  if (!u) { console.warn('[HanyuStar] Unit not found:', unitIdx); return; }
  const l = u.lessons ? u.lessons[lessonIdx] : null;
  if (!l) { console.warn('[HanyuStar] Lesson not found:', lessonIdx); return; }
  // Set on window AND on local scope variables
  window.curLessonUnit = u;
  window.curLessonLesson = l;
  curLessonUnit = u;
  curLessonLesson = l;
  const t = document.getElementById('lesson-title');
  if (t) t.textContent = l.title;
  // Navigate to lesson page first
  go('lesson');
  // Then render content (go() may update nav but not the lesson body)
  if (window._renderLessonNow) {
    window._renderLessonNow();
  } else if (typeof renderLessonContent === 'function') {
    renderLessonContent();
  }
};

// ══ UPGRADE: renderLearn — FUN DUOLINGO-STYLE PATH + ALL UNLOCKED ══
const _v7_origRenderLearn = typeof renderLearn === 'function' ? renderLearn : null;
window.renderLearn = function() {
  const el = document.getElementById('learn-content');
  if (!el) return;
  const units = typeof UNITS !== 'undefined' ? UNITS : [];

  // Progress header
  const totalLessons = units.reduce((a, u) => a + u.lessons.length, 0);
  const doneLessons = Object.keys(db.done || {}).length;
  const overallPct = totalLessons ? Math.round(doneLessons / totalLessons * 100) : 0;

  const unitThemes = [
    { bg: '#58cc02', shadow: '#2e8f00', light: '#e5f9cc', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`, label: 'Start Here', desc: 'First words & greetings' },
    { bg: '#1cb0f6', shadow: '#0a7fb5', light: '#d9f3fd', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`, label: 'People & Places', desc: 'Family, introductions' },
    { bg: '#ff9600', shadow: '#c06500', light: '#fff0cc', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`, label: 'Daily Life', desc: 'Time, weather, colors' },
    { bg: '#8b5cf6', shadow: '#5b2fb5', light: '#ede8ff', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`, label: 'Food & Drink', desc: 'Restaurants, cuisine' },
    { bg: '#ff4b91', shadow: '#c0005e', light: '#ffe0ef', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`, label: 'Getting Around', desc: 'Transport, directions' },
    { bg: '#2bb8a4', shadow: '#1a8070', light: '#d5f5f0', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`, label: 'Feelings & Life', desc: 'Emotions, hobbies' },
    { bg: '#ffc800', shadow: '#a88500', light: '#fff8d9', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`, label: 'At Home', desc: 'Rooms, body, clothing' },
    { bg: '#e8192c', shadow: '#a00010', light: '#ffe0e3', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`, label: 'Can & Will', desc: 'Ability, future plans' },
    { bg: '#6366f1', shadow: '#3730a3', light: '#e9eaff', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="white"/></svg>`, label: 'Past & Future', desc: 'Tense, comparisons' },
    { bg: '#ff6b35', shadow: '#b84000', light: '#ffeee6', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`, label: 'Social Life', desc: 'Parties, sports, travel' },
    { bg: '#a855f7', shadow: '#7e22ce', light: '#f3e8ff', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>`, label: 'Work & Office', desc: 'Professional Chinese' },
    { bg: '#14b8a6', shadow: '#0a7c72', light: '#d0f5f0', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`, label: 'HSK 3 Logic', desc: 'Complex patterns' },
  ];

  let h = `<div style="background:#fff;border:1.5px solid #e5e5e5;border-radius:20px;padding:18px 20px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,.05)">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div>
        <div style="font-size:18px;font-weight:900;color:var(--text)">Your Course Path</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;font-weight:700">${doneLessons} of ${totalLessons} lessons complete</div>
      </div>
      <div style="font-size:22px;font-weight:900;color:var(--green)">${overallPct}%</div>
    </div>
    <div style="background:#e8e8e8;border-radius:99px;height:10px;overflow:hidden">
      <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#58cc02,#78e904);width:${overallPct}%;transition:width .5s"></div>
    </div>
  </div>`;

  units.forEach((u, ui) => {
    const theme = unitThemes[ui % unitThemes.length];
    const done = u.lessons.filter(l => db.done[l.id]).length;
    const total = u.lessons.length;
    const pct = Math.round(done / total * 100);
    const allDone = done === total;

    h += `<div style="background:#fff;border:1.5px solid #e5e5e5;border-radius:22px;margin-bottom:16px;overflow:hidden;box-shadow:0 3px 12px rgba(0,0,0,.06)">
      <div style="background:${theme.bg};padding:18px 20px 16px;position:relative;overflow:hidden">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.1),rgba(0,0,0,.08))"></div>
        <div style="display:flex;align-items:center;gap:14px;position:relative">
          <div style="width:50px;height:50px;border-radius:16px;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${theme.icon}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:16px;font-weight:900;color:#fff">${u.title}</div>
            <div style="font-size:11px;color:rgba(255,255,255,.82);font-weight:700;margin-top:2px">${theme.desc || ''} · ${done}/${total} lessons</div>
            <div style="background:rgba(255,255,255,.28);border-radius:99px;height:5px;overflow:hidden;margin-top:8px">
              <div style="height:100%;background:rgba(255,255,255,.92);border-radius:99px;width:${pct}%;transition:width .5s"></div>
            </div>
          </div>
          ${allDone
            ? `<div style="background:rgba(255,255,255,.25);border:2px solid rgba(255,255,255,.5);border-radius:99px;padding:4px 12px;font-size:11px;font-weight:900;color:#fff;flex-shrink:0">Done!</div>`
            : `<button onclick="startUnitTest(${u.id})" style="background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.4);border-radius:10px;color:#fff;font-size:11px;font-weight:800;cursor:pointer;padding:7px 13px;font-family:var(--font);flex-shrink:0;transition:all .15s" onmouseenter="this.style.background='rgba(255,255,255,.35)'" onmouseleave="this.style.background='rgba(255,255,255,.2)'">Quick Test</button>`
          }
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;padding:16px 18px">`;

    u.lessons.forEach((l, li) => {
      const isDone = !!db.done[l.id];
      const isNext = !isDone && (li === 0 || db.done[u.lessons[li-1]?.id]);
      const isAvail = !isDone && !isNext; // all unlocked but not next

      let bubbleStyle, bubbleShadow, contentHtml;
      if (isDone) {
        bubbleStyle = `background:${theme.bg};border:3px solid ${theme.shadow};box-shadow:0 5px 0 ${theme.shadow};color:#fff`;
        contentHtml = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
      } else if (isNext) {
        bubbleStyle = `background:#fff;border:3px solid ${theme.bg};color:${theme.bg};box-shadow:0 5px 0 ${theme.shadow}`;
        contentHtml = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${theme.bg}" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      } else {
        bubbleStyle = `background:#f8f8f8;border:3px solid #ddd;color:#bbb;box-shadow:0 4px 0 #d0d0d0`;
        contentHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }

      h += `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;width:72px" onclick="openLesson(${ui},${li})" title="${l.title}">
        <div style="${bubbleStyle};width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .15s;position:relative" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform=''">
          ${contentHtml}
          ${isNext ? `<div style="position:absolute;top:-7px;right:-5px;font-size:14px;line-height:1;filter:drop-shadow(0 1px 3px rgba(0,0,0,.3))">✦</div>` : ''}
          ${isDone ? `<div style="position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:#ffc800;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 4px rgba(0,0,0,.2)">★</div>` : ''}
        </div>
        <span style="font-size:10px;font-weight:800;color:${isDone ? theme.bg : isNext ? theme.bg : '#bbb'};text-align:center;line-height:1.2;max-width:72px;word-break:break-word">${l.title}</span>
        <span style="font-size:9px;color:#ccc;font-weight:700">${l.words ? l.words.length : 0}w</span>
      </div>`;
    });

    h += `</div></div>`;
  });

  el.innerHTML = h;
};

// ══ LOGO UPGRADE: already set in HTML v16 ══
(function upgradeLogo() {
  // Logo is already updated in the sidebar HTML - skip override
  return;
  const iconEl = document.querySelector('.sb-logo-icon');
  if (!iconEl) return;
  iconEl.style.cssText = 'width:46px;height:46px;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#e8192c,#c0000f);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid rgba(220,30,30,0.5);box-shadow:0 2px 12px rgba(220,30,30,0.3)';
  iconEl.innerHTML = `<svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Five-pointed star in yellow (like Chinese flag) -->
    <polygon points="20,6 23.5,15.5 34,15.5 25.5,21.5 28.5,31 20,25 11.5,31 14.5,21.5 6,15.5 16.5,15.5" fill="#FFD700" stroke="#e8a000" stroke-width="0.5"/>
    <!-- Chinese character 星 (star) subtly below -->
    <text x="20" y="37" text-anchor="middle" font-family="Noto Sans SC,serif" font-size="7" font-weight="900" fill="rgba(255,255,255,0.6)">星</text>
  </svg>`;
})();

// ─── CHINA HISTORY & FUN FACTS ────────────────────────────────────
const CHINA_DATA = {
  facts: [
    { emoji: "🧱", title: "The Great Wall is NOT visible from space", body: "A popular myth! The Great Wall is only 15–30 feet wide — too narrow to see from orbit. Astronaut Yang Liwei confirmed he couldn't see it from space either." },
    { emoji: "🍜", title: "China invented noodles 4,000 years ago", body: "The oldest noodles ever found (4,000 years old!) were discovered in China in 2005 — made from millet, not wheat. So yes, noodles ARE Chinese." },
    { emoji: "📜", title: "China has the world's longest continuous writing system", body: "Chinese characters have been used for over 3,000 years. Modern characters can still be read from ancient bronze inscriptions — imagine reading 3000-year-old texts!" },
    { emoji: "🧨", title: "China invented gunpowder, paper, printing & compass", body: "These 'Four Great Inventions' (四大发明 sì dà fāmíng) changed the world. China had printing presses 400 years before Gutenberg!" },
    { emoji: "🐼", title: "Giant pandas are a form of Chinese soft power", body: "China lends pandas to countries as diplomatic gifts (熊猫外交 xióngmāo wàijiāo). Every panda alive outside China is technically on loan from Beijing!" },
    { emoji: "🔴", title: "Red = Good Luck (NOT danger!)", body: "In Chinese culture, red (红 hóng) symbolizes luck, joy and prosperity. That's why money gift envelopes (红包 hóngbāo) are red. In the West red = danger, in China red = CELEBRATE!" },
    { emoji: "🏮", title: "The Chinese New Year lasts 15 days", body: "Spring Festival (春节 Chūnjié) is the longest holiday — from New Year's Eve through the Lantern Festival (元宵节 Yuánxiāojié). It involves the world's largest annual human migration!" },
    { emoji: "📱", title: "China has its own internet universe", body: "China has WeChat, Weibo, Baidu, Bilibili, Taobao — alternatives to WhatsApp, Twitter, Google, YouTube, Amazon. It's called the 'Great Firewall' (防火长城 fánghuǒ chángchéng)!" },
    { emoji: "🐉", title: "Dragons in China are GOOD, not evil", body: "Unlike European dragons, Chinese dragons (龙 lóng) represent power, strength, and GOOD LUCK. The emperor was called 'Son of the Dragon'. Being born in the Year of the Dragon is considered very lucky!" },
    { emoji: "🎋", title: "Chopsticks are used by 1.5 billion people daily", body: "Chopsticks (筷子 kuàizi) have been used for at least 3,000 years. Never stick them upright in rice (looks like incense at a funeral!) or pass food chopstick-to-chopstick." },
    { emoji: "🌍", title: "China has 1 time zone despite being huge", body: "The USA has 4 time zones, China has just 1 (Beijing Time). In western Xinjiang, the sun can rise at 10am! This is for political unity — everyone follows Beijing." },
    { emoji: "🎮", title: "China is the world's biggest gaming market", body: "With 700+ million gamers, China dominates global gaming. Honor of Kings (王者荣耀) has more daily players than the entire US population! Gaming culture is huge." },
    { emoji: "💸", title: "China invented paper money 1,000 years ago", body: "The first banknotes (交子 jiāozi) appeared in Sichuan during the Song Dynasty (~1000 CE). Europe was still hundreds of years away from this concept!" },
    { emoji: "☕", title: "Tea (茶 chá) was discovered in China ca. 2700 BCE", body: "Legend says Emperor Shennong discovered tea when leaves blew into his boiling water. The word 'tea' in most languages comes from Chinese — either chá (Mandarin) or tê (Fujianese)!" },
    { emoji: "🏙️", title: "China has 100+ cities with over 1 million people", body: "For comparison, the entire USA has about 10 cities that size! Cities like Chongqing have populations larger than most European countries. China is massively urbanized." },
  ],
  history: [
    { emoji: "👑", title: "Xia Dynasty — The Mythical Beginning (2100–1600 BCE)", body: "China's first dynasty is semi-legendary. Emperor Yu the Great supposedly tamed floods and founded the dynasty. Historical evidence is sparse but cultural memory runs deep." },
    { emoji: "🏺", title: "Shang Dynasty — Bronze Age & Oracle Bones (1600–1046 BCE)", body: "The Shang left behind oracle bones (甲骨文 jiǎgǔwén) — the earliest form of Chinese writing! Priests carved questions on bones and heated them, reading the cracks as divine answers." },
    { emoji: "🎓", title: "Confucius (孔子 Kǒngzǐ) — 551–479 BCE", body: "The philosopher Confucius shaped Chinese civilization for 2,500+ years. His ideas about respect, education, and social harmony still influence Chinese culture, families, and governance today." },
    { emoji: "🌐", title: "Qin Dynasty — China Unified (221–206 BCE)", body: "Emperor Qin Shi Huang unified China for the first time, standardized writing, currency, and weights. He also built the Terracotta Army (兵马俑) — 8,000+ life-size clay soldiers!" },
    { emoji: "🛣️", title: "Han Dynasty — The Silk Road (206 BCE – 220 CE)", body: "The Silk Road (丝绸之路 Sīchóu zhīlù) connected China to Rome, trading silk, spices, and ideas. Chinese people still call themselves 'people of Han' (汉族 Hànzú) today!" },
    { emoji: "🖌️", title: "Tang Dynasty — China's Golden Age (618–907 CE)", body: "The Tang Dynasty was China at its most cosmopolitan — poetry, painting, and Buddhism flourished. The capital Chang'an (modern Xi'an) was the world's largest city with 1 million people." },
    { emoji: "🏯", title: "Song Dynasty — Invention Explosion (960–1279 CE)", body: "The Song saw gunpowder weapons, printing presses, paper money, and the compass. China was the world's most advanced civilization while Europe was in the 'Dark Ages'." },
    { emoji: "🏹", title: "Mongol Yuan Dynasty (1271–1368 CE)", body: "Kublai Khan conquered China and founded the Yuan Dynasty. Marco Polo visited and was astonished — his accounts of China's wealth were so amazing, Europeans didn't believe him!" },
    { emoji: "🚢", title: "Ming Dynasty — Forbidden City & Voyages (1368–1644 CE)", body: "Admiral Zheng He led 7 massive naval expeditions reaching Africa — 80 years before Columbus! The Forbidden City (故宫 Gùgōng) in Beijing was built during Ming and still stands today." },
    { emoji: "🐯", title: "Qing Dynasty — The Last Empire (1644–1912 CE)", body: "The Manchu Qing Dynasty was China's last. It peaked in the 18th century but weakened after conflicts with European powers. It ended when the Republic of China was established in 1912." },
    { emoji: "⭐", title: "People's Republic of China Founded (1949)", body: "On October 1, 1949, Mao Zedong declared the PRC (中华人民共和国) in Tiananmen Square. This date is National Day (国庆节 Guóqìng Jié) — one of China's biggest holidays!" },
    { emoji: "🚀", title: "China's Modern Rise (1978–now)", body: "Deng Xiaoping's 'Reform and Opening Up' (改革开放 gǎigé kāifàng) transformed China from poor to the world's 2nd largest economy in just 40 years — the fastest economic rise in human history." },
  ],
  culture: [
    { emoji: "🌸", title: "Face (面子 miànzi) — More Than Pride", body: "'Face' (面子 miànzi) is one of the most important concepts in Chinese society. It's social currency — your reputation in others' eyes. Never embarrass someone publicly; that's 'losing face' (丢面子)." },
    { emoji: "🎎", title: "Filial Piety (孝 xiào) — Respect for Parents", body: "Confucius placed filial piety (孝 xiào) at the core of ethics. Caring for elderly parents is a duty, not a choice. China actually has LAWS requiring adults to visit their elderly parents!" },
    { emoji: "🔢", title: "8 is Lucky, 4 is Unlucky", body: "8 (八 bā) sounds like 'prosper' (发 fā) — so it's extremely lucky! The 2008 Olympics opening was on 8/8/08 at 8:08pm. 4 (四 sì) sounds like 'death' (死 sǐ) — many buildings skip the 4th floor!" },
    { emoji: "🎁", title: "Gifting Etiquette is Complex", body: "Never give: clocks (sounds like 'attending a funeral'), umbrellas (散 = separation), pears (梨 lí = separation), or shoes (鞋 xié = evil). Always give gifts in pairs and in red wrapping!" },
    { emoji: "🍵", title: "Tea Culture (茶文化 chá wénhuà)", body: "Tea is deeply cultural — pouring tea for elders shows respect. Tapping two fingers on the table means 'thank you' — from a story about a disguised emperor! Gongfu tea ceremony is an art form." },
    { emoji: "🎵", title: "Chinese Opera (京剧 Jīngjù)", body: "Peking Opera combines singing, music, acting, acrobatics and martial arts. The elaborate face paint tells you personality — red = loyal, white = treacherous, black = brave. Training takes years." },
    { emoji: "🧧", title: "Red Envelopes (红包 hóngbāo)", body: "Giving money in red envelopes at New Year and weddings brings luck. WeChat digitized this — on Chinese New Year's Eve 2019, over 823 million digital red envelopes were sent in ONE DAY!" },
    { emoji: "🎪", title: "Chinese Zodiac (生肖 shēngxiào)", body: "12 animals on a 12-year cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig. Your own zodiac year is actually considered UNLUCKY — you've 'offended' the Jade Emperor!" },
    { emoji: "⚡", title: "KTV (Karaoke) Culture", body: "China is OBSESSED with KTV (karaoke bars). Private rooms for groups are everywhere. It's a serious social activity — office parties, friend hangouts, and even business meetings happen over karaoke!" },
    { emoji: "🦁", title: "Lion Dances (舞狮 wǔshī)", body: "Lion dances at festivals and celebrations ward off evil spirits. The loud firecrackers frighten bad luck away. Two performers operate one lion — front does the head, back does the body." },
  ],
  language: [
    { emoji: "🔤", title: "Mandarin has 4 tones (+ a neutral)", body: "The SAME syllable 'ma' means 4 different things: mā (妈) = mom, má (麻) = hemp, mǎ (马) = horse, mà (骂) = scold. Mess up your tones and you might call your mom a horse! 😂" },
    { emoji: "📊", title: "Mandarin is the #1 most spoken language in the world", body: "With ~1.1 billion native speakers, Mandarin (普通话 pǔtōnghuā) beats Spanish and English for native speakers. It's also one of the 6 official UN languages!" },
    { emoji: "✍️", title: "There are ~50,000 Chinese characters", body: "A literate adult knows ~3,500–4,000. A scholar might know 10,000. The most complex character (biáng) has 57 strokes and isn't even in standard dictionaries. It's the name of a noodle dish!" },
    { emoji: "🔄", title: "Simplified vs. Traditional Characters", body: "Mainland China uses Simplified (简体字 jiǎntǐzì) — streamlined in the 1950s. Taiwan and Hong Kong use Traditional (繁體字 fántǐzì). Same language, different scripts. Like British vs. American English, but more extreme." },
    { emoji: "😂", title: "Chinese Internet Slang is wild", body: "886 (bābā liù) = bye bye! 666 = 'awesome!' (from gaming). 233 = LOL (from a meme face). 我太难了 = 'I'm struggling'. YYDS (永远的神) = 'GOAT/legend'. The internet invented its own Chinese!" },
    { emoji: "🈯", title: "Characters are meaning-based, not sound-based", body: "Unlike alphabets, Chinese characters represent MEANINGS. 日 = sun/day, 月 = moon/month. Combine them: 明 (bright) = sun + moon! Radicals (部首) are building blocks of characters." },
    { emoji: "🌍", title: "Chinese has 7+ major dialect groups", body: "Mandarin, Cantonese, Shanghainese, Hokkien, Hakka... these are mutually unintelligible — like Spanish vs. Romanian. But they all SHARE the same writing system! A marvel of linguistic unity." },
    { emoji: "🎵", title: "Poetry is central to Chinese culture", body: "China has a 3,000-year poetry tradition. Knowing famous Tang poems (唐诗) is considered educated and cultured. Even modern Chinese people quote ancient poems casually in conversation!" },
    { emoji: "💬", title: "Chengyu (成语) — 4-Character Wisdom", body: "Chengyu are 4-character idioms packed with historical stories. 马到成功 (mǎ dào chéng gōng) = 'immediate success'. 一石二鸟 (yī shí èr niǎo) = 'kill two birds with one stone'. Using these makes you sound scholarly!" },
  ],
  food: [
    { emoji: "🥟", title: "Dumplings (饺子 jiǎozi) on New Year", body: "Eating dumplings on New Year's Eve is tradition in Northern China — they're shaped like ancient gold ingots for prosperity. Sometimes a coin is hidden inside; finding it means good luck all year!" },
    { emoji: "🍱", title: "China's 8 Major Cuisine Schools", body: "Cantonese (mild, seafood), Sichuan (numbing-spicy 麻辣 málà), Hunan (smoky-spicy), Beijing (roasted), Shanghai (sweet), Jiangsu, Zhejiang, Fujian. Each region has completely different flavors!" },
    { emoji: "🌶️", title: "Sichuan Peppercorn causes mouth numbness", body: "The 'mala' (麻辣 málà) flavor = numbing (麻 má) + spicy (辣 là). Sichuan peppercorns create a tingly electric numbness unlike anything else. It literally anesthetizes your tongue!" },
    { emoji: "🦆", title: "Peking Duck is 600+ years old", body: "北京烤鸭 (Běijīng kǎoyā) dates to the Ming Dynasty. It's carved tableside, eaten in thin pancakes with hoisin sauce, cucumber, and scallions. A proper Peking duck meal uses the whole duck in 3 courses!" },
    { emoji: "🥢", title: "Hot Pot (火锅 huǒguō) is a social event", body: "Hot pot is NOT just food — it's a social ritual. A pot of boiling broth at the table, everyone dips raw ingredients together. In Chongqing, the broth is so spicy it makes people cry. And they LOVE it." },
    { emoji: "🎂", title: "Birthday = Longevity Noodles, Not Cake", body: "Traditional Chinese birthday food is 长寿面 (chángshòu miàn) — longevity noodles. They must be eaten without cutting — the longer the noodle, the longer your life! Cake is a modern Western import." },
    { emoji: "🍵", title: "Dim Sum (点心 diǎnxīn) culture", body: "Dim sum started as small snacks with tea in Cantonese tea houses. Today it's a weekend family tradition — carts of steamed buns, dumplings, tarts. 'Yum cha' (饮茶) means 'drink tea' but implies the whole dim sum experience." },
    { emoji: "🌰", title: "Street Food Culture (小吃 xiǎochī)", body: "China's street food game is incredible: stinky tofu (臭豆腐), lamb skewers (羊肉串), egg tarts, sugar-coated tanghulu. Night markets (夜市 yèshì) are a whole cultural experience you MUST try!" },
    { emoji: "🍜", title: "Rice in the South, Wheat in the North", body: "China is divided by food culture: South = rice (稻米 dàomǐ), North = wheat (小麦 xiǎomài) = noodles, dumplings, bread. This reflects ancient farming geography. Don't order rice in Xi'an — get noodles!" },
  ],
  tech: [
    { emoji: "🏙️", title: "China has the world's fastest trains", body: "China's High Speed Rail (高铁 gāotiě) network is the world's largest — 40,000+ km! The fastest service reaches 350 km/h. Beijing to Shanghai (1,300 km) takes just 4.5 hours!" },
    { emoji: "📲", title: "WeChat does EVERYTHING", body: "WeChat (微信 Wēixìn) is not just messaging — it's payments, food delivery, government services, ride hailing, e-commerce, social media, video calls, all in ONE app. China is genuinely cashless because of it." },
    { emoji: "🤖", title: "China is a global AI powerhouse", body: "China produces more AI patents than any country. Companies like Baidu, Alibaba, Tencent rival Silicon Valley. DeepSeek (深度求索) made global waves in 2025! China's goal: AI world leadership by 2030." },
    { emoji: "🚗", title: "China dominates electric vehicles", body: "China makes and buys more EVs than the rest of the world combined. BYD (比亚迪) overtook Tesla as the #1 EV seller globally. China has 10 million+ EV charging stations. The EV revolution starts here." },
    { emoji: "🌌", title: "China's Space Program is ambitious", body: "China has its own space station (天宫 Tiāngōng — 'Heavenly Palace'), landed rovers on the Moon's far side (first ever!) and Mars, and aims to land humans on the Moon by 2030." },
    { emoji: "🏗️", title: "China builds entire cities in months", body: "China's construction speed is legendary. It built a 57-story skyscraper in 19 days. During COVID, it built a 1,000-bed hospital in 10 days. Entire new cities like Xiong'an are being built from scratch." },
    { emoji: "📦", title: "Alibaba's Singles Day > Black Friday + Cyber Monday", body: "11/11 (光棍节 — 'Singles Day') is the world's biggest shopping event. In 2022: $84 billion in sales in 24 hours. Black Friday + Cyber Monday combined = about $20 billion. China shops at another level." },
    { emoji: "🎬", title: "China is the world's biggest movie market (sometimes)", body: "China has surpassed the US box office multiple times. But Hollywood films need approval — and many get banned or edited. Chinese blockbusters like Wolf Warrior (战狼) are becoming global hits." },
    { emoji: "🧬", title: "China leads in quantum computing & 5G", body: "China has the world's most powerful quantum computer (Zuchongzhi) and deployed 5G faster than any country. Over 1 million 5G base stations by 2022. Part of China's tech independence strategy." },
  ]
};
let currentChinaTab = 'facts';

function chinaTab(tab, btn) {
  currentChinaTab = tab;
  document.querySelectorAll('#china-tabs .tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderChinaContent();
}

function renderChinaHistory() {
  currentChinaTab = 'facts';
  // Reset tab buttons
  const tabs = document.querySelectorAll('#china-tabs .tab');
  tabs.forEach((t, i) => t.classList.toggle('active', i === 0));
  renderChinaContent();
}

function renderChinaContent() {
  const el = document.getElementById('china-content');
  if (!el) return;
  const items = CHINA_DATA[currentChinaTab] || [];
  // Map of tab -> color palette
  const tabColors = {
    facts: ['#e8192c','#1cb0f6','#58cc02','#ff9600','#8b5cf6','#2bb8a4','#ffc800','#ff4b4b','#3d9900','#0f8fc7','#6931b6','#ff6b00','#229d8b','#b9770e','#1a5276'],
    history: ['#8b5cf6','#e8192c','#1cb0f6','#58cc02','#ff9600','#2bb8a4','#ffc800','#ff4b4b','#3d9900'],
    culture: ['#ff9600','#e8192c','#ffc800','#1cb0f6','#2bb8a4','#8b5cf6','#ff4b4b','#58cc02','#ff6b00','#e8192c'],
    language: ['#1cb0f6','#8b5cf6','#58cc02','#ff9600','#2bb8a4','#ffc800','#e8192c','#ff4b4b','#3d9900'],
    food: ['#ff9600','#e8192c','#ffc800','#58cc02','#1cb0f6','#8b5cf6','#2bb8a4'],
    tech: ['#1cb0f6','#8b5cf6','#58cc02','#ff9600','#2bb8a4']
  };
  const colors = tabColors[currentChinaTab] || tabColors.facts;

  // Tab header visuals
  const tabVisuals = {
    facts: {banner:'linear-gradient(135deg,#e8192c,#ff6b35)', icon:'🐉', title:'Amazing Fun Facts', subtitle:'Discover the wonders of China'},
    history: {banner:'linear-gradient(135deg,#4a148c,#7b1fa2)', icon:'👑', title:'5,000 Years of History', subtitle:'From ancient dynasties to modern power'},
    culture: {banner:'linear-gradient(135deg,#e65100,#ff8f00)', icon:'🏮', title:'Rich Cultural Traditions', subtitle:'Customs, arts, and celebrations'},
    language: {banner:'linear-gradient(135deg,#0277bd,#01579b)', icon:'📖', title:'The Language of China', subtitle:'Characters, tones, and dialects'},
    food: {banner:'linear-gradient(135deg,#2e7d32,#388e3c)', icon:'🥟', title:'Chinese Cuisine', subtitle:'The world\'s most diverse food culture'},
    tech: {banner:'linear-gradient(135deg,#1565c0,#0d47a1)', icon:'🤖', title:'Modern China & Tech', subtitle:'The future is being built here'},
  };
  const vis = tabVisuals[currentChinaTab] || tabVisuals.facts;

  let html = `<div style="background:${vis.banner};border-radius:20px;padding:20px 22px;margin-bottom:18px;color:#fff;box-shadow:0 5px 0 rgba(0,0,0,.15);display:flex;align-items:center;gap:16px">
    <div style="font-size:48px;flex-shrink:0">${vis.icon}</div>
    <div>
      <div style="font-size:20px;font-weight:900;margin-bottom:2px">${vis.title}</div>
      <div style="font-size:13px;opacity:.85">${vis.subtitle}</div>
      <div style="font-size:11px;opacity:.7;margin-top:4px">${items.length} facts to explore</div>
    </div>
  </div>`;

  html += '<div style="display:grid;gap:12px">';
  items.forEach((item, i) => {
    const col = colors[i % colors.length];
    html += `<div style="background:rgba(255,255,255,0.93);border:2px solid ${col}25;border-left:5px solid ${col};border-radius:16px;overflow:hidden;cursor:pointer;transition:all .18s;backdrop-filter:blur(8px)" onmouseenter="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px ${col}30'" onmouseleave="this.style.transform='';this.style.boxShadow=''">
      <div style="display:flex;gap:14px;align-items:flex-start;padding:16px 18px">
        <div style="width:52px;height:52px;border-radius:14px;background:${col}18;border:2px solid ${col}30;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:26px">${item.emoji || '✨'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:900;font-size:15px;color:#222;margin-bottom:6px;line-height:1.3">${item.title}</div>
          <div style="font-size:13.5px;color:#555;line-height:1.7">${item.body}</div>
        </div>
      </div>
      <div style="height:3px;background:linear-gradient(90deg,${col},${col}50,transparent)"></div>
    </div>`;
  });
  html += '</div>';

  // Add visual SVG illustration for history tab
  if (currentChinaTab === 'history') {
    html += `<div style="margin-top:20px;background:linear-gradient(135deg,rgba(74,20,140,0.06),rgba(123,31,162,0.04));border:2px solid rgba(123,31,162,0.15);border-radius:20px;padding:20px;text-align:center">
      <div style="font-size:14px;font-weight:900;color:var(--purple-d);margin-bottom:14px">🏯 Chinese Dynasty Timeline</div>
      <div style="display:flex;gap:0;align-items:stretch;border-radius:10px;overflow:hidden;margin-bottom:8px">
        ${[['Shang','1600 BCE','#c0392b'],['Zhou','1046 BCE','#8e44ad'],['Qin','221 BCE','#2980b9'],['Han','206 BCE','#27ae60'],['Tang','618 CE','#d35400'],['Song','960 CE','#16a085'],['Yuan','1271 CE','#8e44ad'],['Ming','1368 CE','#c0392b'],['Qing','1644 CE','#2c3e50'],['PRC','1949 CE','#e8192c']].map(([name,year,col]) => 
          `<div style="flex:1;background:${col};padding:8px 2px;text-align:center">
            <div style="font-size:10px;font-weight:900;color:#fff">${name}</div>
            <div style="font-size:8px;color:rgba(255,255,255,.75);margin-top:2px">${year}</div>
          </div>`).join('')}
      </div>
      <div style="font-size:11px;color:var(--muted)">4,000+ years of recorded Chinese civilization</div>
    </div>`;
  }
  
  if (currentChinaTab === 'language') {
    html += `<div style="margin-top:20px;background:rgba(28,176,246,0.06);border:2px solid rgba(28,176,246,0.2);border-radius:20px;padding:20px">
      <div style="font-size:14px;font-weight:900;color:var(--blue-d);margin-bottom:14px">🎵 The 4 Tones of Mandarin</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
        ${[['1st','ā','flat','#2980b9'],['2nd','á','rising','#27ae60'],['3rd','ǎ','dip','#8e44ad'],['4th','à','falling','#c0392b']].map(([num,mark,shape,col]) =>
          `<div style="text-align:center;background:${col}12;border:2px solid ${col}30;border-radius:12px;padding:12px 8px">
            <div style="font-size:28px;font-weight:900;color:${col}">${mark}</div>
            <div style="font-size:10px;font-weight:800;color:${col};margin-top:4px">${num} Tone</div>
            <div style="font-size:9px;color:#888;margin-top:2px">${shape}</div>
          </div>`).join('')}
      </div>
      <div style="margin-top:12px;font-size:12px;color:var(--text2);text-align:center">妈 (mā) Mom · 麻 (má) Hemp · 马 (mǎ) Horse · 骂 (mà) Scold</div>
    </div>`;
  }

  el.innerHTML = html;
}

function getChinaIconSVG(i, tab) {
  // Returns SVG path content for varied icons
  const allIcons = [
    // 0 wall/brick
    `<rect x="4" y="10" width="24" height="4" rx="1" fill="currentColor" opacity=".8"/><rect x="4" y="16" width="24" height="4" rx="1" fill="currentColor" opacity=".8"/><rect x="4" y="22" width="24" height="4" rx="1" fill="currentColor" opacity=".8"/><rect x="8" y="6" width="16" height="4" rx="1" fill="currentColor" opacity=".5"/>`,
    // 1 bowl/noodles
    `<path d="M6 14h20c0 5.5-4.5 10-10 10S6 19.5 6 14z" fill="currentColor" opacity=".8"/><path d="M10 14c1-3 2-5 6-5s5 2 6 5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="10" cy="10" r="2" fill="currentColor" opacity=".6"/>`,
    // 2 scroll
    `<path d="M8 4h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="currentColor" opacity=".3"/><line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" stroke-width="2"/><line x1="10" y1="14" x2="22" y2="14" stroke="currentColor" stroke-width="2"/><line x1="10" y1="18" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>`,
    // 3 compass
    `<circle cx="16" cy="16" r="12" fill="currentColor" opacity=".2"/><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2" fill="none"/><polygon points="16,8 18,16 16,14 14,16" fill="currentColor"/><polygon points="16,24 14,16 16,18 18,16" fill="currentColor" opacity=".5"/>`,
    // 4 panda
    `<circle cx="16" cy="18" r="8" fill="currentColor" opacity=".3"/><circle cx="16" cy="18" r="8" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="13" r="3" fill="currentColor" opacity=".8"/><circle cx="20" cy="13" r="3" fill="currentColor" opacity=".8"/><circle cx="14" cy="19" r="2" fill="currentColor" opacity=".6"/><circle cx="18" cy="19" r="2" fill="currentColor" opacity=".6"/>`,
    // 5 lantern
    `<ellipse cx="16" cy="16" rx="8" ry="10" fill="currentColor" opacity=".3"/><ellipse cx="16" cy="16" rx="8" ry="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="16" y1="6" x2="16" y2="4" stroke="currentColor" stroke-width="2"/><line x1="16" y1="26" x2="16" y2="28" stroke="currentColor" stroke-width="2"/><line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" stroke-width="1.5" opacity=".6"/>`,
    // 6 phone/wechat
    `<rect x="8" y="4" width="16" height="24" rx="3" fill="currentColor" opacity=".3"/><rect x="8" y="4" width="16" height="24" rx="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="22" r="2" fill="currentColor"/><rect x="12" y="8" width="8" height="2" rx="1" fill="currentColor" opacity=".6"/>`,
    // 7 dragon
    `<path d="M4 20c2-4 5-6 8-4 2 1 3 3 4 2 2-2 4-6 8-6" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="26" cy="12" r="2" fill="currentColor"/><path d="M23 10l2 2" stroke="currentColor" stroke-width="1.5"/>`,
    // 8 chopsticks
    `<line x1="10" y1="4" x2="14" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="18" y1="4" x2="22" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
    // 9 clock/timezone
    `<circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="16,9 16,16 20,20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
    // 10 game controller
    `<rect x="4" y="10" width="24" height="12" rx="6" fill="currentColor" opacity=".3"/><rect x="4" y="10" width="24" height="12" rx="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="22" cy="15" r="1.5" fill="currentColor"/><path d="M10 13v4m-2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    // 11 coin/money
    `<circle cx="16" cy="16" r="12" fill="currentColor" opacity=".2"/><circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2" fill="none"/><text x="16" y="21" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">¥</text>`,
    // 12 tea leaf
    `<path d="M16 28C16 28 6 22 6 14c0-5.5 4.5-10 10-10s10 4.5 10 10c0 8-10 14-10 14z" fill="currentColor" opacity=".3"/><path d="M16 28C16 28 6 22 6 14c0-5.5 4.5-10 10-10s10 4.5 10 10c0 8-10 14-10 14z" stroke="currentColor" stroke-width="2" fill="none"/>`,
    // 13 city skyline
    `<rect x="4" y="18" width="4" height="10" fill="currentColor" opacity=".8"/><rect x="10" y="12" width="5" height="16" fill="currentColor" opacity=".8"/><rect x="17" y="8" width="6" height="20" fill="currentColor" opacity=".8"/><rect x="25" y="15" width="3" height="13" fill="currentColor" opacity=".8"/><line x1="2" y1="28" x2="30" y2="28" stroke="currentColor" stroke-width="2"/>`,
    // 14 emperor crown
    `<path d="M8 22h16l-2-12-6 6-6-6-2 12z" fill="currentColor" opacity=".6"/><path d="M8 22h16l-2-12-6 6-6-6-2 12z" stroke="currentColor" stroke-width="2" fill="none"/><rect x="6" y="22" width="20" height="3" rx="1.5" fill="currentColor" opacity=".8"/>`,
    // 15 oracle bone
    `<ellipse cx="16" cy="16" rx="10" ry="13" fill="currentColor" opacity=".2"/><ellipse cx="16" cy="16" rx="10" ry="13" stroke="currentColor" stroke-width="2" fill="none"/><line x1="13" y1="10" x2="19" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="13" y1="18" x2="19" y2="18" stroke="currentColor" stroke-width="1.5"/>`,
  ];
  return allIcons[i % allIcons.length];
}


// ─── INIT (deferred to ensure all functions are defined) ──────────
window.addEventListener('load', function() {
  // Ensure variables are synced to window scope
  if (typeof UNITS !== 'undefined') window.UNITS = UNITS;
  if (typeof ALL_WORDS !== 'undefined') window.ALL_WORDS = ALL_WORDS;
  if (typeof db !== 'undefined') window.db = db;
  updXP();
  renderHome();
  checkLogin();
  if (typeof initChat === 'function') initChat();
  
  // ══ MICROPHONE: MOBILE-AWARE, NO REPEATED POPUPS ══
  // SpeechRecognition is desktop-Chrome/Edge only — it does NOT work on phones.
  // For local file:// usage, Chrome cannot persist mic permission between reloads,
  // so we never pre-request it. Instead we request only when the user taps the mic.

  // Detect mobile (phones/tablets that lack SpeechRecognition support)
  window._isMobileBrowser = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  window._hasSpeechAPI = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  window._micPermGranted = false;
  window._micStream = null;

  // _acquireMicStream: only called right before sr.start() — never on page load.
  // This means the browser only prompts ONCE per actual user action, not on every refresh.
  window._acquireMicStream = function() {
    if (window._micStream) return Promise.resolve(window._micStream);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return Promise.reject(new Error('getUserMedia not supported'));
    }
    return navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(function(stream) {
        window._micStream = stream;
        window._micPermGranted = true;
        console.log('[HanyuStar] Mic permission granted ✓');
        return stream;
      });
  };

  // Show one-time mobile notice if on phone — speaking exercises won't work
  if (window._isMobileBrowser && !window._hasSpeechAPI) {
    var _mobileMicNoticeDone = localStorage.getItem('_mobileMicNoticeDone');
    if (!_mobileMicNoticeDone) {
      setTimeout(function() {
        var banner = document.createElement('div');
        banner.id = 'mic-mobile-notice';
        banner.innerHTML = [
          '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">',
          '<span style="font-size:24px">📱</span>',
          '<div style="flex:1;min-width:160px">',
          '<div style="font-weight:900;font-size:14px;margin-bottom:2px">Voice features — desktop only</div>',
          '<div style="font-size:12px;opacity:.85">Speaking exercises use the Web Speech API, which only works in Chrome on desktop. All other features work fine on mobile!</div>',
          '</div>',
          '<button onclick="document.getElementById(\'mic-mobile-notice\').remove();localStorage.setItem(\'_mobileMicNoticeDone\',\'1\')" style="padding:9px 14px;border-radius:12px;border:none;background:rgba(255,255,255,.25);color:#fff;font-weight:900;font-size:13px;cursor:pointer">OK</button>',
          '</div>'
        ].join('');
        banner.style.cssText = [
          'position:fixed',
          'bottom:24px',
          'left:50%',
          'transform:translateX(-50%)',
          'z-index:99999',
          'background:linear-gradient(135deg,#ff9600,#cc7700)',
          'color:#fff',
          'padding:16px 20px',
          'border-radius:20px',
          'box-shadow:0 8px 32px rgba(255,150,0,.4)',
          'max-width:520px',
          'width:calc(100vw - 48px)',
          'font-family:var(--font,sans-serif)'
        ].join(';');
        if (!document.getElementById('_micBannerStyle')) {
          var st = document.createElement('style');
          st.id = '_micBannerStyle';
          st.textContent = '@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(30px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
          document.head.appendChild(st);
        }
        document.body.appendChild(banner);
      }, 2000);
    }
  }
  // No pre-request of mic on page load — permission is only asked when user taps 🎤
});


// ══ REMOVE EMOJIS FROM NAV ══
(function removeNavEmojis() {
  document.querySelectorAll('.sb-item').forEach(item => {
    const spans = item.querySelectorAll('span');
    spans.forEach(s => {
      if (s.textContent.match(/^[\u{1F000}-\u{1FFFF}]$/u) || s.textContent.match(/^[\u{2600}-\u{27BF}]$/u)) {
        s.style.fontSize = '0';
        s.style.display = 'none';
      }
    });
  });
})();

// AI Teacher chips are now built into initChat directly

// ══ ENSURE DB HAS unlocked flag ══
(function initV7DB() {
  if (typeof db !== 'undefined' && typeof saveDB === 'function') {
    if (!db.v7unlocked) { db.v7unlocked = true; saveDB(); }
  }
  console.log('[HanyuStar v7] Upgrade loaded successfully!');
})();

// ══ HSK EXAM IMPROVEMENTS ══
(function enhanceHSK() {
  // Override HSK exam with more realistic format
  const origRenderHSK = window.renderHSK;
  
  // Official HSK timing per section
  window.HSK_CONFIG = {
    1: { listening: 15, reading: 20, total: 35 },
    2: { listening: 25, reading: 25, total: 50 },
    3: { listening: 35, reading: 30, writing: 15, total: 85 },
    4: { listening: 45, reading: 45, writing: 15, total: 105 },
    5: { listening: 45, reading: 45, writing: 25, total: 125 },
    6: { listening: 50, reading: 50, writing: 45, total: 145 }
  };
  
  window.HSK_PASS_SCORE = { 1: 120, 2: 120, 3: 180, 4: 180, 5: 180, 6: 180 };
  window.HSK_MAX_SCORE = { 1: 200, 2: 200, 3: 300, 4: 300, 5: 300, 6: 300 };
})();

// ══ ENHANCED SPEAKING ANALYSIS ══
async function analyzeSpeechDetailed(spokenText, targetText, targetPinyin) {
  // Word-by-word comparison
  const spokenWords = spokenText.toLowerCase().trim().split(/\s+/);
  const targetWords = targetText.split(/[\s,。！？、]+/).filter(w => w.length > 0);
  
  // Try Groq for detailed analysis
  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `You are a Chinese language teacher. Analyze this pronunciation attempt. Respond ONLY in raw JSON (no markdown, no backticks):
{"overall_score":85,"pronunciation_accuracy":80,"fluency_score":90,"tone_accuracy":75,"word_analysis":[{"word":"你好","pinyin":"nǐ hǎo","student_attempt":"ni hao","correct":true,"score":90,"tip":"Good! Tones are correct"}],"overall_feedback":"Great attempt!","level":"B1","encouragement":"Keep practicing!"}

Target Chinese: ${targetText}
Target Pinyin: ${targetPinyin || ''}
Student said (speech-to-text): ${spokenText}`
        }]
      })
    });
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '';
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch(e) {
    // Fallback: simple matching
    const overallScore = spokenText.length > 0 ? Math.min(95, Math.max(40, 
      Math.round((spokenWords.filter(w => targetText.toLowerCase().includes(w)).length / Math.max(spokenWords.length, 1)) * 100)
    )) : 0;
    return {
      overall_score: overallScore,
      pronunciation_accuracy: overallScore,
      fluency_score: Math.min(100, overallScore + 5),
      tone_accuracy: Math.max(30, overallScore - 10),
      word_analysis: targetWords.slice(0, 4).map(w => ({
        word: w,
        pinyin: '',
        student_attempt: spokenText.includes(w) ? w : '?',
        correct: spokenText.includes(w),
        score: spokenText.includes(w) ? 90 : 40,
        tip: spokenText.includes(w) ? 'Good!' : 'Practice this word'
      })),
      overall_feedback: overallScore >= 70 ? 'Good attempt! Keep practicing.' : 'Keep practicing — focus on tones!',
      level: overallScore >= 80 ? 'B1' : overallScore >= 60 ? 'A2' : 'A1',
      encouragement: 'Every practice session improves your Chinese!'
    };
  }
}

function showDetailedSpeakResult(analysis, targetText) {
  const scoreColor = analysis.overall_score >= 80 ? '#58cc02' : analysis.overall_score >= 60 ? '#ffc800' : '#ff4b4b';
  const scoreGrade = analysis.overall_score >= 90 ? 'Excellent!' : analysis.overall_score >= 80 ? 'Great!' : analysis.overall_score >= 70 ? 'Good' : analysis.overall_score >= 60 ? 'Keep Going!' : 'Practice More';
  
  const wordHTML = (analysis.word_analysis || []).map(w => `
    <div style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:${w.correct ? '#e0f7cc' : '#ffe0e0'};border:1.5px solid ${w.correct ? '#58cc02' : '#ff4b4b'};margin-bottom:6px">
      <div style="width:36px;height:36px;border-radius:50%;background:${w.correct ? '#58cc02' : '#ff4b4b'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0">${w.score || 0}%</div>
      <div style="flex:1">
        <div style="font-family:var(--cn);font-size:20px;font-weight:900;color:var(--text)">${w.word}</div>
        <div style="font-size:12px;color:#888;font-weight:700">${w.pinyin || ''}</div>
        ${w.tip ? `<div style="font-size:11px;color:${w.correct ? '#3d9900' : '#cc2020'};margin-top:2px">${w.tip}</div>` : ''}
      </div>
      <div style="font-size:20px">${w.correct ? '✓' : '✗'}</div>
    </div>
  `).join('');

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px;backdrop-filter:blur(4px)';
  overlay.innerHTML = `
    <div style="background:var(--card);border:2px solid var(--card-border);border-radius:24px;padding:24px;max-width:440px;width:100%;max-height:90vh;overflow-y:auto">
      <div style="text-align:center;margin-bottom:20px">
        <div style="width:90px;height:90px;border-radius:50%;background:${scoreColor};color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;margin:0 auto 10px;box-shadow:0 6px 0 ${scoreColor}80">${analysis.overall_score}%</div>
        <div style="font-size:22px;font-weight:900;color:${scoreColor}">${scoreGrade}</div>
        <div style="font-size:13px;color:var(--text2);margin-top:4px">${analysis.overall_feedback || ''}</div>
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:18px">
        <div style="background:rgba(28,176,246,0.1);border:1.5px solid #1cb0f680;border-radius:12px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:900;color:#1cb0f6">${analysis.pronunciation_accuracy || analysis.overall_score}%</div>
          <div style="font-size:10px;font-weight:800;color:var(--muted);text-transform:uppercase">Pronunciation</div>
        </div>
        <div style="background:rgba(88,204,2,0.1);border:1.5px solid #58cc0280;border-radius:12px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:900;color:#58cc02">${analysis.tone_accuracy || Math.max(40, analysis.overall_score - 10)}%</div>
          <div style="font-size:10px;font-weight:800;color:var(--muted);text-transform:uppercase">Tones</div>
        </div>
        <div style="background:rgba(255,200,0,0.1);border:1.5px solid #ffc80080;border-radius:12px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:900;color:#ffc800">${analysis.fluency_score || analysis.overall_score}%</div>
          <div style="font-size:10px;font-weight:800;color:var(--muted);text-transform:uppercase">Fluency</div>
        </div>
      </div>
      
      ${(analysis.word_analysis || []).length > 0 ? `
        <div style="font-size:12px;font-weight:900;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Word by Word</div>
        ${wordHTML}
      ` : ''}
      
      <div style="background:rgba(255,215,0,0.1);border:1.5px solid rgba(255,215,0,0.3);border-radius:12px;padding:12px;margin-top:14px;font-size:13px;color:var(--text2);font-weight:600">
        ${analysis.encouragement || 'Keep practicing your Chinese!'}
      </div>
      
      <div style="display:flex;gap:10px;margin-top:16px">
        <button onclick="this.closest('[style*=position\:fixed]').remove()" style="flex:1;padding:12px;border-radius:12px;background:var(--card);border:2px solid var(--card-border);font-weight:800;cursor:pointer;font-family:var(--font);color:var(--text)">Close</button>
        <button onclick="speak('${targetText.replace(/'/g,"\'")}');event.stopPropagation()" style="flex:1;padding:12px;border-radius:12px;background:#1cb0f6;color:#fff;border:none;font-weight:800;cursor:pointer;font-family:var(--font)">Listen Again</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

// Override groqAnalyze to use detailed analysis but return HTML
const _origGroqAnalyze = window.groqAnalyze;
window.groqAnalyze = async function(heard, target, pinyin) {
  // Use our detailed analyzer
  const result = await analyzeSpeechDetailed(heard, target, pinyin);
  // If result is an object, convert to HTML
  if (result && typeof result === 'object' && 'overall_score' in result) {
    const score = result.overall_score || 0;
    const scoreColor = score >= 80 ? 'var(--green)' : score >= 50 ? 'var(--yellow-d)' : 'var(--red)';
    const gradeEmoji = score >= 80 ? '🌟' : score >= 50 ? '👍' : '💪';
    return `<div class="groq-fb-card ${score>=80?'perfect':score>=50?'good':'poor'}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <strong>${gradeEmoji} ${score}/100 — ${result.pronunciation_accuracy >= 80 ? 'Excellent!' : result.pronunciation_accuracy >= 50 ? 'Good effort!' : 'Keep practicing!'}</strong>
      </div>
      <div style="font-size:12px;margin-top:4px">${result.overall_feedback || ''}</div>
      ${result.tip || result.word_analysis?.[0]?.tip ? `<div style="font-size:11px;margin-top:4px;opacity:.8">💡 ${result.tip || result.word_analysis[0].tip}</div>` : ''}
    </div>`;
  }
  // If it's already a string (HTML), return as-is
  if (typeof result === 'string') return result;
  return '<div class="groq-fb-card good"><strong>👍 Good attempt!</strong> Keep practicing your tones!</div>';
};

// Override to show detailed result
const _origShowSpeakResult = window.showSpeakResult;
window.showSpeakResult = function(analysis, targetText) {
  if (analysis && typeof analysis === 'object' && 'overall_score' in analysis) {
    showDetailedSpeakResult(analysis, targetText || '');
  } else if (typeof analysis === 'string') {
    // HTML string result - show in a toast/modal
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--card);border:2px solid var(--card-border);border-radius:16px;padding:16px 20px;max-width:360px;width:90%;box-shadow:0 8px 32px rgba(0,0,0,.2);z-index:9999;animation:slideUp .3s ease';
    d.innerHTML = analysis + `<button onclick="this.parentNode.remove()" style="width:100%;margin-top:10px;padding:8px;border-radius:10px;border:none;background:var(--green);color:#fff;font-weight:800;cursor:pointer;font-family:var(--font)">Done ✓</button>`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 6000);
  } else if (_origShowSpeakResult) {
    _origShowSpeakResult(analysis, targetText);
  }
};

// ══ ENHANCED AI TEACHER DESIGN ══
(function enhanceTeacher() {
  const origRenderChat = window.renderChat;
  
  // Override teacher page with better design
  window.renderTeacherPage = function() {
    const el = document.getElementById('chat-content');
    if (!el) return;
    
    const teacherHTML = `
      <div style="background:linear-gradient(135deg,#1a0a30,#0d1a40);border:2px solid rgba(139,92,246,0.3);border-radius:24px;padding:24px;margin-bottom:20px;position:relative;overflow:hidden">
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 80% 20%,rgba(139,92,246,0.15) 0%,transparent 60%);pointer-events:none"></div>
        <div style="display:flex;align-items:center;gap:16px;position:relative">
          <div style="width:64px;height:64px;border-radius:20px;background:linear-gradient(135deg,#8b5cf6,#6366f1);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid rgba(139,92,246,0.5);box-shadow:0 4px 20px rgba(139,92,246,0.4)">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/><path d="M12 8l0 4"/><circle cx="12" cy="16" r="1" fill="white"/></svg>
          </div>
          <div>
            <div style="font-size:20px;font-weight:900;color:#fff">AI Teacher Sara</div>
            <div style="font-size:12px;color:rgba(139,92,246,0.8);font-weight:700;margin-top:2px">Chinese Language Expert</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:6px">
              <div style="width:8px;height:8px;border-radius:50%;background:#58cc02;box-shadow:0 0 6px #58cc02"></div>
              <span style="font-size:11px;color:#aaa;font-weight:700">Online · Ready to teach</span>
            </div>
          </div>
          <div style="margin-left:auto;text-align:right">
            <div style="font-size:11px;color:#888;font-weight:700">Session</div>
            <div id="teacher-session-count" style="font-size:18px;font-weight:900;color:#8b5cf6">0</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:16px;position:relative">
          <button onclick="teacherQuickTopic('pronunciation')" style="padding:8px;border-radius:10px;background:rgba(139,92,246,0.2);border:1.5px solid rgba(139,92,246,0.4);color:#c4b5fd;font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font);transition:all .15s" onmouseenter="this.style.background='rgba(139,92,246,0.35)'" onmouseleave="this.style.background='rgba(139,92,246,0.2)'">Pronunciation</button>
          <button onclick="teacherQuickTopic('grammar')" style="padding:8px;border-radius:10px;background:rgba(28,176,246,0.2);border:1.5px solid rgba(28,176,246,0.4);color:#7dd3fc;font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font);transition:all .15s" onmouseenter="this.style.background='rgba(28,176,246,0.35)'" onmouseleave="this.style.background='rgba(28,176,246,0.2)'">Grammar</button>
          <button onclick="teacherQuickTopic('culture')" style="padding:8px;border-radius:10px;background:rgba(232,25,44,0.2);border:1.5px solid rgba(232,25,44,0.4);color:#fca5a5;font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font);transition:all .15s" onmouseenter="this.style.background='rgba(232,25,44,0.35)'" onmouseleave="this.style.background='rgba(232,25,44,0.2)'">Culture</button>
        </div>
      </div>
      <div id="chat-messages" style="min-height:300px;margin-bottom:16px"></div>
      <div style="display:flex;gap:10px;align-items:flex-end">
        <textarea id="chat-input" placeholder="Ask Sara anything in Chinese or English..." rows="2" style="flex:1;padding:12px 16px;border-radius:14px;border:2px solid var(--card-border);background:var(--card);color:var(--text);font-family:var(--font);font-size:13px;resize:none;outline:none;transition:border .15s" onfocus="this.style.borderColor='#8b5cf6'" onblur="this.style.borderColor='var(--card-border)'" onkeydown="if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat()}"></textarea>
        <button onclick="sendChat()" style="padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;border:none;font-weight:800;cursor:pointer;font-family:var(--font);font-size:13px;box-shadow:0 4px 0 #4338ca;transition:all .1s;flex-shrink:0" onmouseenter="this.style.transform='translateY(-1px)'" onmouseleave="this.style.transform=''">Send</button>
      </div>
    `;
    el.innerHTML = teacherHTML;
    
    // Add initial greeting
    setTimeout(() => addTeacherMessage("你好！I'm Sara, your AI Chinese teacher. I can help you with pronunciation, grammar, vocabulary, culture, and more. What would you like to learn today?"), 300);
  };
  
  window.teacherQuickTopic = function(topic) {
    const messages = {
      pronunciation: "Can you teach me about Chinese tones and pronunciation?",
      grammar: "Explain Chinese grammar basics for beginners",
      culture: "Tell me something interesting about Chinese culture"
    };
    const input = document.getElementById('chat-input');
    if (input) { input.value = messages[topic] || topic; sendChat(); }
  };
  
  window.addTeacherMessage = function(text) {
    const el = document.getElementById('chat-messages');
    if (!el) return;
    const msg = document.createElement('div');
    msg.style.cssText = 'display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;animation:pgIn .3s ease';
    msg.innerHTML = `
      <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#8b5cf6,#6366f1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
      </div>
      <div style="background:rgba(139,92,246,0.12);border:1.5px solid rgba(139,92,246,0.25);border-radius:16px 16px 16px 4px;padding:12px 16px;max-width:85%;color:var(--text);font-size:13px;font-weight:600;line-height:1.6">
        ${text.replace(/\n/g,'<br>')}
      </div>`;
    el.appendChild(msg);
    el.scrollTop = el.scrollHeight;
    const countEl = document.getElementById('teacher-session-count');
    if (countEl) countEl.textContent = parseInt(countEl.textContent||0) + 1;
  };
})();

// ══ EXTRA CHINA & HISTORY CONTENT ══
(function addChinaContent() {
  if (typeof CHINA_DATA === 'undefined') return;
  
  const extraFacts = [
    { emoji: "🏯", title: "China has the world's oldest continuous civilization", body: "Chinese civilization dates back over 5,000 years, making it one of the world's oldest. The Yellow River Valley saw the emergence of early Chinese culture around 2100 BCE." },
    { emoji: "🍜", title: "China invented pasta — not Italy", body: "The world's oldest noodles (4,000 years old) were discovered in China in 2005. A bowl of yellow millet noodles was found preserved in an overturned earthenware bowl in Lajia, northwest China." },
    { emoji: "🧨", title: "Fireworks were invented in China", body: "Around 200 BCE, a Chinese cook accidentally mixed charcoal, sulfur, and saltpeter — creating the first gunpowder. By the 10th century, fireworks were used to ward off evil spirits." },
    { emoji: "🌏", title: "China has 56 officially recognized ethnic groups", body: "While Han Chinese make up about 92% of the population, China officially recognizes 56 ethnic groups, each with their own language, culture, and traditions." },
    { emoji: "🏔️", title: "Mount Everest is on the China-Nepal border", body: "Known as 珠穆朗玛峰 (Zhūmùlǎngmā Fēng) in Chinese, Mount Everest sits on the border of Tibet (China) and Nepal, standing 8,849 meters (29,032 ft) above sea level." },
    { emoji: "📜", title: "China invented paper money 1,000 years ago", body: "During the Tang Dynasty (618-907 CE), China developed 'flying money' (飞钱, fēiqián) — an early form of paper currency, eventually evolving into the world's first banknotes during the Song Dynasty." },
    { emoji: "🐼", title: "Giant pandas are China's national treasure", body: "Giant pandas (大熊猫, dàxióngmāo) are native only to China. They eat up to 38kg of bamboo daily! China practices 'panda diplomacy' — loaning pandas to countries as a gesture of goodwill." },
    { emoji: "🎋", title: "The Silk Road was the internet of the ancient world", body: "This ancient trade network connected China to Europe from about 130 BCE to 1453 CE. It wasn't just silk — ideas, religions, technologies, and diseases also traveled along this route." },
    { emoji: "🔴", title: "Red is the luckiest color in Chinese culture", body: "Red (红色, hóngsè) symbolizes luck, prosperity, and happiness in Chinese culture. It's used in weddings, New Year celebrations, and red envelopes (红包, hóngbāo) filled with money." },
    { emoji: "🌙", title: "The Chinese lunar calendar has 12 animal signs", body: "The 12 zodiac animals (鼠牛虎兔龙蛇马羊猴鸡狗猪) follow a 12-year cycle. Each animal has specific traits. 2024 is the Year of the Dragon — the only mythical creature in the zodiac!" },
    { emoji: "🍵", title: "Tea drinking culture spans 5,000 years", body: "According to legend, Emperor Shennong discovered tea in 2737 BCE when leaves fell into his boiling water. China produces 40% of the world's tea and has a deeply ritualized tea ceremony culture (茶道, chádào)." },
    { emoji: "🏗️", title: "China built 40,000+ km of high-speed rail", body: "China has the world's longest high-speed railway network, covering more than all other countries combined. Trains can reach 350 km/h and have transported billions of passengers." }
  ];
  
  const extraPhrases = [
    { cn: "请多关照", py: "qǐng duō guānzhào", en: "Please take care of me / I'm in your care", context: "Said when meeting someone new in a professional context" },
    { cn: "哪里哪里", py: "nǎlǐ nǎlǐ", en: "You flatter me (lit. where where)", context: "Humble response to a compliment" },
    { cn: "入乡随俗", py: "rù xiāng suí sú", en: "When in Rome, do as the Romans do", context: "Chinese idiom about adapting to local customs" },
    { cn: "加油", py: "jiā yóu", en: "Keep going! / You can do it! (lit. add oil)", context: "Used to encourage someone" },
    { cn: "没关系", py: "méi guānxi", en: "It doesn't matter / No problem / Never mind", context: "Very common phrase to say 'it's okay'" },
    { cn: "一路顺风", py: "yī lù shùn fēng", en: "Bon voyage / Have a safe journey", context: "Said when someone is leaving on a trip" }
  ];
  
  // Add to CHINA_DATA
  if (CHINA_DATA.facts) CHINA_DATA.facts.push(...extraFacts);
  if (CHINA_DATA.phrases) CHINA_DATA.phrases.push(...extraPhrases);
  else CHINA_DATA.phrases = extraPhrases;
  
  // Also add travel phrases if not exists
  if (!CHINA_DATA.travel) {
    CHINA_DATA.travel = [
      { cn: "这个多少钱？", py: "zhège duōshǎo qián?", en: "How much is this?", category: "Shopping" },
      { cn: "太贵了，能便宜点吗？", py: "tài guì le, néng piányí diǎn ma?", en: "Too expensive, can you lower the price?", category: "Bargaining" },
      { cn: "请问，地铁站在哪里？", py: "qǐngwèn, dìtiězhàn zài nǎlǐ?", en: "Excuse me, where is the subway station?", category: "Transport" },
      { cn: "我要一张去北京的票", py: "wǒ yào yī zhāng qù Běijīng de piào", en: "I want one ticket to Beijing", category: "Travel" },
      { cn: "这附近有酒店吗？", py: "zhè fùjìn yǒu jiǔdiàn ma?", en: "Is there a hotel nearby?", category: "Accommodation" },
      { cn: "我迷路了", py: "wǒ mí lù le", en: "I'm lost", category: "Emergency" },
      { cn: "帮我叫救护车", py: "bāng wǒ jiào jiùhùchē", en: "Please call an ambulance for me", category: "Emergency" },
      { cn: "菜单在哪里？", py: "càidān zài nǎlǐ?", en: "Where is the menu?", category: "Food" },
      { cn: "我不吃辣的", py: "wǒ bù chī là de", en: "I don't eat spicy food", category: "Food" },
      { cn: "可以拍照吗？", py: "kěyǐ pāizhào ma?", en: "Can I take a photo?", category: "Tourism" }
    ];
  }
  
  console.log('China data enhanced with extra content');
})();

// ══ REALISTIC HSK EXAM INTERFACE ══
(function upgradeHSKExam() {
  const origRenderHSK = typeof renderHSK !== 'undefined' ? renderHSK : null;
  
  window.renderHSK = function() {
    const el = document.getElementById('hsk-content');
    if (!el) return;
    
    const levels = [1,2,3,4,5,6];
    const SCORES = { 1: 200, 2: 200, 3: 300, 4: 300, 5: 300, 6: 300 };
    const PASSING = { 1: 120, 2: 120, 3: 180, 4: 180, 5: 180, 6: 180 };
    const SECTIONS = {
      1: ['Listening (15min)', 'Reading (20min)'],
      2: ['Listening (25min)', 'Reading (25min)'],
      3: ['Listening (35min)', 'Reading (30min)', 'Writing (15min)'],
      4: ['Listening (45min)', 'Reading (45min)', 'Writing (15min)'],
      5: ['Listening (45min)', 'Reading (45min)', 'Writing (25min)'],
      6: ['Listening (50min)', 'Reading (50min)', 'Writing (45min)'],
    };
    const VOCAB = { 1: 150, 2: 300, 3: 600, 4: 1200, 5: 2500, 6: 5000 };
    const COLORS = ['#58cc02','#1cb0f6','#ffc800','#ff9600','#8b5cf6','#e8192c'];
    
    let h = `
      <div style="background:linear-gradient(135deg,#0d1a40,#1a0a10);border:2px solid rgba(232,25,44,0.3);border-radius:22px;padding:22px;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
          <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#e8192c,#a00010);display:flex;align-items:center;justify-content:center;font-family:var(--cn);font-size:22px;font-weight:900;color:#ffd700;border:1.5px solid rgba(232,25,44,0.4)">汉</div>
          <div>
            <div style="font-size:18px;font-weight:900;color:#fff">HSK Official Practice Exam</div>
            <div style="font-size:12px;color:rgba(255,100,100,0.8);font-weight:700">汉语水平考试 · Hànyǔ Shuǐpíng Kǎoshì</div>
          </div>
        </div>
        <div style="font-size:12px;color:#aaa;line-height:1.7">The HSK (Hanyu Shuiping Kaoshi) is China's official Chinese proficiency test. It has 6 levels — HSK 1 is beginner, HSK 6 is near-native. Each test has Listening, Reading, and (from HSK 3) Writing sections.</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">`;
    
    levels.forEach(lv => {
      const col = COLORS[lv-1];
      const db_score = typeof db !== 'undefined' && db.hsk ? (db.hsk['level'+lv] || 0) : 0;
      const pct = db_score > 0 ? Math.round(db_score / SCORES[lv] * 100) : 0;
      const passed = db_score >= PASSING[lv];
      
      h += `<div style="background:var(--card);border:2px solid ${col}30;border-radius:18px;padding:16px;transition:all .15s;cursor:pointer" onclick="startHSKExam(${lv})" onmouseenter="this.style.borderColor='${col}70';this.style.transform='translateY(-2px)'" onmouseleave="this.style.borderColor='${col}30';this.style.transform=''">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="width:44px;height:44px;border-radius:12px;background:${col};display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;color:#fff;box-shadow:0 3px 0 ${col}80">H${lv}</div>
          ${db_score > 0 ? `<div style="background:${passed ? '#e0f7cc' : '#ffe0e0'};border:1.5px solid ${passed ? '#58cc02' : '#ff4b4b'};border-radius:99px;padding:3px 10px;font-size:11px;font-weight:800;color:${passed ? '#2e7a00' : '#cc0000'}">${passed ? 'PASSED' : 'FAILED'}</div>` : ''}
        </div>
        <div style="font-size:15px;font-weight:900;color:var(--text);margin-bottom:2px">HSK Level ${lv}</div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">${VOCAB[lv]} words · ${SECTIONS[lv].join(' + ')}</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:8px">Pass: ${PASSING[lv]}/${SCORES[lv]} points</div>
        ${db_score > 0 ? `
          <div style="background:#e5e5e5;border-radius:99px;height:6px;overflow:hidden;margin-bottom:6px">
            <div style="height:100%;border-radius:99px;background:${passed ? '#58cc02' : col};width:${pct}%;transition:width .5s"></div>
          </div>
          <div style="font-size:11px;font-weight:800;color:var(--text2)">Last score: ${db_score}/${SCORES[lv]} (${pct}%)</div>
        ` : `<div style="font-size:11px;font-weight:700;color:var(--muted)">Not taken yet</div>`}
        <button style="margin-top:12px;width:100%;padding:9px;border-radius:10px;background:${col};color:#fff;border:none;font-weight:800;cursor:pointer;font-family:var(--font);font-size:12px;box-shadow:0 3px 0 ${col}80">Start Practice Exam</button>
      </div>`;
    });
    
    h += '</div>';
    el.innerHTML = h;
  };
  
  window.startHSKExam = function(level) {
    // Use existing exam logic but style it better
    if (typeof openHSK === 'function') {
      openHSK(level);
    } else {
      toast('Starting HSK ' + level + ' exam...', 'info');
      // Generate questions from vocabulary
      if (typeof generateHSKQuestions === 'function') {
        generateHSKQuestions(level);
      }
    }
  };
})();

// --- Component Script --- 

(function() {
'use strict';

// ─── SRS CONSTANTS ──────────────────────────────────────
const SRS_KEY = 'hx_srs_v2';

// SM-2 defaults
const SM2 = {
  MIN_EASE: 1.3,
  DEFAULT_EASE: 2.5,
  // Quality ratings: 0=Again, 1=Hard, 2=Good, 3=Easy
  INTERVALS: {
    again: 1,          // 1 minute → re-show in same session
    hard:  600,        // 10 minutes
    good:  86400,      // 1 day
    easy:  259200,     // 3 days
  },
  // Subsequent intervals computed from SM-2
  EASE_DELTA: { again: -0.2, hard: -0.15, good: 0, easy: +0.15 },
};

// ─── SRS DATA LAYER ─────────────────────────────────────
// srsDB: { [hz]: { ease, interval, due, reps, lapses, lastSeen } }
let srsDB = {};

function loadSRS() {
  try {
    const s = localStorage.getItem(SRS_KEY);
    if (s) srsDB = JSON.parse(s);
  } catch(e) { srsDB = {}; }
}

function saveSRS() {
  try { localStorage.setItem(SRS_KEY, JSON.stringify(srsDB)); } catch(e) {}
}

function now() { return Date.now(); }

// ─── CARD MANAGEMENT ────────────────────────────────────
function getCard(hz) {
  if (!srsDB[hz]) {
    srsDB[hz] = { ease: SM2.DEFAULT_EASE, interval: 0, due: 0, reps: 0, lapses: 0 };
  }
  return srsDB[hz];
}

// Add word to SRS deck (called when lesson completed or word saved)
function srsAddWord(hz) {
  if (!srsDB[hz]) {
    srsDB[hz] = { ease: SM2.DEFAULT_EASE, interval: 0, due: now(), reps: 0, lapses: 0 };
    saveSRS();
  }
}

// Add all words from a lesson to SRS
function srsAddLesson(lesson) {
  if (!lesson || !lesson.words) return;
  lesson.words.forEach(hz => srsAddWord(hz));
  updateSRSBadge();
}

// SM-2 review algorithm
function srsReview(hz, quality) {
  // quality: 'again'|'hard'|'good'|'easy'
  const card = getCard(hz);
  const qNum = {again:0, hard:1, good:2, easy:3}[quality];
  
  // Update ease factor
  card.ease = Math.max(SM2.MIN_EASE, card.ease + SM2.EASE_DELTA[quality]);
  
  if (quality === 'again') {
    card.lapses++;
    card.reps = 0;
    card.interval = SM2.INTERVALS.again;
    card.due = now() + card.interval * 1000;
  } else {
    card.reps++;
    if (card.reps === 1) {
      card.interval = SM2.INTERVALS[quality];
    } else if (card.reps === 2) {
      card.interval = quality === 'easy' ? SM2.INTERVALS.easy * 2 :
                      quality === 'hard' ? SM2.INTERVALS.hard * 6 :
                      SM2.INTERVALS.good * 4;
    } else {
      card.interval = Math.round(card.interval * card.ease * (
        quality === 'easy' ? 1.3 :
        quality === 'hard' ? 0.6 :
        1.0
      ));
      // Min/max sanity
      card.interval = Math.max(86400, Math.min(card.interval, 365 * 86400));
    }
    card.due = now() + card.interval * 1000;
  }
  
  srsDB[hz] = card;
  saveSRS();
}

// ─── DUE CARDS ──────────────────────────────────────────
function getWordData(hz) {
  if (typeof ALL_WORDS === 'undefined') return null;
  return ALL_WORDS.find(w => w.h === hz) || null;
}

function getDueCards() {
  const t = now();
  return Object.entries(srsDB)
    .filter(([hz, c]) => c.due <= t)
    .map(([hz, c]) => ({ hz, ...c, word: getWordData(hz) }))
    .filter(c => c.word)
    .sort((a, b) => a.due - b.due);
}

function getDueCount() { return getDueCards().length; }

// ─── SEED SRS FROM COMPLETED LESSONS ──────────────────
// Automatically seeds words from completed lessons into SRS on app load
function seedSRSFromProgress() {
  if (typeof db === 'undefined' || typeof UNITS === 'undefined') return;
  Object.keys(db.done || {}).forEach(lessonId => {
    if (!db.done[lessonId]) return;
    UNITS.forEach(u => {
      const lesson = u.lessons.find(l => String(l.id) === String(lessonId));
      if (lesson) {
        (lesson.words || []).forEach(hz => {
          // Only add if not already tracked
          if (!srsDB[hz]) {
            srsDB[hz] = {
              ease: SM2.DEFAULT_EASE,
              interval: 86400,        // already learned once
              due: now() + 86400000,  // due tomorrow
              reps: 1, lapses: 0
            };
          }
        });
      }
    });
  });
  saveSRS();
}

// ─── BADGE / UI UPDATES ─────────────────────────────────
function updateSRSBadge() {
  const n = getDueCount();
  
  // Due badge on SRS page
  const badge = document.getElementById('srs-due-badge');
  if (badge) badge.textContent = n + ' due';
  
  // Pill on game card
  const pill = document.getElementById('srs-due-pill');
  if (pill) {
    pill.style.display = n > 0 ? 'block' : 'none';
    pill.textContent = n;
  }
  
  // Sub text on game card
  const sub = document.getElementById('srs-game-sub');
  if (sub) {
    sub.textContent = n > 0 ? `${n} word${n===1?'':'s'} due now!` : 'Smart spaced repetition';
  }
}

// ─── SRS SESSION ────────────────────────────────────────
let srsQueue = [];
let srsTotal = 0;
let srsDone  = 0;
let srsCurrentCard = null;
let srsFlipped = false;

function startSRS() {
  loadSRS();
  seedSRSFromProgress();
  
  srsQueue = getDueCards();
  
  // Also add ALL_WORDS that have never been added — bootstraps first-time users
  if (srsQueue.length === 0 && Object.keys(srsDB).length === 0 && typeof ALL_WORDS !== 'undefined') {
    // If zero SRS data, seed a small starter set
    const starter = (ALL_WORDS || []).slice(0, 20);
    starter.forEach(w => srsAddWord(w.h));
    // Make them all due now
    starter.forEach(w => { if (srsDB[w.h]) srsDB[w.h].due = now() - 1; });
    saveSRS();
    srsQueue = getDueCards();
  }
  
  srsTotal = srsQueue.length;
  srsDone = 0;
  srsFlipped = false;
  
  updateSRSBadge();
  renderSRS();
}

// Card type cycle: hz→meaning, meaning→hz, pinyin→hz (rotate per card)
function pickCardType(card) {
  const types = ['hz2en', 'en2hz', 'py2hz'];
  // Use reps count to cycle types, ensuring variety
  return types[card.reps % 3];
}

function renderSRS() {
  const el = document.getElementById('srs-body');
  const prog = document.getElementById('srs-prog-fill');
  const progBar = document.getElementById('srs-prog-bar');
  const badge = document.getElementById('srs-due-badge');
  const subtitle = document.getElementById('srs-subtitle');
  if (!el) return;
  
  // Session complete
  if (srsQueue.length === 0) {
    if (progBar) progBar.style.display = 'none';
    if (badge) badge.textContent = '✓ Done!';
    const xpEarned = Math.round(srsDone * 2);
    
    el.innerHTML = `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:72px;margin-bottom:16px;animation:float 3s ease-in-out infinite">🎉</div>
        <h2 style="font-size:24px;font-weight:900;margin-bottom:8px">Review Complete!</h2>
        <p style="color:var(--text2);font-size:14px;margin-bottom:24px">You reviewed ${srsDone} card${srsDone===1?'':'s'} today</p>
        
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:28px;max-width:320px;margin-left:auto;margin-right:auto">
          <div style="background:var(--green-bg);border:2px solid var(--green);border-radius:16px;padding:14px;text-align:center">
            <div style="font-size:24px;font-weight:900;color:var(--green)">${srsDone}</div>
            <div style="font-size:10px;color:var(--muted);font-weight:700;margin-top:2px">Reviewed</div>
          </div>
          <div style="background:var(--blue-bg);border:2px solid var(--blue);border-radius:16px;padding:14px;text-align:center">
            <div style="font-size:24px;font-weight:900;color:var(--blue)">+${xpEarned}</div>
            <div style="font-size:10px;color:var(--muted);font-weight:700;margin-top:2px">XP Earned</div>
          </div>
          <div style="background:var(--yellow-bg);border:2px solid var(--yellow);border-radius:16px;padding:14px;text-align:center">
            <div style="font-size:24px;font-weight:900;color:var(--yellow-d)">${Object.keys(srsDB).length}</div>
            <div style="font-size:10px;color:var(--muted);font-weight:700;margin-top:2px">Total Cards</div>
          </div>
        </div>
        
        <div style="background:var(--card);border:2px solid var(--card-border);border-radius:16px;padding:16px;margin-bottom:20px;text-align:left">
          <div style="font-weight:800;font-size:13px;margin-bottom:10px;color:var(--text2)">📅 Coming Up Next</div>
          ${renderNextDue()}
        </div>
        
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="btn btn-green" onclick="go('learn')" style="box-shadow:0 4px 0 var(--green-d)">📚 Study More</button>
          <button class="btn btn-ghost" onclick="go('games')">Back to Games</button>
        </div>
      </div>
    `;
    
    if (xpEarned > 0 && typeof addXP === 'function') addXP(xpEarned);
    return;
  }
  
  // Show progress bar
  if (progBar) progBar.style.display = 'block';
  const pct = srsTotal > 0 ? Math.round((srsDone / srsTotal) * 100) : 0;
  if (prog) prog.style.width = pct + '%';
  if (badge) badge.textContent = srsQueue.length + ' left';
  if (subtitle) subtitle.textContent = `${srsDone} done · ${srsQueue.length} remaining`;
  
  const card = srsQueue[0];
  srsCurrentCard = card;
  srsFlipped = false;
  const w = card.word;
  const type = pickCardType(card);
  
  // Difficulty label
  const ageMs = now() - (card.due - card.interval * 1000);
  const isNew = card.reps === 0;
  const isLapsed = card.lapses > 0;
  const statusLabel = isNew ? 
    '<span style="background:var(--blue-bg);color:var(--blue-d);border:1.5px solid var(--blue);border-radius:99px;padding:2px 8px;font-size:10px;font-weight:800">NEW</span>' :
    isLapsed ? 
    '<span style="background:var(--red-bg);color:var(--red-d);border:1.5px solid var(--red);border-radius:99px;padding:2px 8px;font-size:10px;font-weight:800">REVIEW</span>' :
    '<span style="background:var(--green-bg);color:var(--green-d);border:1.5px solid var(--green);border-radius:99px;padding:2px 8px;font-size:10px;font-weight:800">LEARNING</span>';
  
  // Build front/back content based on card type
  let front, back, frontHint;
  
  if (type === 'hz2en') {
    front = `<div style="font-family:var(--cn);font-size:88px;font-weight:900;line-height:1;color:var(--text);cursor:pointer" onclick="if(typeof speak==='function')speak('${w.h.replace(/'/g,"\\'")}')">
      ${w.h}
    </div>`;
    frontHint = `<div style="color:var(--muted);font-size:12px;font-weight:700;margin-top:12px">What does this mean?</div>`;
    back = `
      <div style="font-size:16px;font-weight:800;color:var(--blue);margin-bottom:8px">${w.p}</div>
      <div style="font-size:26px;font-weight:900;color:var(--text);margin-bottom:12px">${w.m}</div>
    `;
  } else if (type === 'en2hz') {
    front = `<div style="font-size:28px;font-weight:900;color:var(--text);text-align:center;padding:0 8px">${w.m}</div>`;
    frontHint = `<div style="color:var(--muted);font-size:12px;font-weight:700;margin-top:12px">What's the Chinese character?</div>`;
    back = `
      <div style="font-family:var(--cn);font-size:72px;font-weight:900;line-height:1;color:var(--text);margin-bottom:8px;cursor:pointer" onclick="if(typeof speak==='function')speak('${w.h.replace(/'/g,"\\'")}')">
        ${w.h}
      </div>
      <div style="font-size:16px;font-weight:700;color:var(--blue)">${w.p}</div>
    `;
  } else {
    // py2hz
    front = `<div style="font-size:32px;font-weight:900;color:var(--blue);text-align:center;padding:0 8px">${w.p}</div>`;
    frontHint = `<div style="color:var(--muted);font-size:12px;font-weight:700;margin-top:12px">What character has this pinyin?</div>`;
    back = `
      <div style="font-family:var(--cn);font-size:72px;font-weight:900;line-height:1;color:var(--text);margin-bottom:8px;cursor:pointer" onclick="if(typeof speak==='function')speak('${w.h.replace(/'/g,"\\'")}')">
        ${w.h}
      </div>
      <div style="font-size:18px;font-weight:800;color:var(--text)">${w.m}</div>
    `;
  }
  
  el.innerHTML = `
    <!-- Card type label & progress -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      ${statusLabel}
      <div style="font-size:11px;color:var(--muted);font-weight:700">
        ${type==='hz2en'?'Character → Meaning':type==='en2hz'?'Meaning → Character':'Pinyin → Character'}
      </div>
    </div>
    
    <!-- Flashcard with flip -->
    <div id="srs-card-wrap" style="perspective:1200px;margin-bottom:24px;min-height:240px">
      <div id="srs-card-inner" style="
        transition:transform 0.55s cubic-bezier(.4,.2,.2,1);
        transform-style:preserve-3d;
        position:relative;min-height:240px;
      ">
        <!-- FRONT -->
        <div id="srs-front" style="
          position:absolute;width:100%;min-height:240px;
          backface-visibility:hidden;-webkit-backface-visibility:hidden;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          background:var(--card);border:3px solid var(--card-border);border-radius:24px;
          box-shadow:0 6px 0 var(--card-border);padding:28px;cursor:pointer;
          text-align:center;
        " onclick="srsFlipCard()">
          ${front}
          ${frontHint}
          <div style="position:absolute;bottom:14px;right:16px;color:var(--muted);font-size:11px;font-weight:700">tap to reveal →</div>
        </div>
        
        <!-- BACK -->
        <div id="srs-back" style="
          position:absolute;width:100%;min-height:240px;
          backface-visibility:hidden;-webkit-backface-visibility:hidden;
          transform:rotateY(180deg);
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          background:linear-gradient(135deg,var(--card),color-mix(in srgb,var(--blue-bg) 30%,var(--card)));
          border:3px solid var(--blue);border-radius:24px;
          box-shadow:0 6px 0 rgba(79,184,232,.25);padding:28px;
          text-align:center;
        ">
          ${back}
          <div style="margin-top:8px">
            <button onclick="event.stopPropagation();if(typeof speak==='function')speak('${w.h.replace(/'/g,"\\'")}');" style="display:inline-flex;align-items:center;gap:5px;padding:6px 14px;border-radius:9px;border:2px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:11px;font-weight:800;cursor:pointer;font-family:var(--font)">
              🔊 Hear pronunciation
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Rating buttons (hidden until flipped) -->
    <div id="srs-rating-wrap" style="display:none">
      <div style="text-align:center;font-size:12px;color:var(--muted);font-weight:700;margin-bottom:12px">How well did you know it?</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px">
        
        <button onclick="srsRate('again')" style="
          padding:12px 6px;border-radius:14px;border:2px solid var(--red);
          background:var(--red-bg);color:var(--red-d);
          font-size:11px;font-weight:900;cursor:pointer;font-family:var(--font);
          transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:3px;
        " onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform=''">
          <span style="font-size:18px">😵</span>
          <span>Again</span>
          <span style="font-size:9px;opacity:.7">&lt;1m</span>
        </button>
        
        <button onclick="srsRate('hard')" style="
          padding:12px 6px;border-radius:14px;border:2px solid var(--orange);
          background:rgba(255,150,0,.1);color:var(--orange-d);
          font-size:11px;font-weight:900;cursor:pointer;font-family:var(--font);
          transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:3px;
        " onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform=''">
          <span style="font-size:18px">😓</span>
          <span>Hard</span>
          <span style="font-size:9px;opacity:.7">10m</span>
        </button>
        
        <button onclick="srsRate('good')" style="
          padding:12px 6px;border-radius:14px;border:2px solid var(--green);
          background:var(--green-bg);color:var(--green-d);
          font-size:11px;font-weight:900;cursor:pointer;font-family:var(--font);
          transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:3px;
        " onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform=''">
          <span style="font-size:18px">😊</span>
          <span>Good</span>
          <span style="font-size:9px;opacity:.7">1 day</span>
        </button>
        
        <button onclick="srsRate('easy')" style="
          padding:12px 6px;border-radius:14px;border:2px solid var(--blue);
          background:var(--blue-bg);color:var(--blue-d);
          font-size:11px;font-weight:900;cursor:pointer;font-family:var(--font);
          transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:3px;
        " onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform=''">
          <span style="font-size:18px">🌟</span>
          <span>Easy</span>
          <span style="font-size:9px;opacity:.7">3+ days</span>
        </button>
        
      </div>
    </div>
    
    <!-- Flip hint -->
    <div id="srs-flip-hint" style="text-align:center;margin-top:12px">
      <button onclick="srsFlipCard()" style="
        padding:12px 32px;border-radius:14px;border:2px solid var(--card-border);
        background:var(--card);color:var(--text);
        font-size:14px;font-weight:800;cursor:pointer;font-family:var(--font);
        box-shadow:0 4px 0 var(--card-border);transition:all .15s;
      " onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform=''">
        Show Answer
      </button>
    </div>
  `;
  
  // Auto-speak front on card load
  if (type === 'hz2en' && typeof speak === 'function') {
    setTimeout(() => { try { speak(w.h); } catch(e) {} }, 300);
  }
}

function renderNextDue() {
  const cards = Object.entries(srsDB)
    .map(([hz, c]) => ({ hz, due: c.due, word: getWordData(hz) }))
    .filter(c => c.word && c.due > now())
    .sort((a, b) => a.due - b.due)
    .slice(0, 4);
  
  if (cards.length === 0) return '<div style="color:var(--muted);font-size:13px">No cards scheduled yet.</div>';
  
  return cards.map(c => {
    const ms = c.due - now();
    const label = ms < 3600000 ? Math.round(ms/60000) + 'm' :
                  ms < 86400000 ? Math.round(ms/3600000) + 'h' :
                  Math.round(ms/86400000) + 'd';
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--card-border)">
      <span style="font-family:var(--cn);font-size:20px;font-weight:900">${c.hz}</span>
      <span style="font-size:12px;color:var(--text2);font-weight:700">${c.word?.m || ''}</span>
      <span style="font-size:11px;color:var(--muted);font-weight:700;background:var(--bg);border-radius:99px;padding:2px 8px">in ${label}</span>
    </div>`;
  }).join('');
}

window.srsFlipCard = function() {
  if (srsFlipped) return;
  srsFlipped = true;
  
  const inner = document.getElementById('srs-card-inner');
  if (inner) inner.style.transform = 'rotateY(180deg)';
  
  const rating = document.getElementById('srs-rating-wrap');
  if (rating) rating.style.display = 'block';
  
  const flipHint = document.getElementById('srs-flip-hint');
  if (flipHint) flipHint.style.display = 'none';
  
  // Speak on reveal if hz2en card
  if (srsCurrentCard?.word?.h && typeof speak === 'function') {
    setTimeout(() => { try { speak(srsCurrentCard.word.h); } catch(e) {} }, 400);
  }
};

window.srsRate = function(quality) {
  if (!srsCurrentCard) return;
  const hz = srsCurrentCard.hz;
  
  srsReview(hz, quality);
  srsDone++;
  
  // Remove from queue if not 'again', else push to back
  srsQueue.shift();
  if (quality === 'again') {
    // Re-insert near back with a slight due time bump
    srsQueue.push(srsCurrentCard);
  }
  
  updateSRSBadge();
  
  // Brief success feedback
  const colors = { again: 'var(--red-bg)', hard: 'rgba(255,150,0,.15)', good: 'var(--green-bg)', easy: 'var(--blue-bg)' };
  const msgs = { again: '→ Try again soon', hard: '→ Coming back shortly', good: '→ See you tomorrow!', easy: '→ Well done! 🌟' };
  
  const el = document.getElementById('srs-body');
  if (el) {
    el.innerHTML = `<div style="text-align:center;padding:80px 20px;background:${colors[quality]};border-radius:24px;animation:pgIn .2s ease">
      <div style="font-size:56px;margin-bottom:12px">${{again:'😵',hard:'😓',good:'😊',easy:'🌟'}[quality]}</div>
      <div style="font-size:18px;font-weight:900;color:var(--text)">${msgs[quality]}</div>
    </div>`;
  }
  
  setTimeout(() => renderSRS(), 500);
};

// ─── HOOK INTO LESSON COMPLETION ───────────────────────
// Override completeLesson to also add words to SRS
const _origCompleteLesson = window.completeLesson;
window.completeLesson = function() {
  // Add lesson words to SRS
  try {
    const lesson = window.curLessonLesson || (typeof curLessonLesson !== 'undefined' ? curLessonLesson : null);
    if (lesson) srsAddLesson(lesson);
  } catch(e) {}
  if (typeof _origCompleteLesson === 'function') _origCompleteLesson();
};

// ─── HOOK INTO saveItem (saved words → SRS) ─────────────
const _origSaveItem = window.saveItem;
window.saveItem = function(h, p, m, type) {
  if (_origSaveItem) _origSaveItem(h, p, m, type);
  if (h) srsAddWord(h);
};

// ─── INIT ───────────────────────────────────────────────
function srsInit() {
  loadSRS();
  // Wait for db + UNITS to be ready
  const tryInit = () => {
    if (typeof db !== 'undefined' && typeof UNITS !== 'undefined' && typeof ALL_WORDS !== 'undefined') {
      seedSRSFromProgress();
      updateSRSBadge();
    } else {
      setTimeout(tryInit, 300);
    }
  };
  tryInit();
  
  // Refresh badge every 60s (for when cards come due)
  setInterval(() => updateSRSBadge(), 60000);
}

// Make startSRS global
window.startSRS = startSRS;
window.srsAddLesson = srsAddLesson;
window.srsAddWord = srsAddWord;

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', srsInit);
} else {
  setTimeout(srsInit, 500);
}

})();

// --- Component Script --- 

/* ══════════════════════════════════════════════════
   UPGRADED _renderLessonNow — 4-Stage System
   Stage 1: Flashcard intro (flip to reveal)
   Stage 2: Matching game (char ↔ meaning)
   Stage 3: Listening + speaking practice
   Stage 4: Final quiz (MCQ + fill blank)
══════════════════════════════════════════════════ */

(function() {
'use strict';

// ── HELPERS ──────────────────────────────────────
const TONE_COLORS = {'1':'#e74c3c','2':'#2980b9','3':'#27ae60','4':'#8e44ad','5':'#888'};
const TONE_NAMES = {'1':'1st (High Flat)','2':'2nd (Rising)','3':'3rd (Dip-Rise)','4':'4th (Falling)','5':'Neutral'};

function getTone(py) {
  if (!py) return '5';
  const marks = {'ā':'1','á':'2','ǎ':'3','à':'4','ē':'1','é':'2','ě':'3','è':'4','ī':'1','í':'2','ǐ':'3','ì':'4','ō':'1','ó':'2','ǒ':'3','ò':'4','ū':'1','ú':'2','ǔ':'3','ù':'4','ǖ':'1','ǘ':'2','ǚ':'3','ǜ':'4'};
  for (const [m, t] of Object.entries(marks)) { if (py.includes(m)) return t; }
  return '5';
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - .5); }

const MEM_HOOKS = {
  // ── GREETINGS & BASICS ──
  '你':'NI sounds like "knee" — bow on your knee to say hello! 跪下!',
  '好':'A woman (女) with a child (子) = GOOD family 好 (hǎo)',
  '谢谢':'XIE XIE — sounds like "sheh sheh", like saying "yeah yeah, thanks!" twice!',
  '再见':'再 = again, 见 = see. ZAI JIAN = "see you again!" Like "au revoir."',
  '请':'Speech radical (讠) + blue-green = politely ASKING with a calm voice. Say "CHING!"',
  '对不起':'DUI BU QI — "facing not rising up" — you messed up and can\'t face them! = SORRY',
  '没关系':'MEI GUAN XI — "no connection" = no big deal. Sounds like "May gwan she" = no worries!',
  // ── PRONOUNS & IDENTITY ──
  '我':'A hand holding a halberd (weapon) — "I defend myself!" 我 (wǒ)',
  '是':'SHI — "sure it IS!" Sounds like "sure" = am/is 是 (shì)',
  '他':'Person (亻) + another = HE, that other guy 他 (tā)',
  '她':'Woman (女) + another = SHE 她 (tā)',
  '们':'Person radical + gate = plural marker. Add 们 to make "we/they/you all" 们 (men)',
  '叫':'Mouth (口) + a claw = calling out a name! JIAO = to be called 叫 (jiào)',
  '什么':'SHEN ME — "what?" Sounds like "shen-muh." The mouth (口) is asking! 什么',
  // ── NUMBERS ──
  '一':'One stroke = ONE 一 (yī). Simplest character in Chinese!',
  '二':'Two strokes = TWO 二 (èr). Just stack another line!',
  '三':'Three strokes = THREE 三 (sān). One more line!',
  '四':'SÌ — four sides like a box with legs = FOUR 四 (sì)',
  '五':'WǓ — looks like a wrestling move, fists at FIVE corners = FIVE 五 (wǔ)',
  '六':'LIÙ — like a person with a hat and legs — counts SIX steps 六 (liù)',
  '七':'QĪ — like a bent nail = SEVEN 七 (qī). Lucky number!',
  '八':'BĀ — two strokes spreading apart = EIGHT 八 (bā). Luckiest number in China!',
  '九':'JIǓ — a bent arm with a fist = NINE 九 (jiǔ). Nearly ten!',
  '十':'A cross (+) = TEN 十 (shí). Perfect cross shape!',
  // ── FAMILY ──
  '爸爸':'BÀ BA — sounds just like "baba" in many languages = DAD 爸爸',
  '妈妈':'MĀ MA — sounds like "mama" everywhere in the world = MOM 妈妈',
  '哥哥':'GĒ GE — older brother who gets everything first (哥 = elder) 哥哥',
  '姐姐':'JIĚ JIE — older sister, woman (女) who is "elder" 姐姐',
  '弟弟':'DÌ DI — little bro. 弟 has a bow shape — little brother playing bow 弟弟',
  '妹妹':'MÈI MEI — younger sister, woman radical + "not yet grown" 妹妹',
  '家':'A pig (豕) under a roof = HOME. Ancient families kept pigs inside! 家 (jiā)',
  // ── TIME ──
  '岁':'SUÈDE — your age in years. The hatchet on top counts your years! 岁 (suì)',
  '年':'NIÁN — a person carrying grain at harvest time = YEAR 年',
  '月':'The moon crescent = MOON / MONTH 月 (yuè)',
  '日':'A circle with a dot = THE SUN / DAY 日 (rì)',
  '号':'HÀO — mouth (口) + mark = NUMBER or DATE. "What number is today?" 号',
  '多':'DUŌ — two moons stacked = SO MANY moons = MUCH/MANY 多',
  '大':'A person stretching arms wide = BIG! 大 (dà)',
  '今天':'JĪN TIĀN — TODAY. 今 = now, 天 = sky/day. The sky above you right now!',
  '明天':'MÍNG TIĀN — TOMORROW. 明 = bright (sun + moon) + 天 = day. The bright day ahead!',
  '昨天':'ZUÓ TIĀN — YESTERDAY. 昨 = yesterday. The day that\'s "left behind."',
  '现在':'XIÀN ZÀI — NOW. 现 = appear + 在 = at. "Appearing at this moment!"',
  '时候':'SHÍHOU — time/moment. 时 = time (sun + inch) = measuring the sun\'s position!',
  // ── WEATHER ──
  '天气':'TIĀN QÌ — WEATHER. Literally "sky breath" — how the sky is breathing today!',
  '热':'RÈ — fire (灬) at the bottom = HOT! Feel that heat rising up 热',
  '冷':'LĚNG — ice radical (冫) on the left = COLD. Shiver! 冷',
  '下雨':'XIA YǓ — RAIN. 下 = down, 雨 = rain. Rain falling DOWN. Simple!',
  // ── COLORS ──
  '红':'HÓNG — silk radical (纟) + work = RED. Red silk = royalty in China! 红',
  '蓝':'LÁN — BLUE. Grass on top, looking at the blue horizon through plants 蓝',
  '绿':'LǙ — silk radical (纟) + record = GREEN. Green silk thread 绿',
  '白':'BÁI — WHITE. A sun ray (日) with a dot at the top = pure white light 白',
  '黑':'HĒI — BLACK. Fire soot on the bottom makes everything black! 黑',
  '颜色':'YÁN SÈ — COLOR. 颜 = face/color + 色 = color. The color of your face! 颜色',
  // ── FOOD & DRINK ──
  '吃':'Mouth (口) open wide — EATING something delicious! 吃 (chī)',
  '喝':'Mouth (口) + exhale = DRINK. "Ahhh" after a good sip! 喝 (hē)',
  '水':'Flowing water lines = WATER 水 (shuǐ)',
  '茶':'CHA — grass on top, tree in middle, person at bottom. Tea = person under a tea tree! 茶',
  '米饭':'MǏ FÀN — RICE. 米 looks like grains of rice on a stalk! 米饭',
  '菜':'CÀI — VEGETABLE/DISH. Grass on top (it\'s green!) = food dish 菜',
  '苹果':'PÍNG GUǑ — APPLE. 苹 has grass on top (fruit grows on trees) + 果 = fruit 苹果',
  // ── SHOPPING ──
  '饭店':'FÀN DIÀN — RESTAURANT. 饭 = food/meal + 店 = shop = food shop! 饭店',
  '买':'Ancient coins (贝) rising up to buy = BUY 买 (mǎi)',
  '钱':'Metal radical (钅) = MONEY. Everything valuable has the metal radical! 钱 (qián)',
  '多少':'DUŌ SHǍO — HOW MUCH. 多 = many + 少 = few. Between many and few = how much? 多少',
  // ── DRINKS & FOOD 2 ──
  '咖啡':'KĀ FĒI — COFFEE. Sounds like "kah-fay" — borrowed from Western languages! 咖啡',
  '牛奶':'NIÚ NǍI — MILK. 牛 = cow + 奶 = milk. Cow milk! 牛奶',
  '果汁':'GUǑ ZHĪ — JUICE. 果 = fruit + 汁 = juice/liquid. Fruit juice! 果汁',
  '面包':'MIÀN BĀO — BREAD. 面 = flour/face + 包 = wrap. Flour wrapped up = bread! 面包',
  // ── TRANSPORT ──
  '飞机':'FĒI JĪ — AIRPLANE. 飞 = fly + 机 = machine. Flying machine! 飞机',
  '火车':'HUǑ CHĒ — TRAIN. 火 = fire + 车 = vehicle. The old steam fire-vehicle! 火车',
  '地铁':'DÌ TIĚ — SUBWAY. 地 = ground + 铁 = iron. Iron road underground! 地铁',
  '公共汽车':'GŌNG GÒNG QÌ CHĒ — BUS. Public + steam + vehicle = public bus! 公共汽车',
  // ── PLACES ──
  '医院':'YĪ YUÀN — HOSPITAL. 医 = medicine + 院 = courtyard = medicine courtyard! 医院',
  '银行':'YÍN HÁNG — BANK. 银 = silver + 行 = go/walk. Where your silver walks! 银行',
  '超市':'CHĀO SHÌ — SUPERMARKET. 超 = super + 市 = market. Super market! 超市',
  '学校':'XUÉ XIÀO — SCHOOL. 学 = study + 校 = school ground. Study ground! 学校',
  '公司':'GŌNG SĪ — COMPANY. 公 = public + 司 = manage. Managing public affairs! 公司',
  // ── DIRECTIONS ──
  '左':'ZUǑ — LEFT. The carpenter\'s tool goes to the left hand side 左',
  '右':'YÒU — RIGHT. The mouth (口) on the right speaks = RIGHT 右',
  '前':'QIÁN — FRONT/AHEAD. Steps (止) going forward = ahead! 前',
  '后':'HÒU — BEHIND/AFTER. A person turning to look back = behind 后',
  '旁边':'PÁNG BIĀN — BESIDE. 旁 = side + 边 = edge. The edge beside something! 旁边',
  // ── EMOTIONS ──
  '高兴':'GĀO XÌNG — HAPPY. 高 = high + 兴 = excited. High excitement = happy! 高兴',
  '生气':'SHĒNG QÌ — ANGRY. 生 = life + 气 = air/breath. Life-breath going out of control! 生气',
  '难过':'NÁN GUÒ — SAD. 难 = difficult + 过 = pass through. A difficult time to pass 难过',
  '累':'LÈI — TIRED. Fields (田) stacked on a person = so much farming = TIRED! 累',
  '舒服':'SHŪ FÚ — COMFORTABLE. Sounds like "shoe foo" — imagine comfy shoes! 舒服',
  // ── HOBBIES & ACTIONS ──
  '喜欢':'XǏ HUĀN — LIKE/LOVE. 喜 = joy + 欢 = happy. Double happiness = I like it! 喜欢',
  '看':'Hand shading eyes to LOOK — like a sailor scanning the horizon 看 (kàn)',
  '听':'Ear (耳) + king (王) + heart (心) = LISTEN like a king with your whole heart 听 (tīng)',
  '说':'Speech radical (讠) + brother = SPEAK 说 (shuō)',
  '读':'DÚ — speech radical + sell = READ aloud. Selling your words! 读',
  '写':'XIĚ — WRITE. A roof with someone scribbling underneath = writing at home 写',
  '爱':'Heart (心) in the middle = LOVE comes from the heart 爱 (ài)',
  // ── WORK & STUDY ──
  '工作':'GŌNG ZUÒ — WORK. 工 = labor + 作 = make/do. Labor + making = work! 工作',
  '考试':'KǍO SHÌ — EXAM. 考 = test + 试 = try. Try the test! 考试',
  '练习':'LIÀN XÍ — PRACTICE. 练 = train + 习 = repeat/learn. Train by repeating! 练习',
  '帮助':'BĀNG ZHÙ — HELP. 帮 = help + 助 = assist. Double helping! 帮助',
  // ── HOME ──
  '房间':'FÁNG JIĀN — ROOM. 房 = building + 间 = space between. Space in a building! 房间',
  '门':'MÉN — a pair of swinging doors = DOOR/GATE 门. Looks exactly like a door!',
  '窗户':'CHUĀNG HÙ — WINDOW. 窗 has a heart shape inside — looking through lovingly 窗户',
  '桌子':'ZHUŌ ZI — TABLE. 桌 has 木 (wood) at the bottom = wooden table! 桌子',
  '椅子':'YǏ ZI — CHAIR. 椅 has 木 (wood) = wooden chair. Sit on wood! 椅子',
  '床':'CHUÁNG — BED. Wooden frame (木) with a cover = a bed to rest in! 床',
  '厕所':'CÈ SUǑ — TOILET/BATHROOM. 厕 = outhouse cliff + 所 = place. The cliff place! 厕所',
  // ── BODY ──
  '身体':'SHĒN TǏ — BODY. 身 = body/self + 体 = physical form. Your physical self! 身体',
  '头':'TÓU — HEAD. It\'s at the top — just like your head is at the top! 头',
  '眼睛':'YǍN JING — EYES. 眼 has 目 (eye radical). Two eye components = EYES! 眼睛',
  '耳朵':'ĚR DUO — EARS. 耳 looks like a sideways ear shape! 耳朵',
  '手':'SHǑU — HAND. The strokes look like fingers and a palm! 手',
  '脚':'JIǍO — FOOT. Flesh radical (月) + twist = the foot that bends 脚',
  '肚子':'DÙ ZI — BELLY. 肚 = flesh radical + earth = the belly of the earth = tummy! 肚子',
  // ── CLOTHES ──
  '衣服':'YĪ FÚ — CLOTHES. 衣 = garment radical. Looks like a collar and sleeves! 衣服',
  '裤子':'KÙ ZI — TROUSERS. Clothing radical (衤) + ancient = pants since ancient times! 裤子',
  '鞋子':'XIÉ ZI — SHOES. 鞋 has leather (革) on top = leather shoes! 鞋子',
  '帽子':'MÀO ZI — HAT. 帽 has cloth (巾) = a cloth hat on your head! 帽子',
  '穿':'CHUĀN — WEAR/PIERCE. An arrow piercing through = threading yourself into clothes! 穿',
  '戴':'DÀI — WEAR (accessories). 戴 looks complicated = so many accessories to put on! 戴',
  '件':'JIÀN — ITEM/PIECE (of clothing). Person (亻) + open = one open item to wear 件',
  // ── MODAL VERBS ──
  '会':'HUÌ — CAN (learned skill). A person in a meeting = skills learned from meetings! 会',
  '能':'NÉNG — CAN (ability). A bear standing tall = having the strength/ability to! 能',
  '可以':'KĚ YǏ — MAY/PERMITTED. 可 = permitted + 以 = use. You\'re allowed to use it! 可以',
  '应该':'YĪNG GĀI — SHOULD. 应 = respond + 该 = ought. You ought to respond! 应该',
  '要':'YÀO — WANT/NEED. A woman (女) with hands up = I NEED this! 要',
  '必须':'BÌ XŪ — MUST. 必 = certainly + 须 = need. Certainly needed = MUST! 必须',
  // ── DESIRES & PLANS ──
  '想':'XIǍNG — WANT/THINK. Heart (心) looking at trees = daydreaming about something! 想',
  '希望':'XĪ WÀNG — HOPE. 希 = rare + 望 = gaze into distance. Gazing at something rare = hope 希望',
  '需要':'XŪ YÀO — NEED. 需 = require + 要 = want. Require + want = truly need! 需要',
  '打算':'DǍ SUÀN — PLAN. 打 = hit + 算 = calculate. Calculate your hits = make a plan! 打算',
  '准备':'ZHǓN BÈI — PREPARE. 准 = accurate + 备 = ready. Get accurately ready! 准备',
  // ── TIME ADVERBS ──
  '已经':'YǏ JĪNG — ALREADY. 已 = already done + 经 = pass through. Already passed through! 已经',
  '还没':'HÁI MÉI — NOT YET. 还 = still + 没 = not have. Still don\'t have it yet! 还没',
  '快要':'KUÀI YÀO — ABOUT TO. 快 = fast + 要 = want. Fast approaching what you want! 快要',
  '刚才':'GĀNG CÁI — JUST NOW. 刚 = just/hard + 才 = just then = it just happened! 刚才',
  '马上':'MǍ SHÀNG — IMMEDIATELY. 马 = horse + 上 = on/up. On horseback = arriving fast! 马上',
  // ── PAST TIME ──
  '以前':'YǏ QIÁN — BEFORE/IN THE PAST. 以 = using + 前 = front. Looking at what was in front 以前',
  '刚刚':'GĀNG GĀNG — JUST (a moment ago). Doubled = very recently, like just seconds ago! 刚刚',
  '那时候':'NÀ SHÍHOU — AT THAT TIME. 那 = that + 时候 = time. That particular time back then! 那时候',
  '小时候':'XIǍO SHÍHOU — WHEN YOUNG. 小 = small/little + 时候 = time. Small-time = childhood! 小时候',
  '去年':'QÙ NIÁN — LAST YEAR. 去 = go/past + 年 = year. The year that went away! 去年',
  // ── FUTURE ──
  '以后':'YǏ HÒU — AFTER/IN THE FUTURE. 以 = from + 后 = behind/after. From after this point! 以后',
  '将来':'JIĀNG LÁI — FUTURE. 将 = going to + 来 = come. What\'s coming toward you! 将来',
  '愿意':'YUÀN YÌ — WILLING. 愿 = wish + 意 = meaning/heart. Your heart\'s wish = willing! 愿意',
  '决定':'JUÉ DÌNG — DECIDE. 决 = determine + 定 = settle. Settle it firmly = decide! 决定',
  '成功':'CHÉNG GŌNG — SUCCESS. 成 = become + 功 = achievement. Becoming an achiever! 成功',
  // ── COMPARISONS ──
  '一样':'YĪ YÀNG — SAME. 一 = one + 样 = kind/style. One kind = the same! 一样',
  '最':'ZUÌ — MOST. Sun (日) over ear (耳) over fire (火) = the sun is the MOST powerful! 最',
  '更':'GÈNG — EVEN MORE. A sun rising higher = things getting MORE intense! 更',
  '越来越':'YUÈ LÁI YUÈ — MORE AND MORE. 越...越 = the more...the more. Doubled for intensity! 越来越',
  '比较':'BǏ JIÀO — COMPARE/RELATIVELY. 比 = compare + 较 = weigh up. Weighing one against another! 比较',
  // ── CELEBRATIONS ──
  '晚会':'WǍN HUÌ — EVENING PARTY. 晚 = evening + 会 = gathering. An evening gathering! 晚会',
  '聚会':'JÙ HUÌ — PARTY/GATHERING. 聚 = assemble + 会 = meet. Everyone assembles to meet! 聚会',
  '祝贺':'ZHÙ HÈ — CONGRATULATE. 祝 = wish + 贺 = celebrate. Wishing you celebrations! 祝贺',
  '礼物':'LǏ WÙ — GIFT/PRESENT. 礼 = ceremony + 物 = thing. A ceremonial thing = gift! 礼物',
  '送':'SÒNG — GIVE/SEE OFF. Walking away to give something to someone = send a gift! 送',
  // ── SPORTS & HOBBIES ──
  '踢足球':'TĪ ZÚ QIÚ — PLAY FOOTBALL. 踢 = kick + 足 = foot + 球 = ball. Kick foot ball! 踢足球',
  '打篮球':'DǍ LÁN QIÚ — PLAY BASKETBALL. 打 = hit + 篮 = basket + 球 = ball. Hit basket ball! 打篮球',
  '游泳':'YÓU YǑNG — SWIM. Water radical (氵) in both characters = totally aquatic! 游泳',
  '跑步':'PǍO BÙ — RUN. 跑 = run (foot radical 足) + 步 = step. Running steps! 跑步',
  '运动':'YÙN DÒNG — EXERCISE/SPORT. 运 = move/transport + 动 = move. Moving movement! 运动',
  '爱好':'ÀI HÀO — HOBBY. 爱 = love + 好 = good. Things you love that are good = hobby! 爱好',
  // ── TRAVEL ──
  '旅行':'LǙ XÍNG — TRAVEL. 旅 = troops on the move + 行 = go. Moving like an expedition! 旅行',
  '行李箱':'XÍNG LǏ XIĀNG — SUITCASE. 行李 = luggage + 箱 = box. Luggage box = suitcase! 行李箱',
  '护照':'HÙ ZHÀO — PASSPORT. 护 = protect + 照 = document/shine. Protected document! 护照',
  '飞机票':'FĒI JĪ PIÀO — PLANE TICKET. 飞机 = airplane + 票 = ticket. Airplane ticket! 飞机票',
  '出发':'CHŪ FĀ — DEPART. 出 = go out + 发 = set off. Going out and setting off! 出发',
  '方便':'FĀNG BIÀN — CONVENIENT. 方 = square/direction + 便 = easy. Going the easy direction! 方便',
  // ── SCHOOL SUBJECTS ──
  '历史':'LÌ SHǏ — HISTORY. 历 = pass through + 史 = history records. Records of the past! 历史',
  '地理':'DÌ LǏ — GEOGRAPHY. 地 = earth + 理 = logic/pattern. The logic of the earth! 地理',
  '数学':'SHÙ XUÉ — MATHEMATICS. 数 = number + 学 = study. Studying numbers! 数学',
  '作业':'ZUÒ YÈ — HOMEWORK. 作 = make/do + 业 = work/task. Make tasks = homework! 作业',
  // ── WORK ──
  '经理':'JĪNG LǏ — MANAGER. 经 = manage/pass through + 理 = logic. Logically manages things! 经理',
  '同事':'TÓNG SHÌR — COLLEAGUE. 同 = same + 事 = matter/work. Same work = colleague! 同事',
  '开会':'KĀI HUÌ — HOLD A MEETING. 开 = open + 会 = meeting. Open a meeting! 开会',
  '加班':'JIĀ BĀN — OVERTIME. 加 = add + 班 = shift. Adding extra shifts = overtime! 加班',
  '请假':'QǏNG JIÀ — REQUEST LEAVE. 请 = please/request + 假 = leave/holiday. Please give me leave! 请假',
  '报告':'BÀO GÀO — REPORT. 报 = announce + 告 = tell. Announce and tell = report! 报告',
  // ── SERVICES ──
  '信用卡':'XÌN YÒNG KǍ — CREDIT CARD. 信用 = credit/trust + 卡 = card. Trust card! 信用卡',
  '刷卡':'SHUĀ KǍ — SWIPE CARD. 刷 = brush/swipe + 卡 = card. Swipe the card! 刷卡',
  '服务员':'FÚ WÙ YUÁN — WAITER. 服务 = service + 员 = person. Service person! 服务员',
  '菜单':'CÀI DĀN — MENU. 菜 = dish + 单 = list/single. List of dishes = menu! 菜单',
  // ── CONJUNCTIONS ──
  '不但':'BÚ DÀN — NOT ONLY. 不 = not + 但 = only/but. Not only this, but also…! 不但',
  '而且':'ÉR QIĚ — AND ALSO/MOREOVER. 而 = and + 且 = also/moreover. Double "and"! 而且',
  '或者':'HUÒZHĚ — OR. 或 = maybe + 者 = person/thing. Maybe this, maybe that = or! 或者',
  '除了':'CHÚLE — EXCEPT/BESIDES. 除 = remove + 了 = done. Remove it from the list = except! 除了',
  '选择':'XUǍN ZÉ — CHOOSE. 选 = select + 择 = pick. Select and pick = choose! 选择',
  // ── FEELINGS ──
  '难受':'NÁN SHÒU — FEEL BAD/UNWELL. 难 = difficult + 受 = receive/endure. Hard to endure! 难受',
  '着急':'ZHÁO JÍ — ANXIOUS/WORRIED. 着 = attach + 急 = urgent. Something urgent is clinging to you! 着急',
  '紧张':'JǏN ZHĀNG — NERVOUS. 紧 = tight + 张 = stretch. Tight and stretched = nervous! 紧张',
  '害怕':'HÀI PÀ — AFRAID. 害 = harm + 怕 = fear. Fearing harm = afraid! 害怕',
  '放心':'FÀNG XĪN — RELIEVED. 放 = release + 心 = heart. Release your heart = relax! 放心',
  // ── RESULT VERBS ──
  '起来':'QǏ LÁI — START TO / GET UP. 起 = rise + 来 = come. Rising up and coming! 起来',
  '出来':'CHŪ LÁI — COME OUT. 出 = exit + 来 = come. Coming out from inside! 出来',
  '完成':'WÁN CHÉNG — COMPLETE. 完 = finish + 成 = become. Finishing until it becomes done! 完成',
  '解决':'JIĚ JUÉ — SOLVE. 解 = untie/explain + 决 = determine. Untie and determine = solve! 解决',
  // ── BASE VOCAB ──
  '不':'A bird flying AWAY — NOT staying = 不 (bù)',
  '人':'Two legs walking — that\'s a person! Looks like stick legs 人 (rén)',
  '中':'A vertical line piercing the middle = CENTER 中 (zhōng)',
  '国':'A king (王) inside a box (boundary) = COUNTRY 国 (guó)',
  '来':'People coming to rest under a tree = COME 来 (lái)',
  '去':'Someone walking away = GO 去 (qù)',
  '学':'Child reaching up to learn under a roof = STUDY 学 (xué)',
  '买':'Ancient coins (贝) coming up = BUY 买 (mǎi)',
  '卖':'Ancient coins going away = SELL 卖 (mài)',
  '火':'Flames shooting up = FIRE 火 (huǒ)',
  '山':'Three mountain peaks = MOUNTAIN 山 (shān)',
  '木':'A tree with roots = WOOD/TREE 木 (mù)',
  '小':'Three tiny dots = SMALL things 小 (xiǎo)',
};

// ── LESSON STATE ─────────────────────────────────
let _lsStage = 0;
let _lsWords = [];
let _lsLesson = null;
let _fcIdx = 0;
let _fcFlipped = false;
let _matchLeft = [], _matchRight = [], _matchSel = null, _matchDone = 0;
let _quizIdx = 0, _quizScore = 0;
let _speakIdx = 0;

function esc(s) { return (s||'').replace(/'/g, "\\'").replace(/"/g, '&quot;'); }

// ── STAGE PROGRESS BAR ───────────────────────────
function renderStagebar(stage) {
  const stages = ['👀 Intro','🃏 Flashcards','🎯 Match','🎤 Speaking','🏆 Quiz'];
  let h = `<div class="ls-stage-bar">`;
  stages.forEach((s, i) => {
    const cls = i < stage ? 'done' : i === stage ? 'active' : '';
    h += `<div class="ls-stage-dot ${cls}" title="${s}"></div>`;
  });
  h += `</div><div class="ls-nav"><div class="ls-stage-label">`;
  h += `<span>${stages[stage] || '🏆 Complete'}</span></div>`;
  h += `<div style="font-size:12px;color:var(--muted);font-weight:700">Stage ${Math.min(stage+1,5)} of 5</div></div>`;
  return h;
}

// ══ STAGE 0: VISUAL INTRO ════════════════════════
function renderIntro() {
  const words = _lsWords;
  let h = renderStagebar(0);
  h += `<div style="margin-bottom:12px">
    <h2 style="font-size:18px;margin-bottom:4px">👀 Meet Your Words</h2>
    <p style="font-size:13px;color:var(--muted)">Tap each card to hear the pronunciation. Read the memory tip!</p>
  </div>`;
  h += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px;margin-bottom:24px">`;

  const GRADS = [
    'linear-gradient(135deg,#667eea,#764ba2)',
    'linear-gradient(135deg,#f093fb,#f5576c)',
    'linear-gradient(135deg,#4facfe,#00f2fe)',
    'linear-gradient(135deg,#43e97b,#38f9d7)',
    'linear-gradient(135deg,#fa709a,#fee140)',
    'linear-gradient(135deg,#a18cd1,#fbc2eb)',
    'linear-gradient(135deg,#ffd89b,#19547b)',
    'linear-gradient(135deg,#ee0979,#ff6a00)',
  ];

  words.forEach((w, i) => {
    const t = getTone(w.p);
    const tc = TONE_COLORS[t];
    const hook = MEM_HOOKS[w.h] || 'Look at the character — what does it remind you of?';
    const grad = GRADS[i % GRADS.length];
    h += `<div style="border-radius:20px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.1);transition:transform .2s,box-shadow .2s"
      onmouseenter="this.style.transform='translateY(-5px)';this.style.boxShadow='0 14px 36px rgba(0,0,0,.15)'"
      onmouseleave="this.style.transform='';this.style.boxShadow='0 6px 24px rgba(0,0,0,.1)'">
      <div style="background:${grad};padding:22px 16px;text-align:center;cursor:pointer" onclick="speak('${esc(w.h)}')">
        <div style="font-family:var(--cn);font-size:72px;font-weight:900;color:#fff;line-height:1;text-shadow:0 3px 16px rgba(0,0,0,.25)">${w.h}</div>
        <div style="margin-top:6px"><span class="tone-badge t${t}">Tone ${t}: ${TONE_NAMES[t]}</span></div>
      </div>
      <div style="background:var(--card);border:2px solid var(--card-border);border-top:none;padding:14px;border-radius:0 0 18px 18px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:17px;font-weight:900;color:${tc}">${w.p}</span>
          <button onclick="speak('${esc(w.h)}')" style="width:30px;height:30px;border-radius:50%;border:2px solid var(--blue);background:var(--blue-bg);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center">🔊</button>
        </div>
        <div style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:8px">${w.m}</div>
        <div style="font-size:11px;color:var(--text2);line-height:1.5;background:rgba(255,200,0,.08);border-radius:10px;padding:8px 10px;border-left:3px solid var(--yellow)">💡 ${hook}</div>
        <button onclick="saveItem('${esc(w.h)}','${esc(w.p)}','${esc(w.m)}','word')"
          style="margin-top:10px;width:100%;padding:7px;border-radius:10px;border:2px solid var(--card-border);background:var(--card);color:var(--text2);font-size:12px;font-weight:800;cursor:pointer;font-family:var(--font)">♥ Save Word</button>
      </div>
    </div>`;
  });

  h += `</div>`;

  // Example sentences
  if (_lsLesson && _lsLesson.sentences && _lsLesson.sentences.length) {
    h += `<div style="font-weight:900;font-size:15px;margin-bottom:12px">📝 Listen & Read</div>`;
    h += `<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">`;
    _lsLesson.sentences.forEach((s, si) => {
      const safeH = esc(s.cn);
      const COLS = ['#e74c3c','#2980b9','#27ae60','#8e44ad','#d35400','#1abc9c','#e67e22','#16a085'];
      const colored = [...s.cn].map((c, ci) => {
        if (/[\s，。！？、；：""''（）《》]/.test(c)) return `<span style="font-family:var(--cn);font-size:26px;color:var(--text2)">${c}</span>`;
        const col = COLS[ci % COLS.length];
        return `<span style="font-family:var(--cn);font-size:26px;font-weight:900;color:${col};cursor:pointer;padding:0 1px;border-bottom:3px solid ${col}40" onclick="speak('${c.replace(/'/g,"\\'")}')" title="Click to hear">${c}</span>`;
      }).join('');
      h += `<div style="background:var(--card);border:2px solid var(--card-border);border-radius:16px;padding:16px">
        <div style="line-height:2;margin-bottom:8px;flex-wrap:wrap;display:flex;align-items:center">${colored}</div>
        <div style="font-size:13px;color:var(--blue);font-weight:700;margin-bottom:3px">${s.py||''}</div>
        <div style="font-size:12px;color:var(--text2);font-style:italic;margin-bottom:10px">"${s.en||''}"</div>
        <button onclick="speak('${safeH}')" style="display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:10px;border:2px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:12px;font-weight:800;cursor:pointer;font-family:var(--font)">🔊 Listen to full sentence</button>
      </div>`;
    });
    h += `</div>`;
  }

  h += `<button class="btn btn-blue btn-full" style="font-size:15px;padding:15px" onclick="window._lsNext()">🃏 Next: Flashcard Practice →</button>`;
  return h;
}

// ══ STAGE 1: FLASHCARDS ══════════════════════════
function renderFlashcards() {
  _fcIdx = 0; _fcFlipped = false;
  return _flashcardHTML();
}

function _flashcardHTML() {
  const w = _lsWords[_fcIdx];
  if (!w) {
    // All done
    return `<div class="stage-complete">
      <div style="font-size:56px;margin-bottom:12px">🎉</div>
      <h2 style="margin-bottom:8px">Flashcards Complete!</h2>
      <p style="color:var(--text2);margin-bottom:20px">You reviewed all ${_lsWords.length} words!</p>
      <button class="btn btn-green btn-full" style="font-size:15px;padding:14px" onclick="window._lsNext()">🎯 Next: Matching Game →</button>
    </div>`;
  }

  const t = getTone(w.p);
  const tc = TONE_COLORS[t];
  const prog = `${_fcIdx + 1} / ${_lsWords.length}`;
  const hook = MEM_HOOKS[w.h] || 'Study the character shape — what does it remind you of?';

  let h = renderStagebar(1);
  h += `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
    <div style="font-size:13px;font-weight:800;color:var(--muted)">Card ${prog}</div>
    <div style="display:flex;gap:6px">
      ${Array.from({length:_lsWords.length}, (_,i) => `<div style="width:8px;height:8px;border-radius:50%;background:${i<_fcIdx?'var(--green)':i===_fcIdx?'var(--blue)':'var(--card-border)'}"></div>`).join('')}
    </div>
  </div>`;

  h += `<div class="fc-scene" onclick="window._fcFlip()">
    <div class="fc-card" id="fc-main">
      <div class="fc-face fc-front">
        <div style="font-size:11px;font-weight:900;opacity:.6;margin-bottom:8px;letter-spacing:1px;text-transform:uppercase">Tap to Reveal</div>
        <div class="fc-char">${w.h}</div>
        <div style="display:flex;gap:4px;margin-top:14px">
          ${[1,2,3,4,5].map(n=>`<div class="fc-tone-dot${n==parseInt(t)?' active':''}"></div>`).join('')}
        </div>
        <div class="fc-hint">Tap to flip 👆</div>
      </div>
      <div class="fc-face fc-back">
        <div style="font-family:var(--cn);font-size:64px;font-weight:900;color:var(--text);margin-bottom:8px">${w.h}</div>
        <div style="font-size:20px;font-weight:900;color:${tc};margin-bottom:4px">${w.p}</div>
        <span class="tone-badge t${t}" style="margin-bottom:12px">Tone ${t}</span>
        <div style="font-size:18px;font-weight:800;color:var(--text);margin-bottom:12px">${w.m}</div>
        <div style="font-size:12px;color:var(--text2);text-align:center;max-width:260px;line-height:1.5;background:var(--yellow-bg);border-radius:10px;padding:10px;border-left:3px solid var(--yellow)">💡 ${hook}</div>
        <button onclick="event.stopPropagation();speak('${esc(w.h)}')" style="margin-top:14px;padding:9px 20px;border-radius:12px;border:2px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:13px;font-weight:800;cursor:pointer;font-family:var(--font)">🔊 Hear it</button>
      </div>
    </div>
  </div>`;

  h += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px">
    <button onclick="window._fcRate('hard')" style="padding:13px;border-radius:14px;border:2.5px solid var(--red);background:var(--red-bg);color:var(--red-d);font-size:13px;font-weight:900;cursor:pointer;font-family:var(--font)">😓 Hard — See Again</button>
    <button onclick="window._fcRate('got')" style="padding:13px;border-radius:14px;border:2.5px solid var(--green);background:var(--green-bg);color:var(--green-d);font-size:13px;font-weight:900;cursor:pointer;font-family:var(--font)">✓ Got It!</button>
  </div>
  <div style="text-align:center;margin-top:10px;font-size:11px;color:var(--muted)">Tap card to flip • Rate your confidence</div>`;

  return h;
}

window._fcFlip = function() {
  const card = document.getElementById('fc-main');
  if (!card) return;
  _fcFlipped = !_fcFlipped;
  card.classList.toggle('flipped', _fcFlipped);
  if (_fcFlipped) speak(_lsWords[_fcIdx]?.h);
};

window._fcRate = function(rating) {
  if (rating === 'got') {
    addXP(5);
    _fcIdx++;
  } else {
    // Move to end for repeat
    const w = _lsWords.splice(_fcIdx, 1)[0];
    _lsWords.push(w);
    if (_fcIdx >= _lsWords.length) _fcIdx = 0;
  }
  _fcFlipped = false;
  const el = document.getElementById('lesson-body');
  if (el) {
    el.innerHTML = _flashcardHTML();
    if (_fcIdx < _lsWords.length) {
      // Auto-play pronunciation
      speak(_lsWords[_fcIdx]?.h);
    }
  }
};

// ══ STAGE 2: MATCHING GAME ═══════════════════════
function renderMatching() {
  _matchDone = 0; _matchSel = null;
  const ws = shuffle(_lsWords).slice(0, Math.min(_lsWords.length, 6));
  _matchLeft = shuffle(ws);
  _matchRight = shuffle(ws);
  return _matchHTML();
}

function _matchHTML() {
  if (_matchDone >= Math.min(_lsWords.length, 6)) {
    return `<div class="stage-complete">
      <div style="font-size:56px;margin-bottom:12px">🎯</div>
      <h2>Matching Mastered!</h2>
      <p style="color:var(--text2);margin-bottom:20px">Perfect connections — your brain is building those neural pathways!</p>
      <button class="btn btn-green btn-full" style="font-size:15px;padding:14px" onclick="window._lsNext()">🎤 Next: Speaking Practice →</button>
    </div>`;
  }

  let h = renderStagebar(2);
  h += `<div style="margin-bottom:14px">
    <h2 style="font-size:16px;margin-bottom:4px">🎯 Match Characters to Meanings</h2>
    <p style="font-size:12px;color:var(--muted)">Tap a character, then tap its meaning. ${_matchDone}/${Math.min(_lsWords.length,6)} matched</p>
  </div>`;

  h += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">`;
  h += `<div style="display:flex;flex-direction:column;gap:8px">`;
  _matchLeft.forEach((w, i) => {
    h += `<div id="ml-${i}" class="match-tile" style="font-family:var(--cn);font-size:30px;font-weight:900" onclick="window._matchClick('l',${i})">${w.h}</div>`;
  });
  h += `</div><div style="display:flex;flex-direction:column;gap:8px">`;
  _matchRight.forEach((w, i) => {
    h += `<div id="mr-${i}" class="match-tile" style="font-size:13px" onclick="window._matchClick('r',${i})">${w.m}</div>`;
  });
  h += `</div></div>`;
  return h;
}

let _matchSelSide = null, _matchSelIdx = -1;

window._matchClick = function(side, idx) {
  const el = document.getElementById(`m${side}-${idx}`);
  if (!el || el.classList.contains('matched')) return;

  if (_matchSelSide === null) {
    // First selection
    _matchSelSide = side; _matchSelIdx = idx;
    el.classList.add('selected');
  } else if (_matchSelSide === side) {
    // Same side — swap selection
    document.querySelectorAll('.match-tile.selected').forEach(e => e.classList.remove('selected'));
    _matchSelSide = side; _matchSelIdx = idx;
    el.classList.add('selected');
  } else {
    // Second selection — check match
    const li = side === 'r' ? _matchSelIdx : idx;
    const ri = side === 'r' ? idx : _matchSelIdx;
    const lEl = document.getElementById(`ml-${li}`);
    const rEl = document.getElementById(`mr-${ri}`);
    if (_matchLeft[li] && _matchRight[ri] && _matchLeft[li].h === _matchRight[ri].h) {
      // Match!
      lEl.classList.add('matched');
      rEl.classList.add('matched');
      lEl.classList.remove('selected');
      rEl.classList.remove('selected');
      speak(_matchLeft[li].h);
      addXP(8);
      _matchDone++;
      if (_matchDone >= Math.min(_lsWords.length, 6)) {
        setTimeout(() => {
          const e = document.getElementById('lesson-body');
          if (e) e.innerHTML = _matchHTML();
        }, 600);
      }
    } else {
      // Wrong
      lEl && lEl.classList.add('wrong');
      rEl && rEl.classList.add('wrong');
      setTimeout(() => {
        lEl && lEl.classList.remove('wrong','selected');
        rEl && rEl.classList.remove('wrong','selected');
      }, 700);
    }
    _matchSelSide = null; _matchSelIdx = -1;
  }
};

// ══ STAGE 3: SPEAKING PRACTICE ═══════════════════
function renderSpeaking() {
  _speakIdx = 0;
  return _speakHTML();
}

function _speakHTML() {
  if (_speakIdx >= _lsWords.length) {
    return `<div class="stage-complete">
      <div style="font-size:56px;margin-bottom:12px">🎤</div>
      <h2>Speaking Done!</h2>
      <p style="color:var(--text2);margin-bottom:20px">Great pronunciation practice! Your tones are improving!</p>
      <button class="btn btn-green btn-full" style="font-size:15px;padding:14px" onclick="window._lsNext()">🏆 Final Quiz →</button>
    </div>`;
  }

  const w = _lsWords[_speakIdx];
  const t = getTone(w.p);
  const tc = TONE_COLORS[t];
  let h = renderStagebar(3);
  h += `<div style="text-align:center;margin-bottom:20px">
    <div style="font-size:12px;font-weight:800;color:var(--muted);margin-bottom:10px">Word ${_speakIdx+1} of ${_lsWords.length}</div>
    <div style="background:var(--card);border:3px solid var(--card-border);border-radius:24px;padding:24px;display:inline-block;margin-bottom:16px;min-width:200px">
      <div style="font-family:var(--cn);font-size:88px;font-weight:900;line-height:1;cursor:pointer;margin-bottom:10px" onclick="speak('${esc(w.h)}')">${w.h}</div>
      <div style="font-size:22px;font-weight:900;color:${tc};margin-bottom:4px">${w.p}</div>
      <span class="tone-badge t${t}">Tone ${t}: ${TONE_NAMES[t]}</span>
      <div style="font-size:15px;color:var(--text2);margin-top:8px">${w.m}</div>
    </div>
  </div>
  <div style="text-align:center;margin-bottom:12px;font-size:13px;color:var(--muted)">First listen, then try to say it:</div>`;

  h += `<div style="display:flex;gap:10px;margin-bottom:16px">
    <button onclick="speak('${esc(w.h)}')" style="flex:1;padding:14px;border-radius:14px;border:2.5px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:14px;font-weight:900;cursor:pointer;font-family:var(--font)">🔊 Listen First</button>
    <button onclick="speak('${esc(w.h)}')" style="flex:1;padding:14px;border-radius:14px;border:2.5px solid var(--blue);background:var(--blue-bg);color:var(--blue-d);font-size:14px;font-weight:900;cursor:pointer;font-family:var(--font)">🔊 Hear Again</button>
  </div>`;

  // Check for speech recognition support
  const hasSpeech = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  h += `<div class="speak-panel" id="speak-panel-${_speakIdx}">
    <div style="font-size:13px;font-weight:800;color:var(--text)">🎤 Now say it out loud!</div>
    <div class="speak-wave">
      ${[1,2,3,4,5].map(i=>`<div class="speak-bar" style="height:${8+i*4}px"></div>`).join('')}
    </div>`;

  if (hasSpeech) {
    h += `<button id="speak-btn-${_speakIdx}" onclick="window._doSpeak(${_speakIdx},'${esc(w.h)}','${esc(w.p)}')"
      style="padding:14px 28px;border-radius:99px;border:none;background:var(--red);color:#fff;font-size:15px;font-weight:900;cursor:pointer;font-family:var(--font);box-shadow:0 5px 0 var(--red-d)">
      🎤 Tap to Speak
    </button>`;
  } else {
    h += `<div style="font-size:13px;color:var(--muted);text-align:center">
      ⚠️ Voice recognition needs Chrome/Edge browser.<br>
      <strong style="color:var(--text)">Practice saying "${w.h}" (${w.p}) aloud!</strong>
    </div>
    <button onclick="window._speakSkip(${_speakIdx})"
      style="padding:12px 24px;border-radius:12px;border:2px solid var(--green);background:var(--green-bg);color:var(--green-d);font-size:13px;font-weight:800;cursor:pointer;font-family:var(--font)">✓ Done Practicing</button>`;
  }

  h += `<div id="speak-result-${_speakIdx}" style="display:none;width:100%"></div>
  </div>`;

  // Skip / next buttons
  h += `<div style="display:flex;gap:10px;margin-top:14px">
    <button onclick="window._speakSkip(${_speakIdx})" style="flex:1;padding:12px;border-radius:12px;border:2px solid var(--card-border);background:var(--card);color:var(--text2);font-size:13px;font-weight:800;cursor:pointer;font-family:var(--font)">Skip →</button>
  </div>`;

  return h;
}

window._doSpeak = function(idx, cn, py) {
  const btn = document.getElementById(`speak-btn-${idx}`);
  const panel = document.getElementById(`speak-panel-${idx}`);
  const result = document.getElementById(`speak-result-${idx}`);
  if (!btn || !panel) return;

  // Play the word first, then record
  speak(cn);

  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Rec) return;

  btn.disabled = true;
  btn.textContent = '🔴 Listening...';
  panel.classList.add('recording');

  const rec = new Rec();
  rec.lang = 'zh-CN';
  rec.interimResults = false;
  rec.maxAlternatives = 5;

  let done = false;
  const finish = () => {
    if (done) return; done = true;
    btn.textContent = '🎤 Tap to Speak';
    btn.disabled = false;
    panel.classList.remove('recording');
  };

  rec.onresult = function(e) {
    finish();
    const heard = e.results[0][0].transcript;
    const confidence = e.results[0][0].confidence;
    // Simple match check — heard contains the character or vice versa
    const chars = [...cn];
    const heardChars = [...heard];
    const matches = chars.filter(c => heardChars.includes(c)).length;
    const matchRatio = matches / chars.length;
    
    let score, msg, cls;
    if (matchRatio >= 0.8 || heard === cn) {
      score = '🌟 Excellent!'; cls = 'perfect';
      msg = `Perfect pronunciation! You said: "${heard}"`;
      addXP(15);
    } else if (matchRatio >= 0.4 || confidence > 0.6) {
      score = '👍 Good try!'; cls = 'good';
      msg = `You said: "${heard}" — keep practicing the tones!`;
      addXP(8);
    } else {
      score = '🔄 Try again!'; cls = 'try-again';
      msg = `You said: "${heard}" — the correct pronunciation is: ${py}`;
      addXP(3);
    }

    if (result) {
      result.style.display = 'block';
      result.innerHTML = `<div style="padding:12px;border-radius:12px;background:var(--${cls==='perfect'?'green':cls==='good'?'yellow':'red'}-bg);border:2px solid var(--${cls==='perfect'?'green':cls==='good'?'yellow':'red'});font-size:13px;color:var(--${cls==='perfect'?'green':cls==='good'?'yellow':'red'}-d);width:100%">
        <div style="font-weight:900;font-size:15px;margin-bottom:4px">${score}</div>
        <div>${msg}</div>
        <button onclick="window._speakNext(${idx})" style="margin-top:10px;width:100%;padding:10px;border-radius:10px;border:none;background:${cls==='perfect'?'var(--green)':cls==='good'?'var(--yellow)':'var(--red)'};color:#fff;font-size:13px;font-weight:900;cursor:pointer;font-family:var(--font)">Next Word →</button>
      </div>`;
    }
  };

  rec.onerror = function(e) {
    finish();
    if (result) {
      result.style.display = 'block';
      result.innerHTML = `<div style="padding:10px;border-radius:10px;background:var(--yellow-bg);border:2px solid var(--yellow);font-size:12px;color:var(--yellow-d)">
        ⚠️ Mic issue: ${e.error}. ${e.error === 'not-allowed' ? 'Please allow microphone in browser settings.' : 'Try again or use Chrome/Edge.'}
        <br><button onclick="window._speakNext(${idx})" style="margin-top:8px;padding:8px 16px;border-radius:9px;border:none;background:var(--yellow);color:#fff;font-weight:800;cursor:pointer;font-family:var(--font)">Continue Anyway →</button>
      </div>`;
    }
  };

  // Timeout fallback
  const timeout = setTimeout(() => {
    try { rec.stop(); } catch(e) {}
    finish();
    if (result && result.style.display === 'none') {
      result.style.display = 'block';
      result.innerHTML = `<div style="padding:10px;border-radius:10px;background:var(--yellow-bg);border:2px solid var(--yellow);font-size:12px;color:var(--yellow-d)">
        ⏱️ Didn't catch that — say "${cn}" (${py}) and try again!
        <br><button onclick="window._speakNext(${idx})" style="margin-top:8px;padding:8px 16px;border-radius:9px;border:none;background:var(--green);color:#fff;font-weight:800;cursor:pointer;font-family:var(--font)">Next Word →</button>
      </div>`;
    }
  }, 6000);

  rec.onend = () => { clearTimeout(timeout); finish(); };

  try {
    setTimeout(() => {
      try { rec.start(); }
      catch(err) { finish(); }
    }, 1200);
  } catch(err) { finish(); }
};

window._speakSkip = function(idx) { _speakNext(idx); };
window._speakNext = function(idx) {
  _speakIdx++;
  const el = document.getElementById('lesson-body');
  if (el) el.innerHTML = _speakHTML();
};

// ══ STAGE 4: QUIZ ═════════════════════════════════
function renderQuiz() {
  _quizIdx = 0; _quizScore = 0;
  return _quizHTML();
}

function _quizHTML() {
  if (_quizIdx >= _lsWords.length) {
    const pct = Math.round((_quizScore / _lsWords.length) * 100);
    const grade = pct >= 80 ? '🌟 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Practicing!';
    return `<div class="stage-complete">
      <div style="font-size:64px;margin-bottom:12px">${pct>=80?'🏆':pct>=60?'🥈':'🎯'}</div>
      <h2 style="margin-bottom:6px">${grade}</h2>
      <div style="font-size:48px;font-weight:900;color:${pct>=80?'var(--green)':pct>=60?'var(--yellow-d)':'var(--red)'};margin:12px 0">${pct}%</div>
      <p style="color:var(--text2);margin-bottom:8px">${_quizScore} / ${_lsWords.length} correct</p>
      <div style="background:var(--card);border:2px solid var(--card-border);border-radius:14px;padding:14px;margin:16px 0;font-size:13px;color:var(--text2)">
        +${_quizScore * 10} XP earned from quiz! 🎉
      </div>
      <button class="btn btn-green btn-full" style="font-size:16px;padding:16px" onclick="window._lsFinish()">✓ Complete Lesson — Earn 30 XP!</button>
    </div>`;
  }

  const w = _lsWords[_quizIdx];
  const t = getTone(w.p);
  const tc = TONE_COLORS[t];
  // Pick 3 distractors
  const distractors = shuffle(_lsWords.filter(x => x.h !== w.h)).slice(0,3);
  const opts = shuffle([w, ...distractors]);

  // Question type alternates
  const qType = _quizIdx % 3;

  let h = renderStagebar(4);
  h += `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
    <div style="font-size:13px;font-weight:800;color:var(--muted)">Question ${_quizIdx+1} / ${_lsWords.length}</div>
    <div style="font-size:13px;font-weight:900;color:var(--green)">Score: ${_quizScore}/${_quizIdx}</div>
  </div>`;

  if (qType === 0) {
    // MCQ: What does this mean?
    h += `<div style="text-align:center;margin-bottom:20px;padding:20px;background:var(--card);border:3px solid var(--card-border);border-radius:20px">
      <div style="font-size:12px;font-weight:800;color:var(--muted);margin-bottom:8px">What does this mean?</div>
      <div style="font-family:var(--cn);font-size:80px;font-weight:900;cursor:pointer;margin-bottom:8px" onclick="speak('${esc(w.h)}')">${w.h}</div>
      <div style="font-size:16px;font-weight:900;color:${tc}">${w.p}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${opts.map(o => `<button onclick="window._quizAns(this,'${esc(o.h)}','${esc(w.h)}')" class="exam-opt-btn" style="font-size:14px">${o.m}</button>`).join('')}
    </div>`;
  } else if (qType === 1) {
    // MCQ: Which character means...?
    h += `<div style="text-align:center;margin-bottom:20px;padding:20px;background:var(--card);border:3px solid var(--card-border);border-radius:20px">
      <div style="font-size:12px;font-weight:800;color:var(--muted);margin-bottom:8px">Which character means...</div>
      <div style="font-size:28px;font-weight:900;color:var(--text)">${w.m}</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
      ${opts.map(o => `<button onclick="window._quizAns(this,'${esc(o.h)}','${esc(w.h)}')" class="exam-opt-btn" style="font-family:var(--cn);font-size:36px;font-weight:900;text-align:center">${o.h}</button>`).join('')}
    </div>`;
  } else {
    // Tone matching quiz
    const toneOpts = shuffle(['1','2','3','4','5']).slice(0,4);
    if (!toneOpts.includes(t)) { toneOpts[0] = t; }
    const toneShuffled = shuffle(toneOpts);
    h += `<div style="text-align:center;margin-bottom:20px;padding:20px;background:var(--card);border:3px solid var(--card-border);border-radius:20px">
      <div style="font-size:12px;font-weight:800;color:var(--muted);margin-bottom:8px">What tone is this?</div>
      <div style="font-family:var(--cn);font-size:80px;font-weight:900;cursor:pointer;margin-bottom:8px" onclick="speak('${esc(w.h)}')">${w.h}</div>
      <div style="font-size:16px;font-weight:700;color:${tc}">${w.p}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${toneShuffled.map(tn => `<button onclick="window._quizToneAns(this,'${tn}','${t}')" class="exam-opt-btn" style="font-size:13px">
        Tone ${tn}: ${TONE_NAMES[tn]}
      </button>`).join('')}
    </div>`;
  }

  h += `<div id="quiz-result" style="display:none;margin-top:12px"></div>`;
  return h;
}

window._quizAns = function(btn, chosen, correct) {
  document.querySelectorAll('.exam-opt-btn').forEach(b => b.disabled = true);
  const ok = chosen === correct;
  btn.style.background = ok ? 'var(--green-bg)' : 'var(--red-bg)';
  btn.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
  btn.style.color = ok ? 'var(--green-d)' : 'var(--red-d)';
  if (ok) { addXP(10); _quizScore++; speak(correct); }
  else {
    // Highlight correct
    document.querySelectorAll('.exam-opt-btn').forEach(b => {
      if (b !== btn) {
        const bText = b.textContent.trim();
        const cWord = _lsWords.find(w => w.h === correct);
        if (cWord && (bText === cWord.m || bText === cWord.h)) {
          b.style.background = 'var(--green-bg)'; b.style.borderColor = 'var(--green)'; b.style.color = 'var(--green-d)';
        }
      }
    });
  }
  const r = document.getElementById('quiz-result');
  if (r) {
    r.style.display = 'block';
    const cWord = _lsWords.find(w => w.h === correct);
    r.innerHTML = `<div style="padding:12px 16px;border-radius:14px;background:${ok?'var(--green-bg)':'var(--yellow-bg)'};border:2px solid ${ok?'var(--green)':'var(--yellow)'};color:${ok?'var(--green-d)':'var(--yellow-d)'};font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:space-between">
      <span>${ok?'🌟 Correct!':'The answer was: ' + (cWord?cWord.m:'?')}</span>
      <button onclick="window._quizNext()" style="padding:9px 20px;border-radius:10px;border:none;background:${ok?'var(--green)':'var(--yellow)'};color:#fff;font-weight:900;cursor:pointer;font-size:13px;font-family:var(--font)">Next →</button>
    </div>`;
  }
};

window._quizToneAns = function(btn, chosen, correct) {
  document.querySelectorAll('.exam-opt-btn').forEach(b => b.disabled = true);
  const ok = chosen === correct;
  btn.style.background = ok ? 'var(--green-bg)' : 'var(--red-bg)';
  btn.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
  btn.style.color = ok ? 'var(--green-d)' : 'var(--red-d)';
  if (ok) { addXP(10); _quizScore++; }
  const r = document.getElementById('quiz-result');
  if (r) {
    r.style.display = 'block';
    r.innerHTML = `<div style="padding:12px 16px;border-radius:14px;background:${ok?'var(--green-bg)':'var(--yellow-bg)'};border:2px solid ${ok?'var(--green)':'var(--yellow)'};color:${ok?'var(--green-d)':'var(--yellow-d)'};font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:space-between">
      <span>${ok?'🌟 Correct!':'Correct tone was: Tone '+correct+' — '+TONE_NAMES[correct]}</span>
      <button onclick="window._quizNext()" style="padding:9px 20px;border-radius:10px;border:none;background:${ok?'var(--green)':'var(--yellow)'};color:#fff;font-weight:900;cursor:pointer;font-size:13px;font-family:var(--font)">Next →</button>
    </div>`;
  }
};

window._quizNext = function() {
  _quizIdx++;
  const el = document.getElementById('lesson-body');
  if (el) el.innerHTML = _quizHTML();
};

// ══ NAVIGATION ════════════════════════════════════
window._lsNext = function() {
  _lsStage++;
  const el = document.getElementById('lesson-body');
  if (!el) return;
  if (_lsStage === 1) el.innerHTML = renderFlashcards();
  else if (_lsStage === 2) el.innerHTML = renderMatching();
  else if (_lsStage === 3) el.innerHTML = renderSpeaking();
  else if (_lsStage === 4) el.innerHTML = renderQuiz();
  else el.innerHTML = renderIntro(); // fallback
  window.scrollTo(0,0);
};

window._lsFinish = function() {
  if (typeof completeLesson === 'function') {
    completeLesson();
  } else {
    if (window.curLessonLesson) {
      const lesson = window.curLessonLesson;
      if (window.db && !window.db.done[lesson.id]) {
        window.db.done[lesson.id] = true;
        if (typeof saveDB === 'function') saveDB();
        if (typeof addXP === 'function') addXP(30);
      }
      if (typeof toast === 'function') toast('Lesson complete! +30 XP 🎉','success');
      if (typeof go === 'function') go('learn');
    }
  }
};

// ══ MASTER OVERRIDE ═══════════════════════════════
window._renderLessonNow = function() {
  const el = document.getElementById('lesson-body');
  const lesson = window.curLessonLesson;
  if (!el || !lesson) {
    if (el) el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text2)"><div style="font-size:48px;margin-bottom:16px">📚</div><p>Select a lesson from Courses to begin!</p></div>';
    return;
  }

  // Reset state
  _lsStage = 0;
  _lsLesson = lesson;
  _lsWords = lesson.words.map(wh => (typeof ALL_WORDS !== 'undefined' ? ALL_WORDS : []).find(w => w.h === wh)).filter(Boolean);

  if (!_lsWords.length) {
    el.innerHTML = '<div style="padding:40px;text-align:center"><p>No words found for this lesson.</p></div>';
    return;
  }

  el.innerHTML = renderIntro();

  // Auto-play first word
  if (_lsWords[0]) setTimeout(() => speak(_lsWords[0].h), 500);
};

// Also fix completeLesson reference bug
const _origComplete = window.completeLesson;
window.completeLesson = function() {
  const lesson = window.curLessonLesson || (typeof curLessonLesson !== 'undefined' ? curLessonLesson : null);
  if (!lesson) { if (typeof go === 'function') go('learn'); return; }
  try {
    if (window.db && !window.db.done[lesson.id]) {
      window.db.done[lesson.id] = true;
      if (typeof saveDB === 'function') saveDB();
      if (typeof addXP === 'function') addXP(30);
    }
    if (typeof srsAddLesson === 'function') srsAddLesson(lesson);
  } catch(e) {}
  if (typeof toast === 'function') toast('Lesson complete! +30 XP 🎉','success');
  if (typeof go === 'function') go('learn');
};

console.log('[HanyuStar+] Upgraded lesson system loaded ✓');
})();

// --- Component Script --- 

/* ═══════════════════════════════════════════════════════════
   _MIC — Universal microphone engine
   Works on ALL mobile browsers (iOS Safari, Android Chrome)
   Uses MediaRecorder → Groq Whisper STT → same callback chain
   ═══════════════════════════════════════════════════════════ */
(function() {
'use strict';

const GROQ_KEY = 'your_groq_api_key_here';
const MAX_REC_MS = 8000; // auto-stop after 8s

let _recorder = null, _chunks = [], _stream = null;
let _onResult = null, _onError = null;
let _timerInt = null, _startTime = 0;
let _autoStopT = null;
let _lang = 'zh-CN';
let _busy = false;

const $ov  = () => document.getElementById('mic-modal-overlay');
const $ring= () => document.getElementById('mic-pulse-ring');
const $bars= () => document.getElementById('mic-wave-bars');
const $tmr = () => document.getElementById('mic-timer');
const $st  = () => document.getElementById('mic-status');
const $conf= () => document.getElementById('mic-confirm-btn');
const $svg = () => document.getElementById('mic-icon-svg');

function _showModal() {
  const ov = $ov(); if (!ov) return;
  ov.classList.add('active');
  _setRecordingUI();
}
function _hideModal() {
  const ov = $ov(); if (ov) ov.classList.remove('active');
  _clearTimer();
}
function _setRecordingUI() {
  const ring=$ring(),bars=$bars(),tmr=$tmr(),st=$st(),conf=$conf(),svg=$svg();
  if(ring){ring.className='';ring.style.borderColor='#ff4b4b';ring.style.background='radial-gradient(circle,rgba(255,75,75,.18),rgba(255,75,75,.04))';}
  if(bars){bars.style.display='flex';Array.from(bars.children).forEach(b=>{b.style.background='#ff4b4b';b.style.animation='waveBar .6s ease-in-out infinite alternate';});}
  if(tmr){tmr.textContent='0:00';tmr.style.color='#ff4b4b';}
  if(st) st.textContent='Speak clearly into your mic';
  if(conf) conf.style.display='none';
  if(svg) { svg.setAttribute('stroke','#ff4b4b'); }
}
function _setTranscribingUI() {
  const ring=$ring(),bars=$bars(),tmr=$tmr(),st=$st();
  if(ring){ring.className='idle';ring.style.borderColor='#4fb8e8';ring.style.background='radial-gradient(circle,rgba(79,184,232,.15),rgba(79,184,232,.04))';}
  if(bars){bars.innerHTML='<div class="mic-transcribing-spinner"></div>';}
  if(tmr) tmr.style.display='none';
  if(st)  st.innerHTML='<strong>Transcribing with AI...</strong><br><span style="font-size:11px;color:var(--muted)">Just a moment</span>';
}
function _setDoneUI() {
  const ring=$ring(),tmr=$tmr();
  if(ring){ring.className='done';}
  if(tmr) tmr.style.display='';
}
function _startTimer() {
  _startTime = Date.now();
  _clearTimer();
  _timerInt = setInterval(() => {
    const s = Math.floor((Date.now() - _startTime) / 1000);
    const m = Math.floor(s/60), ss = s%60;
    const el = $tmr();
    if (el) el.textContent = m + ':' + String(ss).padStart(2,'0');
  }, 200);
}
function _clearTimer() {
  if (_timerInt) { clearInterval(_timerInt); _timerInt = null; }
  if (_autoStopT) { clearTimeout(_autoStopT); _autoStopT = null; }
}

// Get best supported MIME type
function _getMime() {
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
    'audio/mpeg',
    ''
  ];
  for (const t of candidates) {
    if (!t || MediaRecorder.isTypeSupported(t)) return t;
  }
  return '';
}

async function _transcribeBlob(blob) {
  // Determine extension from mime
  const mime = blob.type || 'audio/webm';
  let ext = 'webm';
  if (mime.includes('ogg')) ext = 'ogg';
  else if (mime.includes('mp4') || mime.includes('mpeg')) ext = 'mp4';

  const formData = new FormData();
  formData.append('file', blob, 'recording.' + ext);
  formData.append('model', 'whisper-large-v3');
  formData.append('language', _lang === 'zh-CN' ? 'zh' : _lang.split('-')[0]);
  formData.append('response_format', 'json');

  const resp = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + GROQ_KEY },
    body: formData
  });
  if (!resp.ok) throw new Error('Whisper API error ' + resp.status);
  const data = await resp.json();
  return (data.text || '').trim();
}

// Build a SpeechRecognition-compatible synthetic event
function _buildSyntheticEvent(transcript) {
  const altObj = { transcript, confidence: 0.9 };
  const resultObj = [altObj];
  resultObj.isFinal = true;
  resultObj[0] = altObj;
  // Make it iterable like a SpeechRecognitionResult
  const results = { length: 1, 0: resultObj };
  results[Symbol.iterator] = function* () { yield resultObj; };
  return { results };
}

async function _stopAndTranscribe() {
  if (!_recorder || _recorder.state === 'inactive') return;
  _clearTimer();
  _setTranscribingUI();

  // Stop recorder — this triggers onstop
  _recorder.stop();
}

// Main public API
const MIC = {
  /**
   * Start recording. Calls onResult(syntheticEvent) or onError({error})
   * @param {string} lang - BCP-47 like 'zh-CN'
   * @param {function} onResult
   * @param {function} onError
   */
  async start(lang, onResult, onError) {
    if (_busy) {
      MIC.cancel();
      await new Promise(r => setTimeout(r, 200));
    }
    _lang = lang || 'zh-CN';
    _onResult = onResult;
    _onError  = onError;
    _chunks   = [];
    _busy     = true;

    // Request mic
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch(err) {
      _busy = false;
      _hideModal();
      if (_onError) _onError({ error: err.name === 'NotAllowedError' ? 'not-allowed' : 'audio-capture' });
      return;
    }
    _stream = stream;

    // Create recorder
    const mime = _getMime();
    const opts = mime ? { mimeType: mime } : {};
    try { _recorder = new MediaRecorder(stream, opts); }
    catch(e) { _recorder = new MediaRecorder(stream); }

    _recorder.ondataavailable = e => { if (e.data && e.data.size > 0) _chunks.push(e.data); };

    _recorder.onstop = async () => {
      // Release stream
      if (_stream) { _stream.getTracks().forEach(t => t.stop()); _stream = null; }
      _busy = false;

      if (!_chunks.length) {
        _hideModal();
        if (_onError) _onError({ error: 'no-speech' });
        return;
      }

      const mimeUsed = _recorder.mimeType || 'audio/webm';
      const blob = new Blob(_chunks, { type: mimeUsed });
      _chunks = [];

      try {
        const transcript = await _transcribeBlob(blob);
        _setDoneUI();
        _hideModal();
        if (!transcript) {
          if (_onError) _onError({ error: 'no-speech' });
          return;
        }
        // Fire in same shape SpeechRecognition would
        const synEv = _buildSyntheticEvent(transcript);
        if (_onResult) _onResult(synEv);
      } catch(err) {
        console.error('[MIC] Transcription failed:', err);
        _hideModal();
        if (_onError) _onError({ error: 'network' });
      }
    };

    _recorder.onerror = (e) => {
      _hideModal();
      _busy = false;
      if (_onError) _onError({ error: 'audio-capture' });
    };

    _recorder.start(100); // collect every 100ms
    _showModal();
    _startTimer();

    // Auto-stop after MAX_REC_MS — then show "Done" button to confirm
    _autoStopT = setTimeout(() => {
      const conf = $conf(), st = $st();
      if (conf) conf.style.display = 'inline-block';
      if (st)   st.textContent = 'Tap ✓ Done when finished speaking';
    }, MAX_REC_MS);
  },

  // User tapped the ring — stop recording
  toggleStop() {
    if (_recorder && _recorder.state === 'recording') {
      _stopAndTranscribe();
    }
  },

  // User tapped Confirm button
  confirmStop() {
    _stopAndTranscribe();
  },

  cancel() {
    _clearTimer();
    if (_recorder && _recorder.state !== 'inactive') {
      _onResult = null; // suppress callback
      try { _recorder.stop(); } catch(e) {}
    }
    if (_stream) { _stream.getTracks().forEach(t => t.stop()); _stream = null; }
    _busy = false;
    _chunks = [];
    _hideModal();
    if (_onError) { const fn = _onError; _onError = null; fn({ error: 'aborted' }); }
  }
};

window._MIC = MIC;

// ── PATCH: replace all SpeechRecognition sites ─────────────────

/**
 * Universal mic entry point — detects whether to use SpeechRecognition (desktop)
 * or _MIC (mobile / no SR support)
 */
window._universalStartSpeech = function(lang, onResult, onError) {
  const hasSR = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Use MediaRecorder path on mobile OR when SR isn't available
  if (!hasSR || isMobile) {
    window._MIC.start(lang || 'zh-CN', onResult, onError);
    return null; // no SR instance to return
  }

  // Desktop with SR: use existing system
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new Rec();
  rec.lang = lang || 'zh-CN';
  rec.continuous = false;
  rec.interimResults = false;
  rec.maxAlternatives = 5;
  rec.onresult = onResult;
  rec.onerror  = onError;
  rec.onspeechend = () => { try { rec.stop(); } catch(e) {} };
  rec.start();
  return rec;
};

// ── PATCH: startPronRecording ─────────────────────────────────
window._origStartPronRecording = window.startPronRecording;
window.startPronRecording = function() {
  const btn = document.getElementById('pronlab-record-btn');
  const resultDiv = document.getElementById('pronlab-result');
  if (btn) { btn.disabled = true; btn.textContent = '🔴 Recording...'; btn.style.background='var(--red)'; }
  if (resultDiv) { resultDiv.style.display='block'; resultDiv.innerHTML='<div style="text-align:center;padding:16px"><div style="font-size:24px;margin-bottom:8px">🎤</div><div style="font-size:13px;color:var(--muted)">Speak now — say the word!</div></div>'; }

  window._universalStartSpeech('zh-CN',
    async (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
      window.pronlabTranscript = transcript;
      if (typeof toast === 'function') toast(`Heard: "${transcript}" 🔊`, 'info');
      if (resultDiv) resultDiv.innerHTML = '<div style="text-align:center;padding:20px"><div style="font-size:28px;animation:spin 1s linear infinite;display:inline-block">⚙️</div><div style="font-size:13px;color:var(--muted);margin-top:8px">Analyzing with AI...</div></div>';
      const word = window.pronlabWord || {h:'你',p:'nǐ'};
      let analysis = '';
      if (typeof groqAnalyzePronunciation === 'function') {
        analysis = await groqAnalyzePronunciation(transcript, word.h, word.p);
      } else if (typeof groqAnalyze === 'function') {
        analysis = await groqAnalyze(transcript, word.h, word.p);
      }
      if (resultDiv) {
        resultDiv.innerHTML = `<div style="font-size:12px;color:var(--muted);font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:6px">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>AI Pronunciation Analysis</div>
          <div id="pronlab-feedback" style="font-size:14px;color:var(--text2);line-height:1.6">${analysis || '<span style="color:var(--green)">✓ Great effort! Keep going!</span>'}</div>
          <div style="margin-top:16px;display:flex;gap:10px;justify-content:center">
            <button class="btn btn-ghost btn-sm" onclick="renderPronLab()">Try Again</button>
            <button class="btn btn-green btn-sm" onclick="addXP(15);toast('+15 XP!','success');renderPronLab()">Next Word ✓</button>
          </div>`;
      }
      if (typeof addXP === 'function') addXP(15);
      if (btn) { btn.disabled = false; btn.textContent = '🎤 Speak Now'; btn.style.background = ''; }
    },
    (err) => {
      if (err && err.error === 'aborted') {
        if (btn) { btn.disabled = false; btn.textContent = '🎤 Speak Now'; btn.style.background = ''; }
        return;
      }
      if (typeof toast === 'function') toast('Mic error — check permissions', 'error');
      if (resultDiv) resultDiv.innerHTML = `<div style="padding:12px;border-radius:12px;background:var(--red-bg);border:2px solid var(--red);font-size:13px;color:var(--red-d)"><strong>Microphone error: ${err?.error||'unknown'}</strong><br>Make sure you've allowed microphone access in your browser.</div>`;
      if (btn) { btn.disabled = false; btn.textContent = '🎤 Speak Now'; btn.style.background = ''; }
    }
  );
};

// ── PATCH: runSpeakingTest ────────────────────────────────────
window._origRunSpeakingTest = window.runSpeakingTest;
window.runSpeakingTest = function(expected, pinyin) {
  const micBtn   = document.getElementById('sp-mic-btn');
  const resultEl = document.getElementById('sp-result');
  const charRow  = document.getElementById('sp-char-row');
  const nextBtn  = document.getElementById('sp-next-btn');
  const skipBtn  = document.getElementById('sp-skip-btn');

  if (micBtn) {
    micBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:7px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Listening...</span>';
    micBtn.style.background = '#ff4b4b';
    micBtn.disabled = true;
  }
  if (resultEl) resultEl.innerHTML = '<span style="color:var(--blue);font-weight:800;animation:pulse 1s infinite;display:inline-block">Recording your voice...</span>';

  window._universalStartSpeech('zh-CN',
    async (e) => {
      const alts = Array.from(e.results[0]).map(a => a.transcript.replace(/[\s，。！？]/g,''));
      const expClean = expected.replace(/[\s，。！？]/g,'');

      let bestScore = 0, bestMatch = alts[0] || '';
      for (const alt of alts) {
        const sc = (typeof scorePronunciation === 'function') ? scorePronunciation(alt, expClean) : 50;
        if (sc > bestScore) { bestScore = sc; bestMatch = alt; }
      }

      if (charRow && typeof spAnalyzeChars === 'function') {
        const analysis = spAnalyzeChars(expClean, bestMatch);
        charRow.innerHTML = `<div class="pron-sentence-wrap">` + analysis.map(ca => {
          const wClass = ca.status==='correct'?'pron-word-correct':ca.status==='close'?'pron-word-close':'pron-word-wrong';
          const dot = ca.status==='correct'?'✓':ca.status==='close'?'~':'✗';
          return `<div class="${wClass}"><span class="pron-char-text">${ca.char}</span><span class="pron-status-dot">${dot}</span></div>`;
        }).join('') + `</div>`;
      }

      const color = bestScore>=90?'#58cc02':bestScore>=65?'#ffc800':'#ff4b4b';
      const grade = bestScore>=90?'Excellent!':bestScore>=70?'Good job!':bestScore>=50?'Keep going!':'Try again!';
      const correct = (typeof spAnalyzeChars==='function') ? spAnalyzeChars(expClean,bestMatch).filter(a=>a.status==='correct').length : 0;
      const close   = (typeof spAnalyzeChars==='function') ? spAnalyzeChars(expClean,bestMatch).filter(a=>a.status==='close').length : 0;
      const wrong   = (typeof spAnalyzeChars==='function') ? spAnalyzeChars(expClean,bestMatch).filter(a=>a.status==='wrong').length : 0;

      if (resultEl) resultEl.innerHTML = `
        <div style="text-align:center;margin-bottom:12px">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;border:6px solid ${color};font-size:20px;font-weight:900;color:${color}">${bestScore}%</div>
          <div style="font-size:16px;font-weight:900;color:${color};margin-top:6px">${grade}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:3px">You said: <strong style="font-family:var(--cn);color:var(--text)">${e.results[0][0].transcript}</strong></div>
        </div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:10px">
          ${correct>0?`<span class="pron-feedback-chip chip-correct">${correct} correct</span>`:''}
          ${close>0?`<span class="pron-feedback-chip chip-close">${close} close</span>`:''}
          ${wrong>0?`<span class="pron-feedback-chip chip-wrong">${wrong} needs work</span>`:''}
        </div>
        <div id="groq-pron-analysis-v18" style="font-size:12px;color:var(--text2);padding:10px;background:var(--bg);border-radius:10px;border:1.5px solid var(--card-border);min-height:36px">
          <span style="color:var(--muted)">Analyzing pronunciation details...</span>
        </div>`;

      if (typeof groqAnalyzePronunciation === 'function') {
        groqAnalyzePronunciation(e.results[0][0].transcript, expected, pinyin).then(aiAnalysis => {
          const el2 = document.getElementById('groq-pron-analysis-v18');
          if (el2 && aiAnalysis) el2.innerHTML = '<strong style="color:var(--blue)">AI Feedback:</strong> ' + aiAnalysis;
          else if (el2) el2.style.display='none';
        });
      }

      if (bestScore>=65 && typeof window.spS !== 'undefined') { window.spS++; }
      if (typeof addXP === 'function') addXP(Math.ceil(bestScore/25));

      if (micBtn) {
        micBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:7px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Try Again</span>';
        micBtn.style.background = '#ff4b4b';
        micBtn.disabled = false;
      }
      if (nextBtn) { nextBtn.style.display=''; }
      if (skipBtn) { skipBtn.style.display='none'; }
      const scoreEl = document.getElementById('sp-score');
      if (scoreEl && typeof window.spS !== 'undefined') scoreEl.textContent = window.spS + ' / ' + (window.spQ||[]).length;
    },
    (err) => {
      if (err && err.error === 'aborted') {
        if (micBtn) { micBtn.disabled=false; }
        return;
      }
      if (micBtn) {
        micBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:7px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg> Speak</span>';
        micBtn.style.background = '#ff4b4b';
        micBtn.disabled = false;
      }
      if (resultEl) resultEl.innerHTML = 'Could not hear you. Check microphone permissions.';
    }
  );
};

// ── PATCH: _doSpeak (lesson speaking stage) ──────────────────
window._origDoSpeak = window._doSpeak;
window._doSpeak = function(idx, cn, py) {
  const btn    = document.getElementById(`speak-btn-${idx}`);
  const panel  = document.getElementById(`speak-panel-${idx}`);
  const result = document.getElementById(`speak-result-${idx}`);
  if (!btn || !panel) return;

  speak(cn);

  if (btn)   { btn.disabled=true; btn.textContent='🔴 Listening...'; }
  if (panel) panel.classList.add('recording');

  window._universalStartSpeech('zh-CN',
    function(e) {
      const heard      = e.results[0][0].transcript;
      const confidence = e.results[0][0].confidence || 0.8;
      const chars      = [...cn];
      const heardChars = [...heard];
      const matches    = chars.filter(c => heardChars.includes(c)).length;
      const matchRatio = matches / chars.length;

      let score, msg, cls;
      if (matchRatio >= 0.8 || heard === cn) {
        score = '🌟 Excellent!'; cls = 'perfect';
        msg = `Perfect pronunciation! You said: "${heard}"`;
        if (typeof addXP === 'function') addXP(15);
      } else if (matchRatio >= 0.4 || confidence > 0.6) {
        score = '👍 Good try!'; cls = 'good';
        msg = `You said: "${heard}" — keep practicing the tones!`;
        if (typeof addXP === 'function') addXP(8);
      } else {
        score = '🔄 Try again!'; cls = 'try-again';
        msg = `You said: "${heard}" — the correct pronunciation is: ${py}`;
        if (typeof addXP === 'function') addXP(3);
      }

      if (result) {
        result.style.display = 'block';
        const bg = cls==='perfect'?'green':cls==='good'?'yellow':'red';
        result.innerHTML = `<div style="padding:12px;border-radius:12px;background:var(--${bg}-bg);border:2px solid var(--${bg});font-size:13px;color:var(--${bg}-d);width:100%">
          <div style="font-weight:900;font-size:15px;margin-bottom:4px">${score}</div>
          <div>${msg}</div>
          <button onclick="window._speakNext(${idx})" style="margin-top:10px;width:100%;padding:10px;border-radius:10px;border:none;background:var(--${bg});color:#fff;font-size:13px;font-weight:900;cursor:pointer;font-family:var(--font)">Next Word →</button>
        </div>`;
      }
      if (btn)   { btn.textContent='🎤 Tap to Speak'; btn.disabled=false; }
      if (panel) panel.classList.remove('recording');
    },
    function(err) {
      if (err && err.error === 'aborted') {
        if (btn)   { btn.textContent='🎤 Tap to Speak'; btn.disabled=false; }
        if (panel) panel.classList.remove('recording');
        return;
      }
      if (result) {
        result.style.display = 'block';
        result.innerHTML = `<div style="padding:10px;border-radius:10px;background:var(--yellow-bg);border:2px solid var(--yellow);font-size:12px;color:var(--yellow-d)">
          ⚠️ Mic issue: ${err?.error||'unknown'}. ${err?.error==='not-allowed'?'Please allow microphone in browser settings.':'Try again.'}
          <br><button onclick="window._speakNext(${idx})" style="margin-top:8px;padding:8px 16px;border-radius:9px;border:none;background:var(--yellow);color:#fff;font-weight:800;cursor:pointer;font-family:var(--font)">Continue Anyway →</button>
        </div>`;
      }
      if (btn)   { btn.textContent='🎤 Tap to Speak'; btn.disabled=false; }
      if (panel) panel.classList.remove('recording');
    }
  );
};

// ── PATCH: lessonSpeak ────────────────────────────────────────
window._origLessonSpeak = window.lessonSpeak;
window.lessonSpeak = async function(cn, py, idx) {
  const resultEl = document.getElementById('ls-result-' + idx);
  if (resultEl) { resultEl.style.display='block'; resultEl.innerHTML='<span style="color:var(--muted);font-size:12px">🎤 Listening...</span>'; }
  if (typeof speak === 'function') speak(cn);
  await new Promise(r => setTimeout(r, 800));

  window._universalStartSpeech('zh-CN',
    async (e) => {
      const heard = Array.from(e.results).map(r => r[0].transcript).join('');
      if (resultEl) resultEl.innerHTML = `<span style="font-size:12px;color:var(--muted)">🔄 Analyzing: "${heard}"...</span>`;
      try {
        const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization':'Bearer '+GROQ_KEY},
          body: JSON.stringify({
            model:'llama-3.3-70b-versatile', max_tokens:100,
            messages:[{role:'user',content:`Chinese pronunciation coach. Student said "${cn}" (${py}), speech rec heard: "${heard}". Give ONE short encouraging sentence of feedback. No markdown.`}]
          })
        });
        const d = await resp.json();
        const fb = d.choices?.[0]?.message?.content || '✓ Good try! Keep practicing!';
        const heard0 = e.results[0][0].transcript;
        const match  = heard0.includes(cn.slice(0,1)) || cn.includes(heard0.slice(0,1));
        if (resultEl) resultEl.innerHTML = `
          <div style="padding:10px;border-radius:10px;background:${match?'var(--green-bg)':'var(--yellow-bg)'};border:1.5px solid ${match?'var(--green)':'var(--yellow)'};font-size:12px;color:${match?'var(--green-d)':'var(--yellow-d)'}">
            <div style="font-weight:800;margin-bottom:3px">You said: "${heard0}"</div>
            <div>${fb}</div>
          </div>`;
        if (typeof addXP === 'function') addXP(10);
      } catch(err) {
        if (resultEl) resultEl.innerHTML = '<span style="color:var(--green);font-size:12px">✓ Good effort! Keep practicing!</span>';
        if (typeof addXP === 'function') addXP(5);
      }
    },
    (err) => {
      if (err && err.error === 'aborted') { if(resultEl) resultEl.innerHTML=''; return; }
      if (resultEl) resultEl.innerHTML = '<span style="color:var(--red);font-size:12px">❌ Mic error — check permissions</span>';
    }
  );
};

// ── Update mobile detection: mic NOW works on mobile ──────────
// Suppress old "voice features — desktop only" banner
window._isMobileBrowser = false; // mic works everywhere now
// Also clear any previously shown banner
document.addEventListener('DOMContentLoaded', function() {
  const old = document.getElementById('mic-mobile-notice');
  if (old) old.remove();
  localStorage.removeItem('_mobileMicNoticeDone');
});

// ── Show hasSpeech=true everywhere (buttons no longer hidden) ──
// Rewrite the check used in renderSpeaking (lesson stage 3)
const _origHasSpeech = Object.getOwnPropertyDescriptor(window, '_hasSpeechAPI');
Object.defineProperty(window, '_hasSpeechAPI', {
  get: () => true, configurable: true
});
// Also patch the inline check in renderSpeaking that reads window.SpeechRecognition
// by providing a shim that returns truthy
if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
  // Dummy shim — only used for feature-detection booleans, not actually called
  // (real calls go through _universalStartSpeech → _MIC)
  window._MobileSpeechRecognitionShim = true;
  window.SpeechRecognition = function() { return null; };
  window.SpeechRecognition.toString = () => '[native code]';
}

console.log('[HanyuStar Mobile Mic] ✓ Universal mic patch loaded — Whisper STT active on all devices');

})();

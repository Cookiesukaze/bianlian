export default {
    language: {
        name:'Language',
        zh: '中文',
        en: 'English',
    },
    demo:'Demo',
    tools:{
        name:'Tools',
        home:'Home',
        vt:'Video Translation',
        at:'Audio Translation',
    },
    vt: {
        name: "Video Translation",
        input: "Video Input",
        input_text: "Upload or Drag Your Video",
        output: "Video Output",
        output_text: "Translated Video will showed here",
        choose_target: "Choose Target Language",
        language_list: [
            { text: 'Chinese', value: 'zh' },
            { text: 'English', value: 'en' },
        ],
        choose_model:"Choose Model",
        model_list: [
            { text: 'Wav2Lip', value: 'wav2lip' },
        ],
        choose_tone:"Choose Tone",
        tone_list: [
            { text: 'female-normal', value: '女-正常' },
            { text: 'female-young', value: '女-少女' },
            { text: 'female-liangning', value: '女-辽宁口音' },
            { text: 'female-shanxi', value: '女-陕西口音' },
            { text: 'male-normal', value: '男-正常' },
            { text: 'male-young', value: '男-少年' },
            { text: 'male-children', value: '男-小孩' },
            { text: 'male-normal-2', value: '男-正常2' },
        ],
        translate:"Translate",
        alert_list:[
            {type:'video_discard',text:'please upload your video.'},
            {type:'select_discard',text:'please choose target language,model and tone.'},
        ],
    },
    about:{
        name:'About',
    },
    login:'Login',
    title:'AI Video Translation',
    sub_title:{
        1:'use our product to',
        2:' connect ',
        3:' your videos to the ',
        4:'world',
    },
    get_start_for_free:"Get start for free",

}

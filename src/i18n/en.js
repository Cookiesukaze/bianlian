export default {
    language: {
        name:'Language',
        zh: '中文',
        en: 'English',
    },
    demo:'Demo',
    demo1:{
        h1_list:{
            h1_1: "Make Your",
            h1_2: "Videos",
            h1_3: "Go",
            h1_4: "Global",
        },
        desc_text:"Using our video translation to make teaching videos from anywhere easily disseminated."
    },
    demo2:{
        h2_list:{
            h2_1: "Preserve",
            h2_2: "Your",
            h2_3: "Unique",
            h2_4: "Voice",
        },
        desc_text:"Ensure your voice never disappears with our voice cloning technology."
    },
    tools:{
        name:'Tools',
        home:'Home',
        vt:'Video Translation',
        at:'Audio Translation',
        vg:'Video Generate',
        vc:'Voice Clone',
    },
    vt: {
        name: "Video Translation",
        input: "Video Input",
        input_text: "Upload or Drag Your Video",
        output: "Video Output",
        output_text: "Translated Video Will Showed Here",
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
        translate:"Translate！",
        alert_list:[
            {type:'video_discard',text:'please upload your video.'},
            {type:'select_discard',text:'please choose target language,model and tone.'},
        ],
    },
    at: {
        name: "Audio Translation",
        input: "Audio Input",
        input_text: "Upload or Drag Your Audio",
        output: "Audio Output",
        output_text: "Translated Audio Will Showed Here",
        choose_target: "Choose Target Language",
        language_list: [
            { text: 'Chinese', value: 'zh' },
            { text: 'English', value: 'en' },
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
        translate:"Translate！",
        alert_list:[
            {type:'audio_discard',text:'please upload your audio.'},
            {type:'select_discard',text:'please choose target language and tone.'},
        ],
    },
    vg: {
        name: "Video Generate",
        input: "Audio Input",
        input_text: "Upload or Drag Your Audio",
        output: "Video Output",
        output_text: "Gigital Human Video Will Showed Here",
        choose_model:"Choose Model",
        model_list: [
            { text: 'GeneFace++', value: 'genefacepp' },
        ],
        choose_digital_human:'Choose Digital Human',
        digital_human_list:[
            { text: 'May', value: 'may' },
        ],
        generate:"Generate！",
        alert_list:[
            {type:'audio_discard',text:'please upload your audio.'},
            {type:'select_discard',text:'please choose model and digital human.'},
        ],
    },
    vc: {
        name: "Video Clone",
        input: "Voice Input",
        input_text: "Upload or Drag Your Voice",
        text_input_text: "Text Input",
        text_input_placeholder:'Input Text You Want To Read',
        output: "Voice Output",
        output_text: "Cloned Voice Will Showed Here",
        choose_model:"Choose Model",
        model_list: [
            { text: 'MetaVoice', value: 'metavoice' },
        ],
        generate:"Generate！",
        alert_list:[
            {type:'audio_discard',text:'please upload your voice.'},
            {type:'select_discard',text:'please choose model.'},
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
    wait_text:"be patient...",
}

export default {
    language: {
        name:'Language',
        zh: '中文',
        en: 'English',
    },
    demo:'演示',
    demo1:{
        h1_list:{
            h1_1: "让你的",
            h1_2: "教学视频",
            h1_3: "传播到",
            h1_4: "全世界",
        },
        desc_text:"用我们的视频翻译，让任何地方的教学视频都能轻松被传播"
    },
    demo2:{
        h2_list:{
            h2_1: "保留",
            h2_2: "你的",
            h2_3: "独一无二",
            h2_4: "声线",
        },
        desc_text:"用我们的声音克隆，让您的声线永远留存"
    },
    tools:{
        name:'工具',
        home:'库',
        vt:'视频翻译',
        at:'音频翻译',
        vg:'视频生成',
        vc:'声音克隆',
    },
    vt: {
        name: "视频翻译",
        input: "视频输入",
        input_text: "上传或拖入您的视频文件",
        output: "视频输出",
        output_text: "翻译完成的视频将显示在此",
        choose_target: "选择目标语言",
        language_list: [
            { text: '中文', value: 'zh' },
            { text: '英语', value: 'en' },
        ],
        choose_model:"模型选择",
        model_list: [
            { text: 'Wav2Lip', value: 'wav2lip' },
        ],
        choose_tone:"声线选择",
        tone_list: [
            { text: '女-正常', value: '女-正常' },
            { text: '女-少女', value: '女-少女' },
            { text: '女-辽宁口音', value: '女-辽宁口音' },
            { text: '女-陕西口音', value: '女-陕西口音' },
            { text: '男-正常', value: '男-正常' },
            { text: '男-少年', value: '男-少年' },
            { text: '男-小孩', value: '男-小孩' },
            { text: '男-正常2', value: '男-正常2' },
        ],
        translate:"开始翻译！",
        alert_list:[
            {type:'video_discard',text:'请先上传视频。'},
            {type:'select_discard',text:'请选择目标语言、使用的模型和声线。'},
        ],
    },
    at: {
        name: "音频翻译",
        input: "音频输入",
        input_text: "上传或拖入您的音频文件",
        output: "音频输出",
        output_text: "翻译完成的音频将显示在此",
        choose_target: "选择目标语言",
        language_list: [
            { text: '中文', value: 'zh' },
            { text: '英语', value: 'en' },
        ],
        choose_tone:"声线选择",
        tone_list: [
            { text: '女-正常', value: '女-正常' },
            { text: '女-少女', value: '女-少女' },
            { text: '女-辽宁口音', value: '女-辽宁口音' },
            { text: '女-陕西口音', value: '女-陕西口音' },
            { text: '男-正常', value: '男-正常' },
            { text: '男-少年', value: '男-少年' },
            { text: '男-小孩', value: '男-小孩' },
            { text: '男-正常2', value: '男-正常2' },
        ],
        translate:"开始翻译！",
        alert_list:[
            {type:'audio_discard',text:'请先上传音频。'},
            {type:'select_discard',text:'请选择目标语言和声线。'},
        ],
    },
    vg: {
        name: "视频生成",
        input: "音频输入",
        input_text: "上传或拖入您的音频文件",
        output: "视频输出",
        output_text: "生成的数字人视频将显示在此",
        choose_model:"模型选择",
        model_list: [
            { text: 'GeneFace++', value: 'genefacepp' },
        ],
        choose_digital_human:'数字人选择',
        digital_human_list:[
            { text: 'May', value: 'may' },
        ],
        generate:"开始生成！",
        alert_list:[
            {type:'audio_discard',text:'请先上传音频。'},
            {type:'select_discard',text:'请选择使用的模型和数字人。'},
        ],
    },
    vc: {
        name: "声音克隆",
        input: "声音输入",
        input_text: "上传或拖入您的声音文件",
        text_input_text: "文本输入",
        text_input_placeholder:'输入您想要朗读的文字',
        output: "声音输出",
        output_text: "生成的克隆声音将展示在此",
        choose_model:"模型选择",
        model_list: [
            { text: 'MetaVoice', value: 'metavoice' },
        ],
        generate:"开始生成！",
        alert_list:[
            {type:'audio_discard',text:'请先上传声音文件。'},
            {type:'select_discard',text:'请选择使用的模型。'},
        ],
    },
    about:{
        name:'关于',
    },
    login:'登录',
    title:'AI 视频翻译',
    sub_title:{
        1:'使用我们的产品',
        2:' 连接 ',
        3:' 你和 ',
        4:'世界',
    },
    get_start_for_free:"免费开始使用",
    wait_text:"耐心等待输出...",
}

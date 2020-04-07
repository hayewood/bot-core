module.exports = {

    randomQuestion: async function() {
        const axios = require('axios').default;
        const instance = axios.create({
            baseURL: 'https://hayewood.com/api/v2',
            timeout: 1000,
            headers: {'Authorization': process.env.APIKEY}
        });
        
        var res = (await instance.get('/questions/randomQuestion'));
        if(res && res.data && res.data.length == 1) {
            if(res.data[0].question_type_id == 2 && res.data[0].tally_multiple_choice != null) {
                var reply = res.data[0].question + "? [Options]:";
                const { answer_1, answer_2, answer_3, answer_4, mc_answers_id, tally_question_id } = res.data[0].tally_multiple_choice;
                    if(answer_1)
                        reply += " A. " + answer_1 + " | ";
                    if(answer_2)
                        reply += " B. " + answer_2 + " | ";
                    if(answer_3)
                        reply += " C. " + answer_3 + " | ";
                    if(answer_4)
                        reply += " D. " + answer_4;

            }
            else {
                var reply = res.data[0].question + "? [Y/N]";

            }
            return reply + " | Use #answer";
    } 
    
    return {success: false} 
    }
}


// module.exports = (async function() {
//     const axios = require('axios').default;
//     const instance = axios.create({
//         baseURL: 'https://hayewood.com/api/v2',
//         timeout: 1000,
//         headers: {'Authorization': process.env.APIKEY}
//       });
    
//     var res = (await instance.get('/questions/randomQuestion'));
//     if(res && res.data && res.data.length == 1) {
//         if(res.data[0].question_type_id == 2 && res.data[0].tally_multiple_choice != null) {
//             var reply = res.data[0].question + "? [Options]:";
//             for(option in res.data.tally_multiple_choice) {
//                 if(option.answer_1)
//                     reply += " A. " + option + " | ";
//                 else if(option.answer_2)
//                     reply += " B. " + option + " | ";
//                 else if(option.answer_3)
//                     reply += " C. " + option + " | ";
//                 else if(option.answer_4)
//                     reply += " D. " + option;

//             }
//         }
//         else {
//             var reply = res.data[0].question + "? [y/n]";

//         }
//         return reply;
//     } 
    
//     return {success: false} 
// });


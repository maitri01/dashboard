/* Public curriculum references only. No personal locations or private notes. */
const START='2026-10-19', END='2026-11-30';
const BOOK_SOURCES={
'A1.1':'https://legacy.hueber.de/shared/elka/Internet_Inhaltsverz/Red1/9783193619013_Inhalt.pdf',
'A1.2':'https://shop.hueber.de/media/hueber_dateien/Internet_Inhaltsverz/Red1/9783195619011_Inhalt.pdf',
'A2.1':'https://www.hueber.de/media/36/978-3-19-301902-8_Inhalt.pdf',
'A2.2':'https://shop.hueber.de/media/hueber_dateien/Internet_Inhaltsverz/Red1/9783195619028_Inhalt.pdf'};
// Short topic mappings, not reproductions of textbook lessons. Practice tasks are original.
const TOPICS={
'A1.1':[
['Introductions','Greetings; questions; singular verbs','Introduce yourself, spell your name, and ask about someone else.'],
['Work & personal details','Jobs; numbers; verb forms; negation','Describe what you do and exchange basic personal details.'],
['Family & languages','Possessives; yes/no questions','Introduce your family and describe the languages you speak.'],
['Furniture & prices','Articles; pronouns','Describe three objects and ask their prices.'],
['Everyday objects','Indefinite articles; negative articles','Describe an object and ask for a word you do not know.'],
['Office & technology','Plurals; accusative','Say what you need for your workspace.'],
['Hobbies & abilities','Modal verbs; sentence brackets','Explain what you can do and ask about hobbies.'],
['Making plans','Time; word order; time prepositions','Arrange a meeting, propose a time, and respond.'],
['Food & invitations','Preferences; polite wishes','Invite someone to eat and discuss preferences.'],
['Getting around','Separable verbs','Ask about a journey and describe your travel plans.'],
['Your day, yesterday','Perfect tense with haben','Tell someone about yesterday in a short sequence.'],
['Trips & celebrations','Perfect tense with sein','Describe a past trip or celebration.']],
'A1.2':[
['Finding your way','Location prepositions; dative','Ask for directions and explain a simple route.'],
['Home','Possessives; names','Describe a home and compare preferences.'],
['Your neighbourhood','Dative verbs and pronouns','Ask about places nearby and describe your neighbourhood.'],
['Appointments','Time prepositions','Write and act out a request to change an appointment.'],
['Plans & wishes','Wollen; mit and ohne','Talk about a plan and what you need for it.'],
['Health','Advice; formal imperatives','Describe a problem and practise asking for advice.'],
['People, then & now','War; hatte; past forms','Describe a person and how things have changed.'],
['Household tasks','Informal imperatives; accusative pronouns','Discuss chores and make polite requests.'],
['Rules','Dürfen; müssen','Explain simple rules and obligations.'],
['Clothes','Comparisons','Compare outfits and explain your choice.'],
['Weather','Giving reasons','Describe the weather and give a reason for changing plans.'],
['Celebrations','Wishes; ordinal numbers','Invite someone to a celebration and discuss dates.']],
'A2.1':[
['Family stories','Possessives; past tense revision','Tell a short family story in a clear order.'],
['Moving & furnishing','Two-way prepositions','Explain where things are and where to put them.'],
['Travel preferences','Word formation','Compare destinations and explain your preferences.'],
['Shopping','Adjective endings','Ask for items, quantities, and alternatives.'],
['Exploring a city','Adjective endings','Plan a visit and write a short postcard.'],
['Culture & events','Time expressions','Suggest an event and agree on a plan.'],
['Sport & fitness','Suggestions and advice','Discuss a realistic exercise routine.'],
['Health & reasons','Weil; deshalb','Explain a problem and respond with concern.'],
['Working life','Adjective endings','Describe what matters to you at work.'],
['At a restaurant','Dass clauses','Order, ask for a change, and pay.'],
['Workplace stories','Reflexive verbs','Discuss a workplace event and congratulate someone.'],
['Eating habits','Wenn clauses','Compare habits and explain what you do in different situations.']],
'A2.2':[
['Learning languages','Als clauses','Tell a story about learning something new.'],
['Post & parcels','Present passive','Explain how to send something and write a personal message.'],
['Media habits','Dative and accusative objects','Describe your media habits and make recommendations.'],
['At a hotel','Indirect questions','Book a room and ask follow-up questions politely.'],
['Travel routines','Location and direction','Describe a journey and compare travel options.'],
['Weather & climate','Prepositional verbs','Discuss the weather and what you look forward to.'],
['Choosing an event','Origins and locations','Persuade a friend to try an event.'],
['Books & news','Past modal verbs','Discuss reading preferences and past habits.'],
['Documents & administration','Question words; demonstratives','Ask which document is needed and explain a procedure.'],
['Transport choices','Since and until clauses','Explain a change in your travel habits.'],
['Education & work','Relative clauses','Describe a course or job that suits you.'],
['Life abroad','Narrative past','Tell a short story about life in another place.']]};
const LESSONS=[];
Object.entries(TOPICS).forEach(([level,topics])=>{
 topics.forEach(([title,grammar,goal],i)=>{
  const number=i+1+(level.endsWith('.2')?12:0), id=level+'-'+number;
  const page=[9,13,17,25,29,33,41,45,49,57,61,65][i];
  LESSONS.push({id,level,number,title,grammar,goal,page,kind:'lesson'});
  if((i+1)%3===0)LESSONS.push({id:level+'-review-'+(i+1),level,number:number,title:'Module review · lessons '+(number-2)+'–'+number,grammar:'Recall, listening, speaking and self-check',goal:'Use the last three lessons without relying on your notes.',kind:'review'});
 });
});
// [start, end, label, area]. Protected time is hidden from the default day view.
const WEEK={
1:[['09:15','10:15','German practice','german'],['10:30','11:30','Independent research','research'],['11:30','14:30','Remote work','work'],['14:30','15:15','Lunch & reset','personal'],['15:15','16:00','Travel to university','personal'],['16:00','18:00','VGM lecture','vgm'],['18:00','18:30','Travel home','personal'],['18:30','20:00','Cook, eat & prepare tomorrow','personal'],['20:00','22:00','AI · slides & project work','ai']],
2:[['09:15','12:00','Groceries, chores & personal time','personal'],['12:00','13:00','Lunch & reset','personal'],['13:00','16:00','Remote work','work'],['16:30','17:30','Independent research','research'],['17:45','19:45','VGM · understand Monday’s lecture','vgm'],['19:45','21:15','Cook, eat & prepare tomorrow','personal']],
3:[['09:15','10:15','German practice','german'],['10:15','11:15','Independent research','research'],['11:15','11:45','Early lunch','personal'],['11:45','12:15','Travel to university','personal'],['12:15','13:45','VGM tutorial','vgm'],['13:45','14:30','Transfer to office','personal'],['14:30','18:30','CISPA','work'],['18:30','19:15','Travel home','personal'],['19:15','20:45','Cook, eat & prepare tomorrow','personal']],
4:[['09:15','10:15','German practice','german'],['10:15','11:00','Travel to office','personal'],['11:00','15:00','CISPA · 13:00 meeting included','work'],['15:00','16:00','Independent research','research'],['16:00','18:30','CISPA','work'],['18:30','19:15','Travel home','personal'],['19:15','20:45','Cook, eat & prepare tomorrow','personal']],
5:[['09:15','10:15','German practice','german'],['10:15','11:00','Travel to office','personal'],['11:00','15:00','CISPA','work'],['15:00','16:00','Independent research','research'],['16:00','18:30','CISPA','work'],['18:30','19:15','Travel home','personal'],['19:15','20:45','Cook, eat & prepare tomorrow','personal']],
6:[['09:15','10:15','German practice','german'],['10:30','12:30','VGM · exercises / project','vgm'],['12:30','13:30','Lunch & rest','personal'],['13:30','15:30','VGM · paper, summary & questions','vgm'],['16:00','18:00','AI · slides & project work','ai'],['18:30','20:00','Cook, eat & prepare tomorrow','personal']],
0:[['10:00','12:00','AI · slides & project work','ai'],['12:00','22:00','Afternoon & evening free','personal']]
};
const AREAS={german:'German',ai:'AI',vgm:'VGM',work:'Work',research:'Research',personal:'Personal time'};
const GUIDES={ai:'Study the current slides and examples, or advance the current programming project. Record what you understand, unresolved questions, and the exact next step. Keep eligibility and midterm preparation moving.',work:'Choose a concrete work deliverable. Record the continuation point before finishing. Office lunch and short breaks are flexible within this reserved window. Independent reading is counted separately.',research:'Read and work through a paper for one focused hour. Capture the question, main idea and what remains unclear. Finishing an entire paper is optional; understanding is the goal.',vgm:'Work independently on the named task. Lecture review: reconstruct examples and derivations. Paper session: read, write a summary and capture questions together. Exercise/project session: solve the sheet or execute a concrete milestone. Take your prepared notes directly to the tutorial.',german:'Continue the next unfinished Menschen session in German studio. Missing a day does not change the lesson order.',personal:'Protected time, not another task to complete. Travel windows are estimates and include walking buffers.'};

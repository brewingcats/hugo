var AutoInstagram;
(function (AutoInstagram) {
    class Control {
        static isInitialized = false;
        static Initialize(appId, clientToken) {
            LocalConstants.AppTok = appId;
            LocalConstants.CliTok = clientToken;
            Control.isInitialized = true;
        }
        static LoadFromParam() {
            let url = new URL(location.toString());
            let instaId = url.searchParams.get(Constants.QuerySegment);
            let instagramId = '';
            if (instaId === null) {
                BrewingCatsCore.Logger.traceWarn(`Instagram entry not found on query params`, 'autoinstagram', 'tagId_3', BrewingCatsCore.LogCategory.ComponentSetup, {});
            }
            else {
                instagramId = instaId;
            }
            return instagramId;
        }
        static InsertInstagramPost(apiResponse, target) {
            let selection = $(AutoInstagram.Util.Format(AutoInstagram.Constants.DefaultSelector, [target]));
            let selectorId = AutoInstagram.Util.Format(AutoInstagram.Constants.InstagramSelectorBase, [target]);
            let setHtml = false;
            if (selection.length === 0) {
                selectorId = AutoInstagram.Util.Format(AutoInstagram.Constants.InstagramSelectorId, [selectorId]);
                selection = $(selectorId);
                if (selection.length === 0) {
                    BrewingCatsCore.Logger.traceError(`Instagram entry not found on query params`, 'autoinstagram', 'tagId_4', BrewingCatsCore.LogCategory.ComponentSetup, {});
                    setHtml = false;
                }
                else {
                    setHtml = true;
                }
            }
            else {
                setHtml = true;
            }
            if (setHtml) {
                let postHtml = AutoInstagram.Util.Format(AutoInstagram.Constants.HtmlContainer, [
                    selectorId,
                    AutoInstagram.Constants.PostWidth.toString(),
                    apiResponse.html
                ]);
                selection.html(postHtml);
                window.instgrm.Embeds.process();
            }
        }
        static QueryAndAddInstagramPost(postId, targetSelector) {
            if (!Control.isInitialized) {
                console.warn('AutoInstagram has not been initialized!');
                return;
            }
            let apiRequestUrl = LocalConstants.buildRequest(postId);
            let oReq = new XMLHttpRequest();
            oReq.responseType = "json";
            oReq.onreadystatechange = () => {
                if (oReq.readyState === XMLHttpRequest.DONE) {
                    AutoInstagram.Control.InsertInstagramPost(oReq.response, targetSelector);
                    BrewingCatsCore.Logger.traceInfo(`Instagram request id ${postId}`, 'autoinstagram', 'tagId_6', BrewingCatsCore.LogCategory.ComponentSetup, {
                        id: postId
                    });
                }
            };
            oReq.onerror = () => {
                BrewingCatsCore.Logger.traceError(`Instagram request error`, 'autoinstagram', 'tagId_5', BrewingCatsCore.LogCategory.ComponentSetup, {
                    response: oReq.responseText,
                    status: oReq.statusText
                });
            };
            oReq.open('GET', apiRequestUrl);
            oReq.send();
        }
    }
    AutoInstagram.Control = Control;
    class Storage {
        static InstagramAPIReq;
    }
    AutoInstagram.Storage = Storage;
    class Constants {
        static QuerySegment = "insta";
        static DefaultTSelText = "Instagram-Auto-Embed";
        static DefaultSelector = `p:contains('{0}')`;
        static PostWidth = 700;
        static HtmlContainer = '<div id="{0}" style="display: block; margin-left: auto; margin-right: auto; width: {1}px;" >{2}</div>';
        static InstagramSelectorBase = 'targetInsta-{0}';
        static InstagramSelectorId = "div[id='{0}']";
    }
    AutoInstagram.Constants = Constants;
    class Util {
        static Remove(base, matcher) {
            return base.replace(matcher, '');
        }
        static Contains(base, matcher) {
            if (base.indexOf(matcher) !== -1) {
                return true;
            }
            return false;
        }
        static Format(base, formatters) {
            let index = 0;
            formatters.forEach(formatter => {
                let replaceToken = `{${index}}`;
                base = base.replace(replaceToken, formatter);
                index++;
            });
            return base;
        }
        static CurateId(raw) {
            return raw.replace(' ', '');
        }
    }
    AutoInstagram.Util = Util;
    class LocalConstants {
        static ReqUrl = `https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/`;
        static AppTok = '';
        static CliTok = '';
        static buildRequest(postId) {
            return `${LocalConstants.ReqUrl}${postId}/&access_token=${LocalConstants.AppTok}|${LocalConstants.CliTok}`;
        }
    }
})(AutoInstagram || (AutoInstagram = {}));
if (window.AutoInstagram === undefined) {
    window.AutoInstagram = AutoInstagram;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    class Config {
        static Version = 4;
        static Build = 34;
        static SiteVersion = '';
        static ProjectId = '';
        static TelemetryEnabled = true;
        static ClientId = '';
        static SessionId = '';
        static TelemetryUrl = '';
        static StatsUrl = '';
        static ThemeColor = '';
        static LinkHoverColor = '';
        static UseGenericGdpr = false;
        static WarnLocalhost = false;
        static StatsMode = 'Stats2';
        static RedirectHttps = true;
        static TelemetryDataUrl = '';
        static TelemetryDataBaseName = '';
        static TelemetryDataEnv = '';
        static getCodeName() {
            return Config.CodeNames[Config.Build];
        }
        static getCoreVersion() {
            return `${Config.Version}.${Config.Build}`;
        }
        static getSiteVersion() {
            return `${Config.SiteVersion}.${Config.Build}`;
        }
        static CodeNames = [
            "2-1B",
            "2-1B",
            "4-LOM",
            "8D8",
            "Clone 99",
            "0-0-0",
            "99",
            "Shmi Skywalker",
            "Darth Vader",
            "Luke Skywalker",
            "Leia Organa",
            "Han Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Ben Solo",
            "Padme Amidala Naberrie",
            "Jobal Naberrie",
            "Pooja Naberrie",
            "Ruwee Nabarrie",
            "Ryoo Naberrie",
            "Sola Naberrie",
            "Beru Whitesun Lars",
            "Cliegg Lars",
            "Owen Lars",
            "Aika Lars",
            "Bail Organa",
            "Queen Breha Organa",
            "Depa Billaba",
            "Ezra Bridger",
            "Eno Cordova",
            "Cin Drallig",
            "Sifo-Dyas",
            "Kanan Jarrus",
            "Qui-Gon Jinn",
            "Cere Junda",
            "Obi-Wan Kenobi",
            "Cal Kestis",
            "Jocasta Nu",
            "Rey",
            "Mace Windu",
            "Nari",
            "Darth Bane",
            "Count Dooku",
            "Taron Malicos",
            "Sheev Palpatine",
            "Ren",
            "Trilla Suduri",
            "Reva Sevander",
            "Faro Argyus",
            "Lux Bonteri",
            "Captain Colton",
            "Tan Divo",
            "Silman",
            "Finis Valorum",
            "Bacara",
            "Bly",
            "Boil",
            "Cody",
            "Cutup",
            "Droidbait",
            "Fil",
            "Fox",
            "Gree",
            "Gregor",
            "Grey",
            "Hevy",
            "Jet",
            "Keeli",
            "Cut Lawquane",
            "Odd Ball",
            "Ponds",
            "Thire",
            "Waxer",
            "Wolffe",
            "Appo",
            "Denal",
            "Dogma",
            "Fives",
            "Fox",
            "Hardcase",
            "Jesse",
            "Kix",
            "Rex",
            "Tup",
            "Vaughn",
            "Crosshair",
            "Echo",
            "Hunter",
            "Tech",
            "Wrecker",
            "Omega",
            "Mina Bonteri",
            "Rush Clovis",
            "Raymus Antilles",
            "Lando Calrissian",
            "Bren Derlin",
            "Jan Dodonna",
            "Agent Kallus",
            "Crix Madine",
            "Pharl McQuarrie",
            "Mon Mothma",
            "Carlist Rieekan",
            "Jun Sato",
            'Zev Senesca',
            "Vanden Willard",
            "Wedge Antilles",
            "Arvel Crynyd",
            "Biggs Darklighter",
            "Red Leader",
            "Wes Janson",
            "Derek Klivian",
            "Jek Tono Porkins",
            "Dak Ralter",
            "Cassian Andor",
            "Bodhi Rook",
            "Chirrut Îmwe",
            "Baze Malbus",
            "Galen Walton Erso",
            "Lyra Erso",
            "Jyn Erso",
            "Saw Gerrera",
            "Steela Gerrera",
            "Sim Aloo",
            "Moradmin Bast",
            "Morgan Elsbeth",
            "Janus Greejatus",
            "Gideon Hask",
            "Valin Hess",
            "Moff Tiaan Jerjerrod",
            "Admiral Kassius Konstantine",
            "Orson Krennic",
            "Lang",
            "Xamuel Lennox",
            "Moff Delian Mors",
            "Admiral Conan",
            "Captain Lorth Needa",
            "Admiral Kendal Ozzel",
            "Admiral Firmus Piett",
            "Nahdonnis Praji",
            "Governor Arihnda Pryce",
            "Vice Admiral Rampart",
            "Admiral Dodd Rancit",
            "Gallius Rax",
            "Ciena Ree",
            "Admiral Terrinald Screed",
            "Rae Sloane",
            "Commander Lucka Solange",
            "General Cassio Tagge",
            "Inspector Thanoth",
            "Grand Moff Wilhuff Tarkin",
            "Eli Vanto",
            "General Maximilian Veers",
            "Wullf Yularen",
            "Tia",
            "ES-01",
            "ES-02",
            "ES-03",
            "ES-04",
            "Sergeant Kreel",
            "TK-421",
            "Moff Gideon",
            "The Client",
            "Doctor Pershing",
            "Dr. Cylo",
            "Aiolin Astarte",
            "Morit Astarte",
            "Tulon Voidgazer",
            "Commander Larma D'Acy",
            "Poe Dameron",
            "Caluan Ematt",
            "Finn",
            "Vice-Admiral Amilyn Holdo",
            "Jannah",
            "Harter Kalonia",
            "Lieutenant Kaydel Ko Connix",
            "Tallissan Lintra",
            "Admiral Ushos O. Statura",
            "Joph Seastriker",
            "Jessika Testor Pava",
            "Korr Sella",
            "Paige Tico",
            "Rose Tico",
            "Temmin Wexley",
            "Kazuda Xiono",
            "Beaumont Kin",
            "Jom Barell",
            "Ransolm Casterfo",
            "Davan",
            "Jib Dodger",
            "Cara Dune",
            "Sash Ketter",
            "Greer Sonnel",
            "Carson Teva",
            "Sinjir Rath Velus",
            "Trapper Wolf",
            "Reed",
            "Captain Moden Canady",
            "Armitage Hux",
            "Colonel Kaplan",
            "Enric Pryde",
            "Petty Officer Thanisson",
            "Captain Phasma",
            "FN-1824",
            "FN-2003",
            "FN-2199",
            "Tobias Beckett",
            "Val Beckett",
            "Zorii Bliss",
            "Toro Calican",
            "Dapp",
            "Dengar",
            "DJ",
            "Dr. Cornelius Evazan",
            "Rako Hardeen",
            "Greef Karga",
            "Tasu Leech",
            "Malakili",
            "Ranzar Malk",
            "Riot Mar",
            "Rafa Martez",
            "Trace Martez",
            "Migs Mayfeld",
            "Enfys Nest",
            "Bazine Netal",
            "Qi'ra",
            "Riley",
            "Fennec Shand",
            "Sana Starros",
            "Bala-Tik",
            "Vect Nokru",
            "Almec",
            "The Armorer",
            "Din Djarin",
            "Captain Hark",
            "Rook Kast",
            "Ketsu Onyo",
            "Fenn Rau",
            "Koska Reeves",
            "Axe Woves",
            "Boba Fett",
            "Jango Fett",
            "Bo-Katan Kryze",
            "Satine Kryze",
            "Korkie Kryze",
            "Gar Saxon",
            "Tiber Saxon",
            "Paz Vizsla",
            "Pre Vizsla",
            "Alrich Wren",
            "Sabine Wren",
            "Tristan Wren",
            "Ursa Wren",
            "Queen Apailana",
            "Sio Bibble",
            "Cordé",
            "Dormé",
            "Dineé Ellberger",
            "Eirtaé",
            "Ellé",
            "Queen Jamillia",
            "Jerus Jannick",
            "Queen Neeyutnee",
            "Ric Olié",
            "Captain Quarsh Panaka",
            "Rabé",
            "Sabé",
            "Saché",
            "Gavyn Sykes",
            "Captain Gregar Typho",
            "Amee",
            "Kitster Banai",
            "Jira",
            "Peli Motto",
            "Cobb Vanth",
            "Wuher",
            "Lortha Peel",
            "Drash",
            "Skad",
            "Camie Marstrap",
            "Laze Loneozner",
            "Caben",
            "Omera",
            "Stoke",
            "Winta",
            "Garrick Versio",
            "Iden Versio",
            "Del Meeko",
            "Zay Versio",
            "Doctor Chelli Lona Aphra",
            "Temiri Blagg",
            "Alton Kastle",
            "Lobot",
            "Casca Panzoro",
            "Reeve Panzoro",
            "Lor San Tekka",
            "Oma Tres",
            "Letta Turmond",
            "Governor Wing",
            "Yathros",
            "Haja Estree",
            "Ello Asty",
            "Slowen Lo",
            "Prauf",
            "C'ai Threnalli",
            "Gor Koresh",
            "Myo",
            "Ratts Tyerell",
            "Morley",
            "Babu Frik",
            "Ponda Baba",
            "Protectorate Gleb",
            "Po Nudo",
            "Nank Tun",
            "Rio Durant",
            "Strono Tuggs",
            "Yarna d'al' Gargan",
            "Mars Guo",
            "Dexter Jettster",
            "Pong Krell",
            "Figrin D'an",
            "Wollivan",
            "O-mer",
            "Ki-Adi-Mundi",
            "Mas Amedda",
            "Grand Admiral Thrawn",
            "Zam Wesell",
            "Cato Parasitti",
            "Bargwill Tomder",
            "Bobbajo",
            "Tera Sinube",
            "Unkar Plutt",
            "Aunt Z",
            "Sidon Ithano",
            "Burg",
            "Omi",
            "Grummgar",
            "Masana Tide",
            "Has Obbit",
            "Orrimaarko",
            "Sebulba",
            "Preigo",
            "Cad Bane",
            "L'ulo L'ampar",
            "Shriv Suurgav",
            "Ody Mandrell",
            "Chief Chirpa",
            "Logray",
            "Lumat",
            "Paploo",
            "Warok",
            "Romba",
            "Teebo",
            "Wicket W. Warrick",
            "Ziton Moj",
            "Dr. Nuvo Vindi",
            "Quiggold",
            "Jubnuk",
            "Zuckuss",
            "Klik-Klak",
            "Karina the Great",
            "Poggle the Lesser",
            "Sun Fac",
            "Shu Mai",
            "Cat Miin",
            "Mawhonic",
            "Aks Moe",
            "Ree-Yees",
            "Jar Jar Binks",
            "Boss Rugor Nass",
            "General Roos Tarpals",
            "Admiral Trench",
            "Mama the Hutt",
            "Jabba the Hutt",
            "Rotta the Hutt",
            "Gardulla the Hutt",
            "Ziro the Hutt",
            "Niima the Hutt",
            "Saesee Tiin",
            "Momaw Nadon",
            "Byph",
            "Mok Shaiz",
            "Teeka",
            "General Grievous",
            "Lama Su",
            "Nala Se",
            "Taun We",
            "Riff Tamson",
            "Plo Koon",
            "Quinlan Vos",
            "Droopy McCool",
            "Barada",
            "Passel Argente",
            "Denaria Kee",
            "Oro Dassyne",
            "Salacious B. Crumb",
            "Garindan",
            "Embo",
            "Even Piell",
            "Garazeb Orrelios",
            "Jaro Tapal",
            "Chava",
            "Greez Dritus",
            "Jaxxon",
            "Tee Watt Kaa",
            "Wag Too",
            "Sarco Plank",
            "Prosset Dibs",
            "Barriss Offee",
            "The Seventh Sister",
            "Luminara Unduli",
            "Admiral Gial Ackbar",
            "Quarrie",
            "Karbin",
            "Admiral Raddus",
            "Meena Tills",
            "Nahdar Vebb",
            "The Father",
            "The Daughter",
            "The Son",
            "San Hill",
            "Darth Plagueis",
            "Mythrol",
            "Kit Fisto",
            "Zatt",
            "Lott Dod",
            "Daultay Dofine",
            "Lushros Dofine",
            "Lok Durd",
            "Nute Gunray",
            "Rune Haako",
            "Rute Gunnay",
            "Tey How",
            "Ima-Gun Di",
            "Rinnrivin Di",
            "Klaatu",
            "Oplock",
            "Rukh",
            "Clegg Holdfast",
            "Pablo-Jill",
            "Coleman Kcaj",
            "Max Rebo",
            "Boolio",
            "Sy Snootles",
            "Aurra Sing",
            "Valik",
            "Baron Papanoida",
            "Che Amanwe Papanoida",
            "Chi Eekway Papanoida",
            "Grand Inquisitor",
            "Tion Medon",
            "Moralo Eval",
            "Osi Sobeck",
            "Marg Krim",
            "Lom Pyke",
            "Quay Tolsite",
            "Tessek",
            "Tikkes",
            "Tundra Dowmeia",
            "Kragan Gorr",
            "Nossor Ri",
            "Yarael Poof",
            "Onaconda Farr",
            "Greedo",
            "Greeata Jendowanian",
            "Glem",
            "Wald",
            "Rappertunie",
            "Wat Tambor",
            "Zutton",
            "Nien Nunb",
            "Vober Dand",
            "Chancellor Lanever Villecham",
            "Teedo",
            "Cassie Cryar",
            "Eighth Brother",
            "Oppo Rancisis",
            "Stass Allie",
            "Adi Gallia",
            "Katooni",
            "Roshti",
            "Ahsoka Tano",
            "Shaak Ti",
            "Ben Quadinaros",
            "King Katuunko",
            "Watto",
            "Bossk",
            "Cid",
            "Garnac",
            "Dar",
            "Dokk Strassi",
            "Ebe E. Endocott",
            "Klaud",
            "Fodesinbeed Annodue",
            "Bib Fortuna",
            "Xosad Hozem",
            "Lyn Me",
            "Oola",
            "Qin",
            "Aayla Secura",
            "Cham Syndulla",
            "Hera Syndulla",
            "Jacen Syndulla",
            "Orn Free Taa",
            "Xi'an",
            "Garsa Fwip",
            "Kuiil",
            "Mee Deechi",
            "Sly Moore",
            "Teemto Pagalies",
            "Dud Bolt",
            "Coleman Trebor",
            "Hondo Ohnaka",
            "Pagetti Rook",
            "Taanti",
            "Chewbacca",
            "Gungi",
            "Black Krrsantan",
            "Tarfful",
            "Gasgano",
            "Yoda",
            "Yaddle",
            "Grogu",
            "Joh Yowza",
            "Jas Emari",
            "Feral",
            "Agen Kolar",
            "Eeth Koth",
            "Darth Maul",
            "Savage Opress",
            "Merrin",
            "Mother Talzin",
            "Asajj Ventress",
            "Agruss",
            "Darts D'Nar",
            "Atai Molec",
            "Queen Miraj Scintel",
            "The Bendu",
            "The Fourth Sister",
            "The Fifth Brother",
            "Bil Valen",
            "Darth Momin",
            "Maz Kanata",
            "Ochi",
            "Knights of Ren",
            "Darth Shaa",
            "Supreme Leader Snoke",
            "Dryden Vos",
            "8t88",
            "Abeloth",
            "King Adas",
            "Darth Andeddu",
            "Nom Anor",
            "Bail Antilles",
            "Arcann",
            "Seti Ashgad",
            "Atris",
            "Tavion Axmis",
            "Azrakel",
            "Azzameen family",
            "B4-D4",
            "Darth Bandon",
            "Bao-Dur",
            "Garm Bel Iblis",
            "Jolee Bindo",
            "Deliah Blue",
            "Blue Max",
            "Bollux",
            "Empatojayos Brand",
            "Malcor Brashin",
            "Senator Bana Breemu",
            "Shira Brie",
            "Noa Briqualon",
            "Maris Brood",
            "C-3PX",
            "Darth Caedus",
            "Yomin Carr",
            "CB-99",
            "Jorus C'baoth",
            "Joruus C'baoth",
            "Tycho Celchu",
            "Charal",
            "Nas Choka",
            "Shok Choka",
            "Cilghal",
            "Darth Cognus",
            "General Airen Cracken",
            "Cradossk",
            "Admiral Natasi Daala",
            "Da'Gara",
            "Joclad Danva",
            "General Oro Dassyne",
            "Gizor Delso",
            "Desann",
            "Darth Desolous",
            "Dewlanna",
            "D'harhan",
            "Orgus Din",
            "Grand Moff Vilim Disra",
            "Teneniel Djo",
            "Hiram Drayson",
            "Antares Draco",
            "Grand Moff Dunhausen",
            "Captain Dunwell",
            "Durge",
            "Kyp Durron",
            "Captain Juno Eclipse",
            "Bant Eerin",
            "Elan",
            "Emtrey",
            "Keyan Farlander",
            "Jagged Fel",
            "Roan Fel",
            "Baron Soontir Fel",
            "Davin Felth",
            "Borsk Fey'lya",
            "Flim",
            "Mirta Gev",
            "G0-T0",
            "Janus Greejatus",
            "Falon Grey",
            "Hanharr",
            "Harrar",
            "A'Sharad Hett",
            "Grand Moff Bertroff Hissa",
            "HK-47",
            "Corran Horn",
            "Hero of Tython",
            "Hydra",
            "Ikrit",
            "Armand Isard",
            "Ysanne Isard",
            "Irek Ismaren",
            "Prince Isolder",
            "Mara Jade Skywalker",
            "Shimrra Jamaane",
            "Wes Janson",
            "Jarael",
            "Carnor Jax",
            "Jedgar",
            "Jek-14",
            "Jerec",
            "Jubnuk",
            "Juhani",
            "Bardan Jusik",
            "K-3PX",
            "Tenel Ka",
            "Kadann",
            "Captain Kael",
            "Kir Kanos",
            "Admiral Saul Karath",
            "Nomen Karr",
            "Talon Karrde",
            "Jodo Kast",
            "Kyle Katarn",
            "Owen Kenobi",
            "Gavar Khai",
            "Vestara Khai",
            "Kleef",
            "Ken",
            "Jaden Korr",
            "General Rahm Kota",
            "Krayn",
            "Darth Krayt",
            "Ludo Kressh",
            "Ganner Krieg",
            "K'Kruhk",
            "Exar Kun",
            "An'ya Kuro",
            "Kira Carsen",
            "Warmaster Tsavong Lah",
            "Bevel Lemelisk",
            "Xamuel Lennox",
            "Lowbacca",
            "Lumiya",
            "Mako",
            "Darth Malak",
            "Darth Malgus",
            "Malorum",
            "Kento Marek",
            "Mallie Marek",
            "Darth Marr",
            "Visas Marr",
            "Darth Maul's dopplegänger",
            "Mira",
            "MD-5",
            "Darth Millennial",
            "Callista Ming",
            "General Rom Mohc",
            "Kasan Moor",
            "Bengel Morr",
            "Kud'ar Mub'at",
            "Karness Muur",
            "Grand Moff Muzzer",
            "Darred Janred Naberrie",
            "Freedon Nadd",
            "Darth Nihl",
            "Darth Nihilus",
            "Ona Nobis",
            "Chop'aa Notimo",
            "Astri Oddo",
            "Ferus Olin",
            "Cal Omas",
            "Omega Squad",
            "Granta Omega",
            "Carth Onasi",
            "Onimi",
            "Canderous Ordo",
            "Orrin",
            "Jan Ors",
            "General Otto",
            "Outlander",
            "Ajunta Pall",
            "Kazdan Paratus",
            "Jax Pavan",
            "Gilad Pellaeon",
            "Rosh Penin",
            "Sate Pestage",
            "PROXY",
            "Pugwis",
            "Ulic Qel-Droma",
            "Ooryl Qrygg",
            "Danni Quee",
            "Sarcev Quest",
            "Malavai Quinn",
            "Vuffi Raa",
            "Ahri Raas",
            "Marka Ragnos",
            "Qu Rahn",
            "Atton Rand",
            "Alema Rar",
            "Kybo Ren",
            "Dash Rendar",
            "Gault Rennow",
            "Revan",
            "Rookie One",
            "Darth Ruin",
            "Naga Sadow",
            "Sage-Boneria",
            "Sarkli",
            "Admiral Sarn",
            "Saba Sebatyne",
            "Moff Kohl Seerdon",
            "Shedao Shai",
            "Bastila Shan",
            "Satele Shan",
            "Echuu Shen-Jon",
            "Garris Shrike",
            "Darth Sion",
            "Kal Skirata",
            "Fenn Shysa",
            "Ben Skywalker",
            "Cade Skywalker",
            "Kol Skywalker",
            "Luuke Skywalker",
            "Anakin Solo",
            "Allana Solo",
            "Jaina Solo",
            "Thrackan Sal-Solo",
            "Kam Solusar",
            "Tionne Solusar",
            "Uta S'orn",
            "Starkiller",
            "Maarek Stele",
            "Captain Ozzik Sturn",
            "Nomi Sunrider",
            "Meetra Surik",
            "T3-M4",
            "Siri Tachi",
            "Tagge family",
            "Tahl",
            "Darth Talon",
            "Sev'rance Tann",
            "Baron Merillion Tarko",
            "Darth Tenebrous",
            "Booster Terrik",
            "Mirax Terrik",
            "Mod Terrik",
            "Bria Tharen",
            "Grand Moff Thistleborn",
            "Raynar Thul",
            "Tibor",
            "Major Grodin Tierce",
            "Rufaan Tigellinus",
            "Tikkes",
            "Torbin",
            "Sergeant Derek Torent",
            "Darth Traya",
            "Si Treemba",
            "Antinnis Tremayne",
            "Triclops",
            "Trioculus",
            "Longo Two-Guns",
            "Odan-Urr",
            "Mission Vao",
            "Shado Vao",
            "Walon Vau",
            "Morlish Veed",
            "Tahiri Veila",
            "Ailyn Vel",
            "Sintas Vel",
            "Vergere",
            "Vette",
            "Vima-Da-Boda",
            "Lord Vitiate",
            "Komari Vosa",
            "Iella Wessiri Antilles",
            "Jaesa Willsaam",
            "Winter",
            "Darth Wyyrlok",
            "X1",
            "X2",
            "Xanatos",
            "Xasha",
            "Prince Xizor",
            "Ja'ce Yiaso",
            "Zaalbar",
            "Demetrius Zaarin",
            "Jenna Zan Arbor",
            "Tyber Zann",
            "Darth Zannah",
            "Fang Zar",
            "Zekk",
            "Zorba the Hutt",
            "Warlord Zsinj",
            "Commodore Zuggs",
            "Revan",
            "Jedi Exile",
            "Canderous Ordo",
            "T3-M4",
            "HK-47",
            "Carth Onasi",
            "Mission Vao",
            "Zaalbar",
            "Bastila Shan",
            "Juhani",
            "Jolee Bindo",
            "Kreia",
            "Atton Rand",
            "Bao-Dur",
            "Visas Marr",
            "Brianna",
            "Mical",
            "Mira",
            "Hanharr",
            "G0-T0",
            "Darth Malak",
            "Darth Sion",
            "Darth Nihilus",
            "Atris",
            "Trask Ulgo",
            "Vrook Lamar",
            "Kavar",
            "Zez-Kai Ell",
            "Darth Bandon",
            "Calo Nord",
            "Zax the Hutt",
            "Ajuur the Hutt",
            "Davik Kang",
            "Saul Karath",
            "Queen Talia",
            "Azkul",
            "General Vaklu",
            "Chuundar",
            "B4-D4",
            "Bendak Starkiller"
        ];
        static VehicleNames = [
            "Death Star",
            "Executor",
            "Home One",
            "Imperial landing craft",
            "Imperial shuttle",
            "Imperial Star Destroyer",
            "Millennium Falcon",
            "Rebel Medical Frigate",
            "Rebel Transport",
            "Slave I",
            "Tantive IV",
            "Banking Clan Frigate",
            "Commerce Guild Support Destroyer",
            "Dooku's solar sailer",
            "Invisible Hand",
            "Naboo Royal Cruiser",
            "Naboo Royal Starship",
            "Naboo Star Skiff",
            "Neimoidian Shuttle",
            "Republic Assault Ship",
            "Republic Attack Cruiser",
            "Republic Cruiser",
            "Scimitar",
            "Star freighter",
            "Techno Union Starship",
            "Theta-class Shuttle",
            "Trade Federation battleship",
            "Trade Federation Landing Ship",
            "Raddus",
            "Ghost",
            "Hammerhead corvette",
            "Imperial Freighter",
            "Jedi Light Cruiser",
            "Outrider",
            "Profundity",
            "Razor Crest",
            "Stinger Mantis",
            "The Malevolence",
            "All Terrain Armored Transport AT-AT",
            "All Terrain Scout Transport AT-ST",
            "Cloud car AT-ST",
            "Desert Skiff AT-ST",
            "Khetanna AT-ST",
            "Landspeeder AT-ST",
            "Sandcrawler AT-ST",
            "Skyhopper AT-ST",
            "Snowspeeder AT-ST",
            "Speeder bike AT-ST",
            "All Terrain Tactical Enforcer AT-TE",
            "All Terrain MegaCaliber Six AT-M6",
            "All Terrain Attack Pod AT-AP",
            "All Terrain Open Transport AT-OT",
            "All Terrain Recon Transports AT-RT",
            "All Terrain Defense Pod AT-DP",
            "All Terrain Mobile Artillery AT-MA",
            "All Terrain Armoured Cargo Transport AT-ACT",
            "All Terrain Heavy Hauler AT-HH",
            "All Terrain Heavy Scout AT-HS",
            "All Terrain Cold-weather Mobile Heavy Cannon AT-CMHC",
            "Umbaran mobile heavy cannon UMHC",
            "All Terrain Personnel Transport AT-PT",
            "Mountain Terrain Armored Transport MT-AT",
            "All Terrain Anti-Aircraft AT-AA",
            "Armored Assault Tank",
            "Bongo Submarine",
            "Clone turbo tank",
            "Corporate Alliance tank droid",
            "Dwarf spider droid",
            "HMP Droid gunship",
            "Flash speeder",
            "Gian speeder",
            "Hailfire droid tank",
            "Homing spider droid",
            "Multi-troop transport MTT",
            "Podracer",
            "Republic assault gunboat",
            "Republic LAAT Gunship",
            "Self-propelled heavy artillery SPHA",
            "Single Trooper Aerial Platform STAP",
            "Swamp speeder",
            "Wheel bike",
            "Wookiee flying catamaran",
            "Wookiee ornithopter",
            "Imperial Assault Tank",
            "Imperial Troop Transport",
            "A-wing",
            "B-wing",
            "TIE fighter",
            "X-wing",
            "Y-wing",
            "ARC-170",
            "Droid Tri-Fighter",
            "Geonosian starfighter",
            "Jedi starfighter",
            "Jedi interceptor",
            "Naboo N-1 starfighter",
            "Porax-38 starfighter",
            "Soulless One",
            "V-wing",
            "Vulture Droid",
            "E-wing",
            "Gauntlet Fighter",
            "Fanblade starfighter",
            "U-wing",
            "V-19 Torrent",
            "Z-95 Headhunter"
        ];
        static PlanetNames = [
            "Abafar",
            "Agamar",
            "Ahch-To",
            "Ajan Kloss",
            "Akiva",
            "Alderaan",
            "Aaleen",
            "Alzoc III",
            "Anaxes",
            "Ando",
            "Anoat",
            "Atollon",
            "Balnab",
            "Batuu",
            "Bespin",
            "Bogano",
            "Bracca",
            "Cantonica",
            "Castilon",
            "Cato Neimoidia",
            "Chandrila",
            "Christophsis",
            "Concord Dawn",
            "Corellia",
            "Coruscant",
            "Crait",
            "D'Qar",
            "Dagobah",
            "Dantooine",
            "Dathomir",
            "Devaron",
            "Eadu",
            "Endor",
            "Endor Sanctuary",
            "Er'kit",
            "Eriadu",
            "Esseles",
            "Exegol",
            "Felucia",
            "Florrum",
            "Fondor",
            "Geonosis",
            "Hosnian Prime",
            "Hoth",
            "Iego",
            "Ilum",
            "Iridonia",
            "Jakku",
            "Jedha",
            "Jelucan",
            "Jestefad",
            "Kamino",
            "Kashyyyk",
            "Kef Bir",
            "Kessel",
            "Kijimi",
            "Kuat",
            "Lah'mu",
            "Lothal",
            "Lotho Minor",
            "Malachor",
            "Malastare",
            "Mandalore",
            "Maridun",
            "Mimban",
            "Mon Cala",
            "Moraband",
            "Mortis",
            "Mustafar",
            "Mygeeto",
            "Naboo",
            "Nal Hutta",
            "Nevarro",
            "Numidian Prime",
            "Onderon",
            "Ord Mantell",
            "Pasaana",
            "Pillio",
            "Polis Massa",
            "Rishi",
            "Rodia",
            "Rugosa",
            "Ruusan",
            "Ryloth",
            "Saleucami",
            "Savareen",
            "Scarif",
            "Serenno",
            "Shili",
            "Sissubo",
            "Skako Minor",
            "Sorgan",
            "Starkiller Base",
            "Subterrel",
            "Sullust",
            "Takodana",
            "Tatooine",
            "Teth",
            "Toydaria",
            "Trandosha",
            "Umbara",
            "Utapau",
            "Vandor-1",
            "Vardos",
            "Wobani",
            "Wrea",
            "Yavin",
            "Yavin 4",
            "Zeffo",
            "Zygerria",
            "Abregado-rae",
            "Ambria",
            "Anoth",
            "Arkania",
            "Bakura",
            "Bonadan",
            "Borleias",
            "Byss",
            "Carida",
            "Da Soocha V",
            "Drall",
            "Dromund Kaas",
            "Dxun",
            "Hapes",
            "Honoghr",
            "Ithor",
            "J't'p'tan",
            "Khomm",
            "Korriban",
            "Kothlis",
            "Lwhekk",
            "Muunilinst",
            "Myrkr",
            "N'zoth",
            "Nkllon",
            "Ralltiir",
            "Rattatak",
            "Sacorria",
            "Selonia",
            "Thyferra",
            "Toprawa",
            "Vortex",
            "Wayland",
            "Zonama Sekot"
        ];
    }
    BrewingCatsCore.Config = Config;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    class Control {
        static Init() {
            BrewingCatsCore.Config.SiteVersion = BrewingCatsCore.Config.getSiteVersion();
            let nSession = false;
            let session = window.sessionStorage.getItem('SessionId');
            if (session === null) {
                session = BrewingCatsCore.GUID.New();
                window.sessionStorage.setItem('SessionId', session);
                nSession = true;
            }
            BrewingCatsCore.Config.SessionId = session;
            let client = window.localStorage.getItem('ClientId');
            if (client === null) {
                client = BrewingCatsCore.GUID.New();
                window.localStorage.setItem('ClientId', client);
            }
            BrewingCatsCore.Config.ClientId = client;
            let disabledTelemetry = window.localStorage.getItem('DisabledTelemetry');
            if ('true' === disabledTelemetry) {
                nSession = false;
                BrewingCatsCore.Config.TelemetryEnabled = false;
            }
            if (nSession) {
                BrewingCatsCore.Logger.traceInfo('New user session', 'BrewingCatsCore.Control', 'tagId_7', BrewingCatsCore.LogCategory.Bootstrap, {
                    'userAgent': window.navigator.userAgent,
                    'BrewingCatsCoreVersion': BrewingCatsCore.Config.getCoreVersion()
                });
            }
            window.addEventListener('beforeunload', (event) => {
                BrewingCatsCore.Logger.traceInfo(`Navigating away from: ${window.location.href}`, 'BrewingCatsCore.Control', 'tagId_16', BrewingCatsCore.LogCategory.Unload, {
                    'src': window.location.href
                });
            });
            if (true === BrewingCatsCore.Config.RedirectHttps &&
                false === window.location.origin.includes('localhost') &&
                'https:' !== window.location.protocol) {
                let secureLocation = window.location.toString().replace(window.location.protocol, 'https:');
                BrewingCatsCore.Logger.traceInfo(`Redirecting to: ${secureLocation}`, 'BrewingCatsCore.Control', 'tagId_14', BrewingCatsCore.LogCategory.Bootstrap, {
                    'url': window.location.toString(),
                    'BrewingCatsCoreVersion': BrewingCatsCore.Config.getCoreVersion()
                });
                window.location.assign(secureLocation);
            }
            $(() => {
                BrewingCatsCore.Gdpr.UpdateGdpr();
                document.querySelectorAll(".BCCore-Update-SiteVersion").forEach((i) => {
                    i.innerHTML = i.innerHTML.replace('###', BrewingCatsCore.Config.SiteVersion).replace('@@@', BrewingCatsCore.Config.getCodeName());
                });
            });
            const stylesLeft = [
                'color: cyan',
                'background: gray',
                'font-weight: bold',
                'font-size: 30px',
                'border-left: 5px solid red',
                'border-top: 5px solid red',
                'border-bottom: 5px solid red',
                'text-shadow: 2px 2px black',
                'padding-top: 10px',
                'padding-bottom: 10px',
                'padding-left: 10px',
            ].join(';');
            const stylesRight = [
                'color: green',
                'background: gray',
                'font-weight: bold',
                'font-size: 30px',
                'border-right: 5px solid red',
                'border-top: 5px solid red',
                'border-bottom: 5px solid red',
                'text-shadow: 2px 2px black',
                'padding-top: 10px',
                'padding-bottom: 10px',
                'padding-right: 10px',
            ].join(';');
            console.log(`%cBrewing Cats Core v%c${BrewingCatsCore.Config.getCoreVersion()}`, stylesLeft, stylesRight);
            console.table([
                { 'name': 'Brewing Cats Core', 'value': `${BrewingCatsCore.Config.getCoreVersion()}` },
                { 'name': 'Website Version', 'value': `${BrewingCatsCore.Config.SiteVersion}` },
                { 'name': 'User Session', 'value': `${BrewingCatsCore.Config.SessionId}` },
                { 'name': 'User Id', 'value': `${BrewingCatsCore.Config.ClientId}` },
            ]);
        }
        static UpdateStats(callback) {
            let statsData = {
                mode: BrewingCatsCore.Config.StatsMode,
                host: window.location.origin,
                url: `${window.location.origin}${window.location.pathname}`
            };
            let request = {
                body: JSON.stringify(statsData),
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                headers: {
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin
                }
            };
            let startTimer = new Date();
            fetch(BrewingCatsCore.Config.StatsUrl, request).then((response) => {
                response.json().then((r) => {
                    let endTimer = new Date();
                    let serverResponse = r;
                    let statsData = {
                        UserPageViews: 1,
                        UserSiteViews: 1,
                        SiteViews: serverResponse.SiteViews,
                        PageViews: serverResponse.PageViews,
                        ApiVersion: serverResponse.Version,
                        ResponseTimeMs: (endTimer.getTime() - startTimer.getTime())
                    };
                    if (window.localStorage.getItem('UserSiteViews') !== null) {
                        statsData.UserSiteViews = Number.parseInt(window.localStorage.getItem('UserSiteViews')) + 1;
                        window.localStorage.setItem('UserSiteViews', `${statsData.UserSiteViews}`);
                    }
                    else {
                        window.localStorage.setItem('UserSiteViews', '1');
                    }
                    let pageUrl = BrewingCatsCore.Util.toBase64(`${window.location.origin}${window.location.pathname}`);
                    if (window.localStorage.getItem(pageUrl) !== null) {
                        statsData.UserPageViews = Number.parseInt(window.localStorage.getItem(pageUrl)) + 1;
                        window.localStorage.setItem(pageUrl, `${statsData.UserPageViews}`);
                    }
                    else {
                        window.localStorage.setItem(pageUrl, '1');
                    }
                    callback(statsData);
                });
            });
        }
    }
    BrewingCatsCore.Control = Control;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    class Gdpr {
        static gdprPrefix = 'GDPR-Check';
        static timeDelta = 86400000;
        static UpdateGdpr() {
            if (BrewingCatsCore.Util.isIframe()) {
                return;
            }
            let now = new Date().getTime();
            let minCheck = now - Gdpr.timeDelta;
            let lastAgreedStored = window.localStorage.getItem(Gdpr.gdprPrefix);
            let lastAgreed = 0;
            if (lastAgreedStored !== null) {
                lastAgreed = Number.parseInt(lastAgreedStored);
                if (Number.isNaN(lastAgreed)) {
                    lastAgreed = 0;
                }
            }
            if (minCheck >= lastAgreed) {
                Gdpr.DisplayToast();
            }
        }
        static DisplayToast() {
            let msg = `By using this website you agree to comply with the terms of use outlined in our 
      <a href="/posts/site/policy/">policy</a> 
      includes the use of cookies and other data`;
            if (BrewingCatsCore.Config.UseGenericGdpr === true) {
                msg = `By using this website you agree to comply with the terms of use. This includes the use of cookies and other data`;
            }
            $('#toastArea').html(`
      <div class="z-9999" aria-live="polite" aria-atomic="true" style="position: absolute; top: 0; right: 0; min-height: 200px; z-index: 9999;">
        <div id="gdprToast" class="toast">
          <div class="toast-header">
            <img src="/images/gdpr_icon.jpg" class="rounded-circle mr-2" alt="Terms of Use" style="width: 32px; height: 32px;">
            <strong class="mr-auto">Cookies</strong>
            <small>Terms of use</small>
            <button id="toastDismissBtn" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">${msg}</div>
        </div>
      </div>`);
            $('#toastDismissBtn').on('click', () => {
                $('#toastArea').html('');
                BrewingCatsCore.Logger.traceInfo('User accepted TOS', 'gdpr.toast', 'tagId_2', BrewingCatsCore.LogCategory.GDPR, {});
                window.localStorage.setItem(Gdpr.gdprPrefix, `${new Date().getTime()}`);
            });
            $('#gdprToast').toast({
                autohide: false
            });
            $('#gdprToast').toast('show');
        }
    }
    BrewingCatsCore.Gdpr = Gdpr;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
var HeadParser;
(function (HeadParser) {
    class Control {
        static headerIds = new Array();
        static updateHeaders() {
            let headers = $('main').find($(":header"));
            for (let idx = 0; idx < headers.length; idx++) {
                let header = headers[idx];
                if (header.innerHTML !== undefined
                    && header.innerHTML !== null
                    && header.innerHTML !== ''
                    && header.innerHTML !== 'Table of Contents'
                    && header.innerHTML !== 'Tabla de Contenidos') {
                    let id = Control.HashIt(header.innerHTML).replace('==', '').replace('=', '').replace('-', '');
                    id = Control.CompressId(id);
                    if (!header.hasAttribute("id")) {
                        header.setAttribute("id", id);
                        Control.headerIds.push(id);
                    }
                    else {
                        Control.headerIds.push(header.getAttribute('id'));
                    }
                }
            }
        }
        static CreateHeaderList() {
            let list = document.createElement('ul');
            for (let idx = 0; idx < Control.headerIds.length; idx++) {
                let h = $(`#${HeadParser.Control.headerIds[idx]}`);
                let li = document.createElement('li');
                let lnk = document.createElement('a');
                lnk.setAttribute('href', `#${HeadParser.Control.headerIds[idx]}`);
                let digits = Number(h.prop("tagName").toLowerCase().replace('h', '')) - 1;
                let deepCode = '';
                for (let i = 0; i < digits; i++) {
                    deepCode = `${deepCode}+`;
                }
                lnk.innerHTML = `<code>${deepCode}</code>${h.text()}`;
                li.appendChild(lnk);
                list.appendChild(li);
            }
            return list;
        }
        static CompressId(val) {
            if (val === undefined || val === null || val === '') {
                return new Date().getTime().toString();
            }
            let sLength = 1;
            let testId = val.substring(0, sLength);
            while (Control.headerIds.indexOf(testId) !== -1 || $(`#${testId}`).length > 0) {
                if (sLength < val.length) {
                    sLength++;
                    testId = val.substring(0, sLength);
                }
                else {
                    sLength++;
                    let tim = new Date().getTime().toString().substring(0, sLength - val.length);
                    testId = `${val}${tim}`;
                }
            }
            return testId;
        }
        static HashIt(val) {
            let hash = 0;
            let i;
            let chr;
            for (i = 0; i < val.length; i++) {
                chr = val.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash.toString();
        }
    }
    HeadParser.Control = Control;
})(HeadParser || (HeadParser = {}));
if (window.HeadParser === undefined) {
    window.HeadParser = HeadParser;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    let TelemetryResponseStatus;
    (function (TelemetryResponseStatus) {
        TelemetryResponseStatus["Success"] = "Success";
        TelemetryResponseStatus["Failure"] = "Failure";
    })(TelemetryResponseStatus = BrewingCatsCore.TelemetryResponseStatus || (BrewingCatsCore.TelemetryResponseStatus = {}));
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    let LogCategory;
    (function (LogCategory) {
        LogCategory["Bootstrap"] = "Bootstrap";
        LogCategory["GDPR"] = "GDPR";
        LogCategory["ComponentSetup"] = "ComponentSetup";
        LogCategory["Configuration"] = "Configuration";
        LogCategory["ComponentInteraction"] = "ComponentInteraction";
        LogCategory["Unload"] = "Unload";
        LogCategory["Telemetry"] = "Telemetry";
        LogCategory["Nivo"] = "Nivo";
    })(LogCategory = BrewingCatsCore.LogCategory || (BrewingCatsCore.LogCategory = {}));
    let LogType;
    (function (LogType) {
        LogType["Debug"] = "Debug";
        LogType["Info"] = "Info";
        LogType["Warning"] = "Warning";
        LogType["Error"] = "Error";
    })(LogType = BrewingCatsCore.LogType || (BrewingCatsCore.LogType = {}));
    class Logger {
        static customTrace(client, message, logType, caller, tagId, category, metrics) {
            const cleanStyle = [
                'text-shadow: 1px 1px black',
            ].join(';');
            const consoleFormat = [
                'text-shadow: 1px 1px gray',
                'border-radius: 2px',
                'color: black',
                'background: cyan'
            ].join(';');
            const warnFormat = [
                'text-shadow: 1px 1px gray',
                'border-radius: 2px',
                'color: black',
                'background: yellow'
            ].join(';');
            const errFormat = [
                'text-shadow: 1px 1px gray',
                'border-radius: 2px',
                'color: black',
                'background: red'
            ].join(';');
            const accent = [
                'color: cyan'
            ].join(';');
            let timestamp = new Date();
            let consoleTimestamp = `%c[%c${timestamp.getFullYear()}${timestamp.getMonth()}${timestamp.getDay()}%c.` +
                `%c${timestamp.getHours()}${timestamp.getMinutes()}${timestamp.getSeconds()}]`;
            let prefix = `${consoleTimestamp}%c BrewingCats %c`;
            if (!BrewingCatsCore.Config.TelemetryEnabled) {
                console.log(`${prefix}Telemetry is disabled on this client`, accent, cleanStyle, accent, cleanStyle, warnFormat, cleanStyle);
                return;
            }
            if (metrics === undefined) {
                metrics = {};
            }
            metrics['SessionId'] = BrewingCatsCore.Config.SessionId;
            metrics['ClientId'] = BrewingCatsCore.Config.ClientId;
            metrics['ProjectId'] = BrewingCatsCore.Config.ProjectId;
            let idx = `${timestamp.toISOString().split('-')[0]}${timestamp.toISOString().split('-')[1]}`;
            let log = {
                timestamp: timestamp.getTime(),
                client: client,
                caller: caller,
                category: category,
                type: logType,
                tagId: tagId,
                message: message,
                metrics: metrics,
                indexId: idx
            };
            switch (logType) {
                case LogType.Debug: {
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, consoleFormat, cleanStyle);
                    console.trace(log);
                    break;
                }
                case LogType.Warning: {
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, warnFormat, cleanStyle);
                    console.warn(log);
                    break;
                }
                case LogType.Error: {
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, errFormat, cleanStyle);
                    console.error(log);
                    break;
                }
                default:
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, consoleFormat, cleanStyle);
                    console.log(log);
            }
            if (!window.location.origin.includes('localhost')) {
                let request = {
                    body: JSON.stringify(log),
                    method: 'POST',
                    mode: 'cors',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    headers: {
                        'Accept': '*/*',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Origin': window.location.origin
                    }
                };
                let p = fetch(BrewingCatsCore.Config.TelemetryUrl, request).then((response) => {
                    response.json().then((v) => { console.log(v); });
                });
            }
            else {
                if (false == BrewingCatsCore.Config.WarnLocalhost) {
                    BrewingCatsCore.Config.WarnLocalhost = true;
                    console.log(`${prefix}Skipped Telemetry service on localhost`, accent, cleanStyle, accent, cleanStyle, warnFormat, cleanStyle);
                }
            }
        }
        static trace(log) {
            Logger.customTrace(log.client, log.message, log.type, log.caller, log.tagId, log.category, log.metrics);
        }
        static traceLog(message, logType, caller, tagId, category, metrics) {
            Logger.customTrace('BrewingCatsCore', message, logType, caller, tagId, category, metrics);
        }
        static traceInfo(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Info, caller, tagId, category, metrics);
        }
        static traceDebug(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Debug, caller, tagId, category, metrics);
        }
        static traceWarn(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Warning, caller, tagId, category, metrics);
        }
        static traceError(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Error, caller, tagId, category, metrics);
        }
    }
    BrewingCatsCore.Logger = Logger;
    class TraceLog {
        timestamp;
        client;
        caller;
        category;
        type;
        tagId;
        message;
        metrics;
        indexId;
    }
    BrewingCatsCore.TraceLog = TraceLog;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    class NivoController {
        static dataControl = {};
        static config = {
            LineMonthCount: 3
        };
        static createUsageLine(appName, propertyFilter) {
            NivoController.dataControl[appName] = {
                DirSize: NivoController.config.LineMonthCount,
                CollectedSize: 0,
                ChartData: [],
                TempData: []
            };
            for (let i = 0; i <= NivoController.config.LineMonthCount; i++) {
                BrewingCatsCore.TelemetryReader.getTelemetryData(BrewingCatsCore.TelemetryReader.getNthId(i), (data, status) => {
                    if (status !== BrewingCatsCore.TelemetryResponseStatus.Success) {
                        let resourceId = BrewingCatsCore.TelemetryReader.getNthId(i);
                        BrewingCatsCore.Logger.traceError(`Failure while reading ${resourceId}`, 'NivoController', 'tagId_2b', BrewingCatsCore.LogCategory.Telemetry, {
                            errorType: 'ReadTelemetryData'
                        });
                        return;
                    }
                    let normalized = [];
                    if (data.length === undefined) {
                        normalized.push(data);
                    }
                    else {
                        normalized = data;
                    }
                    NivoController.processLineData(appName, propertyFilter, normalized);
                });
            }
        }
        static processLineData(appName, propertyFilter, data) {
            let filterTagId = 'tagId_1';
            let currentMonthData = {
                id: '',
                data: []
            };
            const tag1 = data.filter((i) => {
                if (BrewingCatsCore.Config.TelemetryDataEnv === 'staging') {
                    return i.tagId === filterTagId &&
                        (i.url.indexOf('brewingcats') !== -1 ||
                            i.url.indexOf('localhost') !== -1) &&
                        (i.url.indexOf(BrewingCatsCore.Config.TelemetryDataEnv) !== -1 ||
                            i.url.indexOf('localhost') !== -1);
                }
                return i.tagId === filterTagId &&
                    i.url.indexOf('brewingcats') !== -1;
            });
            NivoController.dataControl[appName].CollectedSize++;
            BrewingCatsCore.Logger.traceInfo(`Got ${data.length} entries, filtered down to ${tag1.length}`, 'usersPerMonth', 'tagId_x', BrewingCatsCore.LogCategory.Telemetry, {
                originalSize: `${data.length}`,
                filterSize: `${tag1.length}`
            });
            if (tag1 === undefined || tag1.length === 0) {
                if (NivoController.dataControl[appName].CollectedSize ===
                    NivoController.dataControl[appName].DirSize) {
                    let evt = new CustomEvent('NivoChartsCoreBootApp', {
                        detail: {
                            appName: appName,
                            chartType: 'line',
                            chartMeta: window.BrewingCatsCore.TelemetryChartConfig.LineConfig,
                            chartData: NivoController.dataControl[appName].ChartData
                        }
                    });
                    NivoController.sendChartEvent(evt);
                }
                return;
            }
            currentMonthData.id = NivoController.parseMonth(tag1[0].timestamp);
            let dayCount = {};
            tag1.forEach(e => {
                let day = new Date(e.timestamp).getDate();
                if (dayCount[day] === undefined) {
                    dayCount[day] = [];
                    dayCount[day].push(e[propertyFilter]);
                }
                else {
                    if (dayCount[day].indexOf(e[propertyFilter]) == -1) {
                        dayCount[day].push(e[propertyFilter]);
                    }
                }
            });
            for (let j = 1; j < 32; j++) {
                if (dayCount[j] === undefined) {
                    currentMonthData.data.push({ x: `${j}`, y: 0 });
                }
                else {
                    currentMonthData.data.push({
                        x: `${j}`,
                        y: dayCount[j].length
                    });
                }
            }
            NivoController.dataControl[appName].ChartData.push(currentMonthData);
            if (NivoController.dataControl[appName].CollectedSize ===
                NivoController.dataControl[appName].DirSize) {
                let evt = new CustomEvent('NivoChartsCoreBootApp', {
                    detail: {
                        appName: appName,
                        chartType: 'line',
                        chartMeta: window.BrewingCatsCore.TelemetryChartConfig.LineConfig,
                        chartData: NivoController.dataControl[appName].ChartData
                    }
                });
                NivoController.sendChartEvent(evt);
            }
        }
        static parseMonth(date) {
            return new Date(date).toDateString().split(' ')[1];
        }
        static createUsageCalendar(name, propertyFilter, filterName) {
            NivoController.dataControl[name] = {
                DirSize: 0,
                CollectedSize: 0,
                ChartData: [],
                TempData: {}
            };
            switch (filterName) {
                case 'regular':
                    NivoController.readEntireDir(name, propertyFilter, NivoController.processDataForCalendar);
                    break;
                case 'currentUser':
                    NivoController.readEntireDir(name, propertyFilter, NivoController.processMyPageViewsCalendar);
                    break;
                default:
                    NivoController.readEntireDir(name, propertyFilter, NivoController.processDataForCalendar);
            }
        }
        static processMyPageViewsCalendar(appName, propertyFilter, data) {
            const currentUser = window.localStorage.getItem('ClientId');
            let filteredData = data.filter(item => {
                return item.ClientId == currentUser;
            });
            NivoController.dataControl[appName].CollectedSize++;
            let appData = NivoController.dataControl[appName];
            if (filteredData === undefined || filteredData.length === 0) {
                if (appData.DirSize === appData.CollectedSize) {
                    NivoController.initializeNivoCalendar(appName);
                }
                return;
            }
            filteredData.forEach(testData => {
                let dateTag = new Date(testData.timestamp).toISOString().split('T')[0];
                if (NivoController.dataControl[appName].TempData[dateTag] === undefined) {
                    NivoController.dataControl[appName].TempData[dateTag] = [];
                }
                if (!NivoController.dataControl[appName].TempData[dateTag].includes(testData[propertyFilter])) {
                    NivoController.dataControl[appName].TempData[dateTag].push(testData[propertyFilter]);
                }
            });
            if (appData.DirSize === appData.CollectedSize) {
                NivoController.initializeNivoCalendar(appName);
            }
        }
        static processDataForCalendar(appName, propertyFilter, data) {
            let logEnv = BrewingCatsCore.Config.TelemetryDataEnv.toLowerCase();
            let filteredData = data.filter(item => {
                if (logEnv === 'staging') {
                    return item.tagId === 'tagId_1' &&
                        (item.url.indexOf('localhost') !== -1 ||
                            item.url.indexOf('brewingcats') !== -1) && (item.url.indexOf(logEnv) !== -1 ||
                        item.url.indexOf('localhost') !== -1);
                }
                return item.tagId == 'tagId_1' && item.url.indexOf('brewingcats') !== -1;
            });
            NivoController.dataControl[appName].CollectedSize++;
            let appData = NivoController.dataControl[appName];
            if (filteredData === undefined || filteredData.length === 0) {
                if (appData.DirSize === appData.CollectedSize) {
                    NivoController.initializeNivoCalendar(appName);
                }
                return;
            }
            filteredData.forEach(testData => {
                let dateTag = new Date(testData.timestamp).toISOString().split('T')[0];
                if (NivoController.dataControl[appName].TempData[dateTag] === undefined) {
                    NivoController.dataControl[appName].TempData[dateTag] = [];
                }
                if (!NivoController.dataControl[appName].TempData[dateTag].includes(testData[propertyFilter])) {
                    NivoController.dataControl[appName].TempData[dateTag].push(testData[propertyFilter]);
                }
            });
            if (appData.DirSize === appData.CollectedSize) {
                NivoController.initializeNivoCalendar(appName);
            }
        }
        static initializeNivoCalendar(appName) {
            let earliest = new Date();
            let latest = new Date("2000-01-01");
            for (const prop in NivoController.dataControl[appName].TempData) {
                let dayValue = {
                    value: NivoController.dataControl[appName].TempData[prop].length,
                    day: prop
                };
                NivoController.dataControl[appName].ChartData.push(dayValue);
                let testDay = new Date(prop);
                if (testDay > latest) {
                    latest = testDay;
                }
                if (testDay < earliest) {
                    earliest = testDay;
                }
            }
            let meta = BrewingCatsCore.TelemetryChartConfig.CalendarMeta;
            let metaFrom = new Date(meta.from);
            if (metaFrom < earliest) {
                earliest = metaFrom;
            }
            else {
                BrewingCatsCore.TelemetryChartConfig.CalendarMeta.from = earliest.toISOString().split('T')[0];
            }
            let metaTo = new Date(meta.to);
            if (metaTo > latest) {
                latest = metaTo;
            }
            else {
                BrewingCatsCore.TelemetryChartConfig.CalendarMeta.to = latest.toISOString().split('T')[0];
            }
            meta.from = earliest.toISOString().split('T')[0];
            meta.to = latest.toISOString().split('T')[0];
            let calendarEvent = new CustomEvent('NivoChartsCoreBootApp', {
                detail: {
                    appName: appName,
                    chartType: 'calendar',
                    chartMeta: meta,
                    chartData: NivoController.dataControl[appName].ChartData
                }
            });
            document.dispatchEvent(calendarEvent);
        }
        static sendChartEvent(evt) {
            if (window.NivoChartsCore === undefined ||
                window.NivoChartsCore.Listening !== true) {
                setTimeout(() => {
                    NivoController.sendChartEvent(evt);
                }, 500);
                BrewingCatsCore.Logger.traceWarn(`Nivo chart is not ready`, 'NivoController', 'tagId_19', BrewingCatsCore.LogCategory.Nivo, {
                    AppName: evt.detail.appName
                });
                return;
            }
            document.dispatchEvent(evt);
        }
        static readEntireDir(appName, propertyFilter, customProcessor) {
            NivoController.dataControl[appName].CollectedSize = 0;
            BrewingCatsCore.TelemetryReader.getDataDir((dirInfo, s) => {
                if (s !== BrewingCatsCore.TelemetryResponseStatus.Success) {
                    BrewingCatsCore.Logger.traceError(`Failure while reading dir`, 'NivoController', 'tagId_x', BrewingCatsCore.LogCategory.Telemetry, {
                        errorType: 'ReadTelemetryDir'
                    });
                    return;
                }
                NivoController.dataControl[appName].DirSize = dirInfo.length;
                dirInfo.forEach((dirData) => {
                    BrewingCatsCore.TelemetryReader.getTelemetryData(NivoController.extractId(dirData.Name), (data, status) => {
                        if (status === BrewingCatsCore.TelemetryResponseStatus.Failure) {
                            BrewingCatsCore.Logger.traceError(`Failure while reading telemetry data`, 'NivoController', 'tagId_y', BrewingCatsCore.LogCategory.Telemetry, {
                                errorType: 'ReadTelemetryData'
                            });
                            return;
                        }
                        let normalizedData = [];
                        if (data.length === undefined) {
                            normalizedData.push(data);
                        }
                        else {
                            normalizedData = data;
                        }
                        customProcessor(appName, propertyFilter, normalizedData);
                    });
                });
            });
        }
        static extractId(fileName) {
            return fileName.replace(".json", "").split('-')[2];
        }
    }
    BrewingCatsCore.NivoController = NivoController;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    class TelemetryReader {
        static dataCache = {};
        static telemetryCallbacks = {};
        static getCurrentId() {
            return TelemetryReader.getNthId(0);
        }
        static getNthId(nth) {
            let date = new Date();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            if (nth >= month) {
                let diffYears = Math.floor(nth / 12);
                year = year - diffYears;
                let diffMonths = nth % 12;
                if (diffMonths >= month) {
                    year = year - 1;
                    diffMonths = 12 - (diffMonths - month);
                }
                else {
                    diffMonths = month - diffMonths;
                }
                month = diffMonths;
            }
            else {
                month = month - nth;
            }
            let monthStr = `${month}`;
            if (month < 10) {
                monthStr = `0${month}`;
            }
            return `${year}${monthStr}`;
        }
        static getDataDir(callback) {
            let id = 'dir';
            let url = `${BrewingCatsCore.Config.TelemetryDataUrl}${id}.json`;
            TelemetryReader.getFromTelemetry(id, (d, r) => {
                if (r === BrewingCatsCore.TelemetryResponseStatus.Failure) {
                    callback(d, r);
                    return;
                }
                callback(d.filter((i) => i.Name.indexOf(BrewingCatsCore.Config.TelemetryDataEnv) !== -1).map((x) => {
                    return ({
                        LastWriteTime: new Date(x.LastWriteTime),
                        Name: x.Name.replaceAll('\\', '')
                    });
                }), r);
            }, url);
        }
        static getTelemetryData(id, callback) {
            let url = `${BrewingCatsCore.Config.TelemetryDataUrl}${BrewingCatsCore.Config.TelemetryDataBaseName}-${BrewingCatsCore.Config.TelemetryDataEnv}`;
            url = `${url}-${id}.json`;
            TelemetryReader.getFromTelemetry(id, callback, url);
        }
        static getFromTelemetry(id, callback, url) {
            if (TelemetryReader.dataCache[id] !== undefined) {
                let nowMs = new Date().getTime();
                let nextUpdate = TelemetryReader.dataCache[id].lastUpdate + TelemetryChartConfig.CacheTimeout;
                if (nowMs < nextUpdate) {
                    BrewingCatsCore.Logger.traceInfo(`Returning cached data for id: ${id}`, 'TelemetryReader', 'tagId_u', BrewingCatsCore.LogCategory.Telemetry, {
                        logId: id
                    });
                    callback(TelemetryReader.dataCache[id].data, BrewingCatsCore.TelemetryResponseStatus.Success);
                    return;
                }
            }
            if (TelemetryReader.telemetryCallbacks[id] !== undefined &&
                TelemetryReader.telemetryCallbacks[id].length > 0) {
                TelemetryReader.telemetryCallbacks[id].push(callback);
                return;
            }
            if (TelemetryReader.telemetryCallbacks[id] === undefined) {
                TelemetryReader.telemetryCallbacks[id] = [];
            }
            TelemetryReader.telemetryCallbacks[id].push(callback);
            let reqTime = new Date().getTime();
            fetch(url).then((response) => response.json()).then((json) => {
                let duration = new Date().getTime() - reqTime;
                let dataSize = json.length;
                if (json.length === undefined) {
                    dataSize = 1;
                }
                BrewingCatsCore.Logger.traceInfo(`Read resource id: ${id}. Entries: ${dataSize}`, 'TelemetryReader', 'tagId_w', BrewingCatsCore.LogCategory.Telemetry, {
                    id: id,
                    url: url,
                    size: dataSize,
                    duration: `${duration}`
                });
                let data = [];
                if (json.length === undefined) {
                    data.push(json);
                }
                else {
                    data = json;
                }
                TelemetryReader.dataCache[id] = {
                    lastUpdate: new Date().getTime(),
                    data: data
                };
                while (TelemetryReader.telemetryCallbacks[id].length > 0) {
                    let subscriptor = TelemetryReader.telemetryCallbacks[id].pop();
                    subscriptor(data, BrewingCatsCore.TelemetryResponseStatus.Success);
                }
            }).catch((reason) => {
                let duration = new Date().getTime() - reqTime;
                BrewingCatsCore.Logger.traceError(`Failure reading resource ${id}: ${reason}`, 'TelemetryReader', 'tagId_v', BrewingCatsCore.LogCategory.Telemetry, {
                    id: id,
                    url: url,
                    duration: `${duration}`
                });
                while (TelemetryReader.telemetryCallbacks[id].length > 0) {
                    let subscriptor = TelemetryReader.telemetryCallbacks[id].pop();
                    subscriptor(reason, BrewingCatsCore.TelemetryResponseStatus.Failure);
                }
            });
        }
    }
    BrewingCatsCore.TelemetryReader = TelemetryReader;
    class TelemetryChartConfig {
        static CacheTimeout = 1000 * 60 * 10;
        static LineConfig = {
            width: 900,
            height: 400,
            margin: { top: 20, right: 20, bottom: 60, left: 80 },
            animate: true,
            enableSlices: 'x',
            xScale: {
                type: 'linear',
                min: 0,
                max: 'auto',
            },
            yScale: {
                type: 'linear',
                stacked: false,
            },
            axisLeft: {
                legend: 'Site Views',
                legendOffset: 12,
            },
            axisBottom: {
                legend: 'Day of the Month',
                legendOffset: -12,
            },
            curve: 'monotoneX',
            enablePointLabel: true,
            yFormat: " >-.2f",
            pointSize: 16,
            pointBorderWidth: 1,
            pointBorderColor: {
                from: 'color',
                modifiers: [['darker', 0.3]],
            },
            pointLabel: (t) => { return `${t.y}`; },
            useMesh: true,
            enableArea: true,
            colors: { scheme: 'nivo' },
            motionConfig: "stiff",
            legends: [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'top-to-bottom',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 10,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ],
            nivoUseCustomPoint: true,
        };
        static CalendarMeta = {
            width: 900,
            height: 260,
            emptyColor: "#eeeeee",
            monthBorderColor: "#ffffff",
            dayBorderWidth: 2,
            dayBorderColor: "#ffffff",
            margin: {
                top: 50,
                right: 10,
                bottom: 10,
                left: 50,
            },
            from: (new Date().toISOString().split('T')[0]),
            to: "2000-01-01"
        };
        static CalendarData = [
            {
                "value": 268,
                "day": "2017-10-28"
            },
            {
                "value": 42,
                "day": "2017-03-16"
            },
            {
                "value": 253,
                "day": "2017-08-30"
            },
            {
                "value": 291,
                "day": "2017-07-30"
            },
            {
                "value": 52,
                "day": "2017-10-20"
            },
            {
                "value": 229,
                "day": "2016-06-06"
            },
            {
                "value": 349,
                "day": "2015-10-20"
            },
            {
                "value": 306,
                "day": "2017-04-07"
            },
            {
                "value": 207,
                "day": "2018-05-06"
            },
        ];
        static LinelData = [
            {
                id: 'Current Month',
                data: [
                    { x: '1', y: 7 },
                    { x: '2', y: 5 },
                    { x: '3', y: 11 },
                    { x: '4', y: 9 },
                    { x: '5', y: 12 },
                    { x: '6', y: 16 },
                    { x: '7', y: 13 },
                    { x: '8', y: 13 },
                ],
            },
            {
                id: 'Previous Month',
                data: [
                    { x: '4', y: 14 },
                    { x: '5', y: 14 },
                    { x: '6', y: 15 },
                    { x: '7', y: 11 },
                    { x: '8', y: 10 },
                    { x: '9', y: 12 },
                    { x: '10', y: 9 },
                    { x: '11', y: 7 },
                ],
            },
        ];
    }
    BrewingCatsCore.TelemetryChartConfig = TelemetryChartConfig;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
var BrewingCatsCore;
(function (BrewingCatsCore) {
    class Util {
        static fromBase64(payload) {
            return JSON.parse(atob(payload));
        }
        static toBase64(payload) {
            return btoa(JSON.stringify(payload));
        }
        static getTicks() {
            return (new Date()).getTime();
        }
        static isIframe() {
            try {
                return window.self !== window.top;
            }
            catch (e) {
                return true;
            }
        }
        static scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
    BrewingCatsCore.Util = Util;
    class GUID {
        static New() {
            return `${GUID.Segment(2)}-${GUID.Segment()}-${GUID.Segment()}-${GUID.Segment(2)}-${GUID.Segment(3)}`;
        }
        static Segment(length = 1) {
            if (length < 1) {
                return '';
            }
            let segment = '';
            for (let i = 0; i < length; i++) {
                segment += GUID.s4();
            }
            return segment;
        }
        static s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
    }
    BrewingCatsCore.GUID = GUID;
    class LinkActions {
        static mouseover(target) {
            target.style.boxShadow = `${BrewingCatsCore.Config.LinkHoverColor} 0px -4px 0px inset`;
        }
        static mouseout(target) {
            target.style.boxShadow = `rgb(${BrewingCatsCore.Config.ThemeColor}) 0px -4px 0px inset`;
        }
        static openLink(src, label) {
            BrewingCatsCore.Logger.traceInfo(`Link Component`, 'component.link', 'tagId_n', BrewingCatsCore.LogCategory.ComponentSetup, {
                'component': 'Link',
                'src': `${src}`,
                'label': `${label}`
            });
        }
    }
    BrewingCatsCore.LinkActions = LinkActions;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}

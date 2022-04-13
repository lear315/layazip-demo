import { ui } from "./../ui/layaMaxUI";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    public curscene: Laya.Scene3D;
    constructor() {
        super();
		
        //添加3D场景
        this.curscene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        this.curscene.ambientMode = Laya.AmbientMode.SolidColor;
        this.curscene.ambientColor = new Laya.Vector3(0.5490196168422699, 0.5490196168422699, 0.5490196168422699);
        

        //添加照相机
        var camera: Laya.Camera = (this.curscene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = this.curscene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        // demo用例编号
        let demoIndex = 0;

        switch (demoIndex) {
            case 0:
                // 加载zip资源(默认加载一级目录)
                this.loadZip0()
                break;

            case 1:
                // 加载zip资源(指定文件)
                this.loadZip1()
                break;

            case 2:
                // 加载zip资源(指定目录)
                this.loadZip2()
                break;

            case 3:
                // 加载zip资源(懒人模式)
                this.loadZip3()
                break;

            case 4:
                // 解压基础路径-模式1 解析到其所在的相对路径的同级目录下
                this.loadZip4()
                break;

            case 5:
                // 解压基础路径-模式2 解析到根目录下:
                this.loadZip5()
                break;

            case 6:
                // 加载JSON文件
                this.loadZip6()
                break;

            case 7:
                // 加载图片文件
                this.loadZip7()
                break;

            default:
                break;
        }

    }

    public loadZip0() {
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP}], 
            Laya.Handler.create(this, () => {
                let player1 = Laya.loader.getRes("res/zip/player/PeasantMale06.lh").clone();
                this.curscene.addChild(player1);
        }));
    }

    public loadZip1() {
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP, constructParams:["Others/AngelMale01.lh","Others/Knight Female Knight 06.lh"]}], 
            Laya.Handler.create(this, () => {
                let player1: Laya.Sprite3D = Laya.loader.getRes("res/zip/player/Others/AngelMale01.lh").clone();
                player1.transform.localPosition = new Laya.Vector3();
                this.curscene.addChild(player1);

                let player2: Laya.Sprite3D = Laya.loader.getRes("res/zip/player/Others/Knight Female Knight 06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -2);
                this.curscene.addChild(player2);
        }));
    } 
    
    public loadZip2() {
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP, propertyParams:["Others/"]}], 
            Laya.Handler.create(this, () => {
                let player2: Laya.Sprite3D = Laya.loader.getRes("res/zip/player/Others/Knight Female Knight 06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, 0);
                this.curscene.addChild(player2);
        }));
    } 

    public loadZip3() {
        LayaZip.LazyMode = true;
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP}], 
            Laya.Handler.create(this, () => {
                let player2: Laya.Sprite3D = Laya.loader.getRes("res/zip/player/Others/AngelMale01.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -1);
                this.curscene.addChild(player2);
        }));
    } 

    
    public loadZip4() {
        LayaZip.BasePathMode = 1;
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP}], 
            Laya.Handler.create(this, () => {
                let player2: Laya.Sprite3D = Laya.loader.getRes("res/zip/PeasantMale06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -1);
                this.curscene.addChild(player2);
        }));
    } 

    public loadZip5() {
        LayaZip.BasePathMode = 2;
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP}], 
            Laya.Handler.create(this, () => {
                let player2: Laya.Sprite3D = Laya.loader.getRes("PeasantMale06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -1);
                this.curscene.addChild(player2);
        }));
    } 

    public loadZip6() {
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP}], 
            Laya.Handler.create(this, () => {
                let json = Laya.loader.getRes("res/zip/player/GoodAttr.json");
                let text = new Laya.Text();
                text.width = 500;
                text.color = "#FF0000";
                text.wordWrap = true;
                text.text = JSON.stringify(json);
                Laya.stage.addChild(text);
        }));
    } 

    public loadZip7() {
        Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP}], 
            Laya.Handler.create(this, () => {
                let img = new Laya.Image("res/zip/player/layabox.png");
                Laya.stage.addChild(img);
        }));
    } 
}
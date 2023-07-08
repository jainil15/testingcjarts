let data = [100,203,305, 199, 111]
let names = ["Jainil", "Some", "Random", "Names", "Nato"]
onload = () => {
    let canvas = document.getElementById("canvas")
    canvas.width = 1000
    canvas.height = 1000
    let ctx = canvas.getContext("2d")
    drawChart(ctx, data, names)

}

function drawChart(ctx, data, names) {
    let margin = {top: 20, left:20, right: 20, bottom: 20}

    let barWidth = 40
    let barGap = 10
    let height = Math.max(...data)
    console.log(height)
    let width = data.length*(barGap+barWidth)
    let startingX = 40
    let startingY = height + margin.top

    ctx.translate(margin.left, margin.top)

    ctx.beginPath()
    ctx.moveTo(startingX, startingY)
    ctx.lineTo(startingX,startingY - height - 20)
    ctx.stroke()



    ctx.beginPath()
    ctx.moveTo(startingX, startingY)
    ctx.lineTo(startingX+width+barGap, startingY)
    ctx.stroke()





    //bars
    for (const dataElement in data) {
        //bars
        ctx.save()
        ctx.beginPath()
        ctx.rect((barWidth+barGap)*dataElement+startingX+barGap, startingY -  data[dataElement], barWidth, data[dataElement])
        ctx.fillStyle="steelblue"
        ctx.strokeStyle = "black"
        ctx.fill()
        ctx.lineWidth=2
        ctx.stroke()

        ctx.restore()
        ctx.font = "0.7rem Arial";
        ctx.fillStyle = 'black'
        ctx.textAlign= "center"
        ctx.fillText(names[dataElement],(barGap+barWidth)*dataElement-barWidth/2 + (barGap+barWidth) + startingX ,startingY+20)

        //ticks y axis
        ctx.beginPath()
        ctx.moveTo((barGap+barWidth)*dataElement-barWidth/2 + (barGap+barWidth) + startingX ,startingY)
        ctx.lineTo((barGap+barWidth)*dataElement-barWidth/2 + (barGap+barWidth) + startingX ,startingY+10)
        ctx.stroke()


    }


    let diff = (height/10) - height/10%10
    let numberOfTicks = height/diff

    console.log(diff)
    for (let i = 0; i < numberOfTicks; i++) {
        ctx.beginPath()
        ctx.moveTo(startingX, startingY-(diff*i))
        ctx.lineTo(startingX-10, startingY-(diff*i))
        ctx.stroke()
        ctx.font = "0.7rem Arial";
        ctx.fillStyle = 'black'
        ctx.textAlign= "end"
        ctx.fillText(i*diff + "", startingX-15, startingY-(diff*i) + 3 )

        ctx.stroke()
    }

    for (let i in names) {

    }



}

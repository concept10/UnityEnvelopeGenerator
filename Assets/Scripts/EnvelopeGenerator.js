//An envelope generator based on the envolope of the Ensoniq SQ80
//Written by Zefan Sramek
//February, 2016
//Note that this is hardcoded as a volume envelope so even though the levels can be set negatively, this functionality won't produce audible results.

#pragma strict

public var audioSource : AudioSource;

public var level : float;
public var lv1 : float;
public var lv2 : float;
public var lv3 : float;
public var lv4 : float;
public var t1 : float;
public var t2 : float;
public var t3 : float;
public var t4 : float;

public var lv1Slider : UI.Slider;
public var lv2Slider : UI.Slider;
public var lv3Slider : UI.Slider;
public var t1Slider : UI.Slider;
public var t2Slider : UI.Slider;
public var t3Slider : UI.Slider;
public var t4Slider : UI.Slider;

private var maxTime : float = 20.48; //seconds
private var rate : float;

function Start()
{
	audioSource.volume = 0;

	lv1 = 0;
	lv2 = 0;
	lv3 = 0;
	t1 = 0;
	t2 = 0;
	t3 = 0;
	t4 = 0;
}

function Update()
{
	if (Input.GetKey(KeyCode.Space))
	{
		//The gate signal is high
		if (Mathf.Abs(lv1 - lv1Slider.value) > 0.01)
		{
			rate = lv1Slider.value / t1Slider.value * maxTime;
			lv1 += rate/10000;
			audioSource.volume = lv1;
			lv2 = lv1;
			lv4 = lv1;
		}
		else if (Mathf.Abs(lv2 - lv2Slider.value) > 0.01)
		{
			rate = (lv2Slider.value - lv1Slider.value) / t2Slider.value * maxTime;
			lv2 += rate/10000;
			audioSource.volume = lv2;
			lv3 = lv2;
			lv4 = lv2;
		}
		else if (Mathf.Abs(lv3 - lv3Slider.value) > 0.01)
		{
			rate = (lv3Slider.value - lv2Slider.value) / t3Slider.value * maxTime;
			lv3 += rate/10000;
			audioSource.volume = lv3;
			lv4 = lv3;
		}
		else
		{
			audioSource.volume = lv3;
		}  
	}
	else
	{
		if (Mathf.Abs(lv4) > 0.01)
		{
			rate = lv4 / t4Slider.value * maxTime;
			lv4 -= rate/10000;
			lv1 = 0;
			lv2 = 0;
			lv3 = 0;
		}
		else
		{
			lv1 = 0;
			lv2 = 0;
			lv3 = 0;
			lv4 = 0;
		}
		audioSource.volume = lv4;
	}
}
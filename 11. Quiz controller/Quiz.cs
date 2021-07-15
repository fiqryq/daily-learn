using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Quiz : MonoBehaviour
{
    public GameObject benar, salah , opsi;
    float currenTime = 0f;
    float startingTIme = 10f;

    [SerializeField] Text countDownText;

    void Start()
    {
        currenTime = startingTIme;
    }

    public void jawaban(bool pilihan)
    {
        if (pilihan)
        {
            opsi.SetActive(false);
            benar.SetActive(false);
            benar.SetActive(true);
            int skor = PlayerPrefs.GetInt("skor") + 1;
            PlayerPrefs.SetInt("skor", skor);
        } else
        {
            opsi.SetActive(false);
            salah.SetActive(false);
            salah.SetActive(true);
        }
        gameObject.SetActive(false);
        transform.parent.GetChild(gameObject.transform.GetSiblingIndex() + 1).gameObject.SetActive(true);
    }

    void Update()
    {
        currenTime -= Time.deltaTime;
        countDownText.text = currenTime.ToString("0");
        if (currenTime <= 0)
        {
            gameObject.SetActive(false);
            transform.parent.GetChild(gameObject.transform.GetSiblingIndex() + 1).gameObject.SetActive(true);
            currenTime = 0;
        }
    }
}

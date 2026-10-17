package com.eas30n.zhistack.utils;

public interface Lock {

    boolean tryLock(long timeoutSec);

    void unlock();

}

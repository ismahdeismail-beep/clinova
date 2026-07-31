import logging
import sys
from loguru import logger


def setup_logging(level: str = "INFO") -> None:
    logger.remove()
    logger.add(
        sys.stdout,
        level=level,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        colorize=True,
    )
    logger.add(
        "logs/crawler_{time:YYYY-MM-DD}.log",
        level="DEBUG",
        rotation="100 MB",
        retention="30 days",
        compression="zip",
    )


def get_logger(name: str) -> logging.Logger:
    return logger.bind(name=name)